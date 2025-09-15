import { Pinecone } from "@pinecone-database/pinecone";
import OpenAI from "openai";
import LecturerAIPrompt from "./prompt.js";

import { env } from "~/src/env.js";

const {OPENAI_API_KEY, PINECONE_API_KEY,PINECONE_INDEX_NAME ,OPENAI_MODEL, OPENAI_EMBEDDING_MODEL} = env

const openai = new OpenAI({ apiKey: OPENAI_API_KEY });

// Initialize Pinecone
const pinecone = new Pinecone({
  apiKey: PINECONE_API_KEY,
});

const index = pinecone.index(PINECONE_INDEX_NAME);

export async function queryChatbot(userQuery: string) {
  // 1. Embed the user query
  const embeddingResponse = await openai.embeddings.create({
    model: OPENAI_EMBEDDING_MODEL,
    input: userQuery,
  });
  const queryVector = embeddingResponse.data[0].embedding;

  // 2. Query Pinecone
  const searchResponse = await index.query({
    vector: queryVector,
    topK: 4,
    includeMetadata: true,
  });

  const topMatches = searchResponse.matches;

  // 3. Build prompt
  const contextText = topMatches
  .map((match) => match.metadata?.text)
  .filter((t): t is string => Boolean(t))
  .join("\n\n");

  // 4. Stream response from OpenAI
  const stream = await openai.chat.completions.create({
    model: OPENAI_MODEL,
    messages: [{ role: "user", content: LecturerAIPrompt(contextText, userQuery) }],
    stream: true,
  });

  function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
  }


  for await (const chunk of stream) {
    const content = chunk.choices[0]?.delta?.content;
    if (content) {
      process.stdout.write(content); // writes to terminal
      await delay(50)
    }
  }

  console.log("\n--- end of response ---");
}

// Example usage
(async () => {
  await queryChatbot("Who can I meet for mentorship in hardware fields?");
})();
