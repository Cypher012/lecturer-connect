import {db} from "../../src/server/db"
import courses from "../../src/lib/seed_data/courses.json"


const BATCH_SIZE = 20; // adjust based on your DB limits

async function SeedCourses() {
  for (let i = 0; i < courses.length; i += BATCH_SIZE) {
    const batch = courses.slice(i, i + BATCH_SIZE);

    // Run the batch in parallel
    await Promise.allSettled(
      batch.map((course) =>
        db.course.upsert({
          where: { course_code: course.course_code },
          update: {
            course_code: course.course_code,
            course_title: course.course_title,
            departments: course.departments
              ? {
                  connect: course.departments.map((name: string) => ({ name })),
                }
              : undefined,
          },
          create: {
            course_code: course.course_code,
            course_title: course.course_title,
            departments: course.departments
              ? {
                  connect: course.departments.map((name: string) => ({ name })),
                }
              : undefined,
          },
        })
      )
    );

    console.log(`Seeded batch ${i / BATCH_SIZE + 1} / ${Math.ceil(courses.length / BATCH_SIZE)}`);
  }
}
export default SeedCourses;
