import { Pinecone } from "@pinecone-database/pinecone";
import OpenAI from "openai";
import { loadCourseData } from "../loader/courses.js";
dotenv.config();

const {
  OPENAI_API_KEY,
  PINECONE_API_KEY,
  OPENAI_EMBEDDING_MODEL,
  PINECONE_INDEX_NAME,
} = process.env;


const BATCH_SIZE = 20

async function upsertCourseToPinecone(course, index) {
    try {
      const embeddingResponse = await openai.embeddings.create({
        model: OPENAI_EMBEDDING_MODEL,
        input: course.text,
      });

      const vector = embeddingResponse.data[0].embedding;

      await index.upsert([
        {
          id: course.id,
          values: vector,
          metadata: { ...course },
        },
      ]);

      console.log(`Inserted: ${course.id}`);
      return course.id
    } catch (error) {
      console.error(`Error upserting course ${course.id}:`, error);
    }
}



const openai = new OpenAI({ apiKey: OPENAI_API_KEY });

export async function initCoursePinecone() {
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
  const courses = loadCourseData();


  for (let i = 0; i < courses.length; i += BATCH_SIZE) {
    const batch = courses.slice(i, i + BATCH_SIZE);

    const results = await Promise.allSettled(batch.map((course) => upsertCourseToPinecone(course, index)))

    // Handle results
    results.forEach((result, idx) => {
      const course = batch[idx];
      if (result.status === "fulfilled") {
        console.log(`✅ Success for ${course.id}:`, result.value);
      } else {
        console.error(`❌ Failed for ${course.id}:`, result.reason);
      }
  });
    
  }

  console.log("All courses inserted into Pinecone!");
}