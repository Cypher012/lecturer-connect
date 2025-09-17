import { db } from "../../src/server/db";
import lecturers from "../../src/lib/seed_data/lecturers.json";

const BATCH_SIZE = 10; // Adjust based on your DB limits
const MAX_RETRIES = 3;

async function upsertLecturerWithRetry(lecturer: typeof lecturers[0], attempt = 1) {
  try {
    await db.lecturer.upsert({
      where: { email: lecturer.email },
      update: {
        full_name: lecturer.full_name,
        title: lecturer.title,
        phone: lecturer.phone,
        profile_picture: lecturer.profile_picture,
        orcid: lecturer.orcid,
        scopus_id: lecturer.scopus_id,
        researchAreas: lecturer.researchAreas,
        qualifications: lecturer.qualifications,
        linkedin_url: lecturer.linkedin_url,
        personal_website: lecturer.personal_website,
        department: { connect: { id: lecturer.departmentId } },
        courses: {
          connect: lecturer.courses_taught.map((course_code) => ({ course_code })),
        },
      },
      create: {
        full_name: lecturer.full_name,
        title: lecturer.title,
        email: lecturer.email,
        phone: lecturer.phone,
        profile_picture: lecturer.profile_picture,
        orcid: lecturer.orcid,
        scopus_id: lecturer.scopus_id,
        researchAreas: lecturer.researchAreas,
        qualifications: lecturer.qualifications,
        linkedin_url: lecturer.linkedin_url,
        personal_website: lecturer.personal_website,
        department: { connect: { id: lecturer.departmentId } },
        courses: {
          connect: lecturer.courses_taught.map((course_code) => ({ course_code })),
        },
      },
    });
    console.log(`✅ Successfully seeded: ${lecturer.full_name}`);
  } catch (error: any) {
    if (attempt < MAX_RETRIES) {
      console.warn(
        `⚠️ Retry ${attempt} for lecturer: ${lecturer.full_name} due to error: ${
          error.message || error
        }`
      );
      await upsertLecturerWithRetry(lecturer, attempt + 1);
    } else {
      console.error(
        `❌ Failed to seed lecturer after ${MAX_RETRIES} attempts: ${lecturer.full_name}`
      );
      console.error("Error details:", error.message || error);
    }
  }
}

export default async function SeedLecturers() {
  for (let i = 0; i < lecturers.length; i += BATCH_SIZE) {
    const batch = lecturers.slice(i, i + BATCH_SIZE);

    // Run batch in parallel with retries
    await Promise.allSettled(batch.map((lecturer) => upsertLecturerWithRetry(lecturer)));

    console.log(
      `🌟 Seeded lecturer batch ${i / BATCH_SIZE + 1} / ${Math.ceil(
        lecturers.length / BATCH_SIZE
      )}`
    );
  }
}
