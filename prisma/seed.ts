// import {db} from "../src/server/db"
// // import { PrismaClient } from "../generated/prisma";

// // import { departments } from "../src/lib/mock-data"
// // const db = new PrismaClient()
// import courses from "../src/lib/mockdata/courses"
// import { departments } from "~/src/lib/mock-data"

// async function main() {
//     //seeding courses

//     for (const course of courses) {
//       await db.course.upsert({
//         where: { course_title: course.course_title },
//         update: {}, 
//         create: {
//           course_code: course.course_code,
//           course_title: course.course_title,
//           departments: {
//             connect: course.departments.map((name: string) => ({ name })),
//           },
//         },
//       });
//     }


//     // seed departments

//     // for (const department of departments) {
//     //   await db.department.create({
//     //     data: department
//     //   })
//     // }
    

//     // console.log("finish running")
// }

// main().catch(e => {
//     console.error(e)
//     process.exit(1)
// }).finally(() =>{
//     db.$disconnect()
// })

const lecturers = require("../src/lib/mockdata/lecturers.json");


type Lecturer = {
  full_name: string;
  title: string;
  department: string;
  email: string;
  phone: string;
  profile_picture: string;
  orcid: string;
  scopus_id: string;
  courses_taught: string[];
  research_areas: string[];
  qualifications: string[];
  linkedin_url: string;
  personal_website: string;
  publications: [];
  projects: string[];
};

const lecturersNames = lecturers.map((lecturer:Lecturer) => lecturer.research_areas)

console.log(lecturersNames)

const names = 
[
  'Engr. Temitope O. Ajayi',
  'Engr Rotimi (Alagbe) Gbadebo',
  'Mrs. Olujoke (Mubo) Oni',
  'Dr. Lawal Aderonke Rasheedat',
  'Onifade Mary Taiwo',
  'Dr. Segun Aina',
  'Prof. Ganiyu Adesola Aderounmu',
  'Adekunle Oluseyi Afolabi',
  'Ishaya P. Gambo',
  'Oluwatope Ayodeji O.',
  'Franklin Oladiipo Asahiah',
  'Peter Adebayo Idowu',
  'Rhoda N. Ikono',
  'Abimbola Rhoda Iyanda',
  'Theresa Olubukola Omodunbi',
  'Adeniran Isola Oluwaranti'
]