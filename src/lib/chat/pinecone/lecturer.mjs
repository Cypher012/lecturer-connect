import { Pinecone } from "@pinecone-database/pinecone";
import OpenAI from "openai";
import { loadLecturerData } from "../loader/lecturer.js";
import dotenv from "dotenv";
dotenv.config();

const {
  OPENAI_API_KEY,
  PINECONE_API_KEY,
  OPENAI_EMBEDDING_MODEL,
  PINECONE_INDEX_NAME,
} = process.env;


const openai = new OpenAI({ apiKey: OPENAI_API_KEY });

const BATCH_SIZE = 6

async function upsertLecturerToPinecone(lecturer, index) {
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
      return lecturer.id
    } catch (error) {
      console.error(`Error upserting lecturer ${lecturer.id}:`, error);
    }
  }

export async function initLecturerPinecone() {
  const pinecone = new Pinecone({
    apiKey: PINECONE_API_KEY,
  });

  const indexName = PINECONE_INDEX_NAME;

  // Verify index exists
  try {
    const indexList = await pinecone.listIndexes();
    if (!indexList.indexes.some((index) => index.name === indexName)) {
      throw new Error(`Index ${indexName} does not exist. Please create it first.`);
    }
  } catch (error) {
    console.error("Error checking index:", error);
    throw error;
  }

  const index = pinecone.index(indexName);
  const lecturers = loadLecturerData();

  for (let i = 0; i < lecturers.length; i += BATCH_SIZE) {
    const batch = lecturers.slice(i, i + BATCH_SIZE)
    
    const results = await Promise.allSettled(batch.map((lecturer) => upsertLecturerToPinecone(lecturer, index)))
  
    results.forEach((result, idx) => {
        const lecturer = batch[idx];
        if (result.status === "fulfilled") {
          console.log(`✅ Success for ${lecturer.id}:`, result.value);
        } else {
          console.error(`❌ Failed for ${lecturer.id}:`, result.reason);
        }
    });
    
  }


  

  console.log("All lecturers inserted into Pinecone!");
}

