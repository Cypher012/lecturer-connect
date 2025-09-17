import { NextRequest } from "next/server";
import OpenAI from "openai";
import { Pinecone } from "@pinecone-database/pinecone";
import {LecturerAIPrompt, SystemPrompt} from "~/src/lib/chat/prompt";
import { env } from "~/src/env.js";

type EventMessage = {
  type: "user" | "ai_stream" | "typing" | "loading" | "error";
  data: string;
};


const {
  OPENAI_API_KEY,
  PINECONE_API_KEY,
  PINECONE_INDEX_NAME,
  OPENAI_EMBEDDING_MODEL,
  OPENAI_MODEL,
} = env;

const openai = new OpenAI({
  apiKey: OPENAI_API_KEY,
});

const pinecone = new Pinecone({
  apiKey: PINECONE_API_KEY,
});

export async function GET(req: NextRequest) {
  const query = req.nextUrl.searchParams.get("query");

  if (!query) {
    return new Response("Missing query parameter", { status: 400 });
  }
  
  const { history, latest } = JSON.parse(query) as {
  history: EventMessage[];
  latest: EventMessage;
};

  const contextText = history
    .map((msg: EventMessage) => {
      if (msg.type === "user") return `Student: ${msg.data}`;
      if (msg.type === "ai_stream") return `AI Assistant: ${msg.data}`;
      return "";
    }).join("\n");

  // Create a ReadableStream for SSE
  const encoder = new TextEncoder();
  
  const stream = new ReadableStream({
    start(controller) {
      // Function to send SSE formatted data
      const sendEvent = (data: string, event?: string) => {
        const eventData = event ? `event: ${event}\n` : '';
        const message = `${eventData}data: ${data}\n\n`;
        controller.enqueue(encoder.encode(message));
      };

      // Start processing immediately
      const processQuery = async () => {
        try {
          const pineconeIndex = pinecone.index(PINECONE_INDEX_NAME);

          // Let client know typing started
          sendEvent("AI started typing…", "typing");

          // 1. Embed query
          const embedding = await openai.embeddings.create({
            model: OPENAI_EMBEDDING_MODEL,
            input: query,
          });

          // 2. Search Pinecone
          const searchResponse = await pineconeIndex.query({
            vector: embedding.data[0].embedding,
            topK: 5,
            includeMetadata: true,
          });

          const topMatches = searchResponse.matches;
          const contextText = topMatches
            .map((match) => match.metadata?.text)
            .filter((t): t is string => Boolean(t))
            .join("\n\n");

          // Let client know model is preparing answer
          sendEvent("Generating response…", "response_loading");

          // 3. Ask OpenAI with streaming
          const completion = await openai.chat.completions.create({
            model: OPENAI_MODEL,
            stream: true,
            messages: [
              {role: "assistant", content: SystemPrompt()},
              { role: "user", content: LecturerAIPrompt(latest.data, contextText)},
            ],
          });

          // 4. Stream tokens directly
          for await (const chunk of completion) {
            const content = chunk.choices[0]?.delta?.content;
            if (content) {
              sendEvent(content, "token");
            }
          }

          // 5. Done
          sendEvent("done", "stream");
          controller.close();
        } catch (error) {
          console.error("Error in processing:", error);
          if (error instanceof Error) {
            sendEvent(`Error: ${error.message}`, "error");
          } else {
            sendEvent("An unknown error occurred", "error");
          }
          controller.close();
        }
      };

      processQuery();
    },
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
    },
  });
}