import {db} from "../src/server/db"
import SeedDepartments from "./seed/department"
import SeedCourses from "./seed/courses"
import SeedLecturers from "./seed/lecturers"
import seedPublications from "./seed/publication"


async function main() {
  // await SeedDepartments()
  // await SeedCourses()
  await SeedLecturers()
  await seedPublications()
  
}

main().catch(e => {
    console.error(e)
    process.exit(1)
}).finally(() =>{
    db.$disconnect()
})
