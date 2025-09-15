// src/env.mjs
import { createEnv } from "@t3-oss/env-nextjs"; // or core package
import { z } from "zod";

export const env = createEnv({
  /*
   * Serverside Environment variables, not available on the client.
   * Will throw if you access these variables on the client.
   */
  server: {
    DATABASE_URL: z.string().url(),
    OPENAI_API_KEY:z.string(),
    PINECONE_API_KEY:z.string(),  
    PINECONE_INDEX_NAME: z.string(),
    OPENAI_EMBEDDING_MODEL: z.string(),
    OPENAI_MODEL: z.string(),
    NODE_ENV: z
    .enum(["development", "test", "production"])
    .default("development"),
  },
  /*
   * Environment variables available on the client (and server).
   *
   * 💡 You'll get type errors if these are not prefixed with NEXT_PUBLIC_.
   */
  client: {
    // NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: z.string().min(1),
  },
  /*
   * Due to how Next.js bundles environment variables on Edge and Client,
   * we need to manually destructure them to make sure all are included in bundle.
   *
   * 💡 You'll get type errors if not all variables from `server` & `client` are included here.
   */
  runtimeEnv: {
    DATABASE_URL: process.env.DATABASE_URL,
    OPENAI_API_KEY:process.env.OPENAI_API_KEY,
    PINECONE_API_KEY:process.env.PINECONE_API_KEY,
    NODE_ENV: process.env.NODE_ENV,
    PINECONE_INDEX_NAME: process.env.PINECONE_INDEX_NAME,
    OPENAI_EMBEDDING_MODEL: process.env.OPENAI_EMBEDDING_MODEL,
    OPENAI_MODEL: process.env.OPENAI_MODEL
  },
});