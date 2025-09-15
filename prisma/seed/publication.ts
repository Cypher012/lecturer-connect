import { db } from "../../src/server/db";
import publications_json from "../../src/lib/seed_data/publications.json";

type PublicationSeed = {
  title: string;
  type: string;
  year: number;
  doi?: string | null;
  lecturers: string[];
};

// Flatten nested JSON array
const publications: PublicationSeed[] = (publications_json as PublicationSeed[][]).flat();

const BATCH_SIZE = 10;
const MAX_RETRIES = 3;

async function upsertPublicationWithRetry(pub: PublicationSeed, attempt = 1) {
  try {
    await db.publication.upsert({
      where: {
        title_year: {
          title: pub.title,
          year: pub.year,
        },
      },
      update: {
        doi: pub.doi ?? null,
        lecturers: pub.lecturers
          ? {
              connect: pub.lecturers.map((email) => ({ email })),
            }
          : undefined,
      },
      create: {
        title: pub.title,
        type: pub.type,
        year: pub.year,
        doi: pub.doi ?? null,
        lecturers: pub.lecturers
          ? {
              connect: pub.lecturers.map((email) => ({ email })),
            }
          : undefined,
      },
    });
    console.log(`✅ Successfully seeded: ${pub.title} (${pub.year})`);
  } catch (error: any) {
    if (attempt < MAX_RETRIES) {
      console.warn(
        `⚠️ Retry ${attempt} for publication: ${pub.title} due to error: ${error.message || error}`
      );
      await upsertPublicationWithRetry(pub, attempt + 1);
    } else {
      console.error(`❌ Failed to seed publication after ${MAX_RETRIES} attempts: ${pub.title}`);
      console.error("Error details:", error.message || error);
    }
  }
}

export default async function seedPublications() {
  for (let i = 0; i < publications.length; i += BATCH_SIZE) {
    const batch = publications.slice(i, i + BATCH_SIZE);

    // Run batch in parallel with retries
    await Promise.allSettled(batch.map((pub) => upsertPublicationWithRetry(pub)));

    console.log(
      `🌟 Seeded publication batch ${i / BATCH_SIZE + 1} / ${Math.ceil(
        publications.length / BATCH_SIZE
      )}`
    );
  }
}
