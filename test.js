const data = [
  {
    id: 1,
    name: "Computer Science",
    lecturers: [
      { fullName: "Alice Johnson", researchAreas: ["AI", "ML", "Data Mining"] },
      { fullName: "Bob Smith", researchAreas: ["AI3", "MeL", "Data eMining"] },
      { fullName: "Carol Evans", researchAreas: ["AId", "MfL", "Dataf Mining"] },
      { fullName: "David Lee", researchAreas: ["AfI", "MfL", "Data Mining"] },
      { fullName: "Ella Brown", researchAreas: ["AI", "ML", "Data Miningf"] },
    ],
  },
  {
    id: 2,
    name: "Electrical Engineering",
    lecturers: [
      { fullName: "Charlie Brown", researchAreas: ["Robotics", "Embeddeed Systems"] },
      { fullName: "Dana White", researchAreas: ["Roboticss", "Embedded sSystems"] },
      { fullName: "Ethan King", researchAreas: ["Robotics", "Embeddeds Systems"] },
      { fullName: "Fiona Green", researchAreas: ["Roboticss", "Embeddeds Systems"] },
      { fullName: "George Black", researchAreas: ["Robotics", "Embeddedd Systems"] },
    ],
  },
  {
    id: 3,
    name: "Mechanical Engineering",
    lecturers: [
      { fullName: "Eve Black", researchAreas: ["Thermodynamics", "Fluid Mechanics"] },
      { fullName: "Frank Green", researchAreas: ["Thermodysnamics", "Flsduid Mechanics"] },
      { fullName: "Hannah White", researchAreas: ["Thermodynamics", "Fluid Mechanics"] },
      { fullName: "Ian Brown", researchAreas: ["Thermodynamsics", "Fluid sMechanics"] },
      { fullName: "Jane Lee", researchAreas: ["Thermodynamics", "Fluid Mecdhanics"] },
    ],
  },
  {
    id: 4,
    name: "Mathematics",
    lecturers: [
      { fullName: "Grace Lee", researchAreas: ["Algebra", "Number Theory"] },
      { fullName: "Henry White", researchAreas: ["Algebra", "Number Theodry"] },
      { fullName: "Isla King", researchAreas: ["Algebrda", "Number Theosry"] },
      { fullName: "Jack Brown", researchAreas: ["Algebrda", "Number Theory"] },
      { fullName: "Karen Davis", researchAreas: ["Algebrxa", "Number Theory"] },
    ],
  },
  {
    id: 5,
    name: "Physics",
    lecturers: [
      { fullName: "Ivy King", researchAreas: ["Quantum Mechanics", "Optics"] },
      { fullName: "Jack Brown", researchAreas: ["Quantum Mechanics", "Optics"] },
      { fullName: "Liam Smith", researchAreas: ["Quantum Mechanics", "Optics"] },
      { fullName: "Mia Johnson", researchAreas: ["Quantum Mechanics", "Optics"] },
      { fullName: "Noah White", researchAreas: ["Quantum Mechanics", "Optics"] },
    ],
  },
];

// Compute frequency map of research areas per department
const research = data.map((dept) => {
  // Flatten all researchAreas for this department
  const allResearchAreas = dept.lecturers.flatMap((lect) => lect.researchAreas);

  console.log("allResearchAreas", allResearchAreas)

  // Count frequency
  const freq = allResearchAreas.reduce((acc, area) => {
    acc[area] = (acc[area] || 0) + 1;
    return acc;
  }, {});

  return { department: dept.name, frequency: freq };
});

// console.log(research);
