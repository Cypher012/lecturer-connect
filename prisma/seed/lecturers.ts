import { db } from "../../src/server/db";
import lecturers from "../../src/lib/mockdata/lecturers.json";

async function SeedLecturers() {
  for (const lecturer of lecturers) {
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
          connect: lecturer.courses_taught.map((course_code) => ({course_code}))
        }
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
          connect: lecturer.courses_taught.map((course_code) => ({course_code}))
        }
      },
    });
  }
}

export default SeedLecturers;
