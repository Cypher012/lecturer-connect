// courses.mjs
import fs from "fs";
import path from "path";

import { data as part3 } from "../new-mockdata/courses3.mjs";
import { data as part1and2 } from "../new-mockdata/part1_and_2.mjs";
import { departments as part5 } from "../new-mockdata/part5.mjs";

const dept = {
  csc: "Computer Science and Cybersecurity",
  cse: "Computer Engineering and Information Communication Technology",
  se: "Software Engineering",
  is: "Information Systems",
  ai: "Intelligence Systems",
};

const part4 = [
  {
    course_code: "CSE421",
    course_title: "Software Systems Architecture",
    departments: [dept.se],
  },

  {
    course_code: "CPE401",
    course_title: "Computer Architecture and Organization",
    departments: [dept.se, dept.csc, dept.cse],
  },

  {
    course_code: "CSC403",
    course_title: "Compiling Techniques",
    departments: [dept.se, dept.csc, dept.cse],
  },
  {
    course_code: "CSC407",
    course_title: "Techniques in Software Development",
    departments: [dept.se, dept.csc],
  },
  {
    course_code: "CPE405",
    course_title: "Microprocessor Technology and Microprogramming",
    departments: [dept.se, dept.csc, dept.csc],
  },
  {
    course_code: "CPE409",
    course_title: "Microprocessor Design Laboratory",
    departments: [dept.cse],
  },

  {
    course_code: "CPE413",
    course_title: "Data Communication and Networking",
    departments: [dept.is, dept.csc],
  },
   {
    course_code: "CSC415",
    course_title: "Operating Systems Principles",
    departments: [dept.csc, dept.cse],
  },
  

]

const courses = [...part1and2, ...part3, ...part4 ,...part5];
export default courses



// console.log(Object.values(dept))

// const validDepartments = [
//   'Computer Science and Cybersecurity',
//   'Computer Engineering and Information Communication Technology',
//   'Software Engineering',
//   'Information Systems',
//   'Intelligence Systems'
// ];

// courses.forEach((course) => {
//   if (!Array.isArray(course.departments)) return; // skip if no departments

//   const invalidDepartments = course.departments.filter(
//     (dept) => !validDepartments.includes(dept)
//   );

//   if (invalidDepartments.length > 0) {
//     console.log(
//       `Course ${course.course_code} has invalid departments:`,
//       invalidDepartments
//     );
//   }
// });




try {
  // Always write to project root
  const filePath = path.join(`${process.cwd()}/src/lib/seed_data`, "courses.json");

  fs.writeFileSync(filePath, JSON.stringify(courses, null, 2), "utf-8");

  console.log(`✅ Exported ${courses.length} courses to ${filePath}`);
} catch (error) {
  console.error("❌ Failed to export courses:", error);
}
