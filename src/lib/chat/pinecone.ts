import { Pinecone } from "@pinecone-database/pinecone";
import OpenAI from "openai";
import { loadLecturerData } from "./dataLoader.js";
import { env } from "~/src/env.js";

const {OPENAI_API_KEY, PINECONE_API_KEY, PINECONE_INDEX_NAME, OPENAI_EMBEDDING_MODEL} = env

const openai = new OpenAI({ apiKey: OPENAI_API_KEY });

export async function initPinecone() {
  const pinecone = new Pinecone({
    apiKey: PINECONE_API_KEY,
  });

  const indexName = PINECONE_INDEX_NAME;

  // Verify index exists
  try {
    const indexList = await pinecone.listIndexes();
    const indexes = indexList.indexes ?? [];
    if (!indexes.some((index) => index.name === indexName)) {
      throw new Error(`Index ${indexName} does not exist. Please create it first.`);
    }
  } catch (error) {
    console.error("Error checking index:", error);
    throw error;
  }

  const index = pinecone.index(indexName);
  const lecturers = loadLecturerData();

  for (const lecturer of lecturers) {
    try {
      const embeddingResponse = await openai.embeddings.create({
        model: OPENAI_EMBEDDING_MODEL,
        input: lecturer.text,
      });

      const vector = embeddingResponse.data[0].embedding;

      await index.upsert([
        {
          id: lecturer.id,
          values: vector,
          metadata: { ...lecturer },
        },
      ]);

      console.log(`Inserted: ${lecturer.id}`);
    } catch (error) {
      console.error(`Error upserting lecturer ${lecturer.id}:`, error);
    }
  }

  console.log("All lecturers inserted into Pinecone!");
}

(async () => {
  await initPinecone();
  console.log("✅ Data ingestion completed.");
})();
