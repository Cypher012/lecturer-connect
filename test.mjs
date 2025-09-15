// const data = [
//   {
//     id: 1,
//     name: "Computer Science",
//     lecturers: [
//       { fullName: "Alice Johnson", researchAreas: ["AI", "ML", "Data Mining"] },
//       { fullName: "Bob Smith", researchAreas: ["AI3", "MeL", "Data eMining"] },
//       { fullName: "Carol Evans", researchAreas: ["AId", "MfL", "Dataf Mining"] },
//       { fullName: "David Lee", researchAreas: ["AfI", "MfL", "Data Mining"] },
//       { fullName: "Ella Brown", researchAreas: ["AI", "ML", "Data Miningf"] },
//     ],
//   },
//   {
//     id: 2,
//     name: "Electrical Engineering",
//     lecturers: [
//       { fullName: "Charlie Brown", researchAreas: ["Robotics", "Embeddeed Systems"] },
//       { fullName: "Dana White", researchAreas: ["Roboticss", "Embedded sSystems"] },
//       { fullName: "Ethan King", researchAreas: ["Robotics", "Embeddeds Systems"] },
//       { fullName: "Fiona Green", researchAreas: ["Roboticss", "Embeddeds Systems"] },
//       { fullName: "George Black", researchAreas: ["Robotics", "Embeddedd Systems"] },
//     ],
//   },
//   {
//     id: 3,
//     name: "Mechanical Engineering",
//     lecturers: [
//       { fullName: "Eve Black", researchAreas: ["Thermodynamics", "Fluid Mechanics"] },
//       { fullName: "Frank Green", researchAreas: ["Thermodysnamics", "Flsduid Mechanics"] },
//       { fullName: "Hannah White", researchAreas: ["Thermodynamics", "Fluid Mechanics"] },
//       { fullName: "Ian Brown", researchAreas: ["Thermodynamsics", "Fluid sMechanics"] },
//       { fullName: "Jane Lee", researchAreas: ["Thermodynamics", "Fluid Mecdhanics"] },
//     ],
//   },
//   {
//     id: 4,
//     name: "Mathematics",
//     lecturers: [
//       { fullName: "Grace Lee", researchAreas: ["Algebra", "Number Theory"] },
//       { fullName: "Henry White", researchAreas: ["Algebra", "Number Theodry"] },
//       { fullName: "Isla King", researchAreas: ["Algebrda", "Number Theosry"] },
//       { fullName: "Jack Brown", researchAreas: ["Algebrda", "Number Theory"] },
//       { fullName: "Karen Davis", researchAreas: ["Algebrxa", "Number Theory"] },
//     ],
//   },
//   {
//     id: 5,
//     name: "Physics",
//     lecturers: [
//       { fullName: "Ivy King", researchAreas: ["Quantum Mechanics", "Optics"] },
//       { fullName: "Jack Brown", researchAreas: ["Quantum Mechanics", "Optics"] },
//       { fullName: "Liam Smith", researchAreas: ["Quantum Mechanics", "Optics"] },
//       { fullName: "Mia Johnson", researchAreas: ["Quantum Mechanics", "Optics"] },
//       { fullName: "Noah White", researchAreas: ["Quantum Mechanics", "Optics"] },
//     ],
//   },
// ];

// // Compute frequency map of research areas per department
// const research = data.map((dept) => {
//   // Flatten all researchAreas for this department
//   const allResearchAreas = dept.lecturers.flatMap((lect) => lect.researchAreas);

//   console.log("allResearchAreas", allResearchAreas)

//   // Count frequency
//   const freq = allResearchAreas.reduce((acc, area) => {
//     acc[area] = (acc[area] || 0) + 1;
//     return acc;
//   }, {});

//   return { department: dept.name, frequency: freq };
// });

// console.log(research);


import lecturers from "./src/lib/seed_data/lecturers.json" with { type: "json" };
import publications from "./src/lib/seed_data/publications.json" with { type: "json" };
import courses from "./src/lib/seed_data/courses.json" with { type: "json" };



// Load JSON files

const lect_name = lecturers.map(lect => lect.full_name)
console.log({lect_name, length: lect_name.length})

const names = [
  `
 1 Engr. Temitope O. Ajayi OAU Computer Science
 2 Engr. Rotimi (Alagbe) Gbadebo OAU Computer Science
 3 Mrs. Olujoke (Mubo) Oni OAU Computer Science
 4 Prof. Oluwatope O. Ayodeji OAU Computer Science
 5 Bodunde Olofin Akinyemi OAU Computer Science
 6 Oluwatoyin H. Odukoya OAU Computer Science
 7 Theresa Olubukola Omodunbi OAU Computer Science
 8 Rhoda N. Ikono OAU Computer Science
 9 Abimbola Rhoda Iyanda OAU Computer Science
 10 Emmanuel Ajayi Olajubu OAU Computer Science
 11 Ishaya P. Gambo OAU Computer Science
 12 Abimbola Hettie Soriyan OAU Computer Science
 13 Sururah Apinke Bello OAU Computer Science
 14 Mistura L. Sanni OAU Computer Science
 15 Odetunji A. Odejobi OAU Computer Science
 16 Babajide Samuel Afolabi OAU Computer Science(prof)
 17 Adeniran I. Oluwaranti OAU Computer Science 
 18 Emmanuel R. Adagunodo OAU Computer Science
 19 Ganiyu Adesola Aderounmu OAU Computer Science
 20 Iyabo Olukemi Awoyelu OAU Computer Science
 21 Safiriyu Ijiyemi Eludiora OAU Computer Science
 22 Lawal Aderonke Rasheedat OAU Computer Science
 23 Onifade Mary Tai OAU Computer Science
  `
]

// const missingDoi = publications.flat().filter(pub => pub.lecturers && !pub.lecturers.includes("@"));

// console.log({ missingDoi, filter_length: missingDoi.length, length: publications.flat().length });

// const filter = lecturers.map(lect => ({name:lect.full_name, email:lect.email}));

// console.log({ filter, filter_length: filter.length, length: lecturers.length });



// Get all course codes from courses.json
// const courseCodes = new Set(courses.map((c) => c.course_code));

// // Collect all courses taught by lecturers
// const lecturerCourses = lecturers.flatMap((l) => l.courses_taught);

// // Find courses in lecturers.json that are missing in courses.json
// const missingCourses = lecturerCourses.filter((code) => !courseCodes.has(code));

// // Remove duplicates
// const uniqueMissing = Array.from(new Set(missingCourses));

// if (uniqueMissing.length > 0) {
//   console.log("Courses in lecturers.json but missing from courses.json:");
//   console.log(uniqueMissing);
// } else {
//   console.log("All courses in lecturers.json exist in courses.json.");
// }





const de = {
  cse: 7,
  csc: 5,
  se: 4,
  is: 5,
  ai: 2,
}