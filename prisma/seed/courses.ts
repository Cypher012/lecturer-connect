import {db} from "../../src/server/db"
import courses from "../../src/lib/mockdata/courses.json"

async function SeedCourses(){
       for (const course of courses) {
      await db.course.upsert({
        where: { course_code: course.course_code },
        update: {
          course_code: course.course_code,
          course_title: course.course_title,
          departments: {
            connect: course.departments.map((name: string) => ({ name })),
          },
        }, 
        create: {
          course_code: course.course_code,
          course_title: course.course_title,
          departments: {
            connect: course.departments.map((name: string) => ({ name })),
          },
        },
      });
    }
}

export default SeedCourses
