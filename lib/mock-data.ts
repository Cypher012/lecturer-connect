export interface Lecturer {
  id: string
  full_name: string
  title: string
  department: string
  email: string
  phone?: string
  profile_picture: string
  orcid?: string
  scopus_id?: string
  courses_taught: string[]
  research_areas: string[]
  qualifications: string[]
  linkedin_url?: string
  personal_website?: string
  publications: Publication[]
  projects: string[]
}

export interface Publication {
  title: string
  type: string
  year: string
  doi?: string
}

export interface Department {
  id: string
  name: string
  description: string
  lecturer_count: number
}

export const departments: Department[] = [
  {
    id: "cse",
    name: "Computer Science and Engineering",
    description: "Core computer science, algorithms, and software engineering",
    lecturer_count: 12,
  },
  {
    id: "cybersecurity",
    name: "Cybersecurity",
    description: "Information security, network security, and digital forensics",
    lecturer_count: 8,
  },
  {
    id: "ai",
    name: "Artificial Intelligence",
    description: "Machine learning, deep learning, and intelligent systems",
    lecturer_count: 10,
  },
  {
    id: "data-science",
    name: "Data Science",
    description: "Big data analytics, data mining, and statistical computing",
    lecturer_count: 7,
  },
  {
    id: "software-eng",
    name: "Software Engineering",
    description: "Software development methodologies and project management",
    lecturer_count: 9,
  },
]

export const lecturers: Lecturer[] = [
  {
    id: "jane-doe",
    full_name: "Dr. Jane Doe",
    title: "Associate Professor",
    department: "Computer Science and Engineering",
    email: "jane.doe@university.edu",
    phone: "+234-801-234-5678",
    profile_picture: "/professional-woman-professor.png",
    orcid: "0000-0002-1825-0097",
    scopus_id: "57212345678",
    courses_taught: ["Algorithms", "Data Structures", "Advanced Programming"],
    research_areas: ["Artificial Intelligence", "Cybersecurity", "Machine Learning"],
    qualifications: ["PhD in Computer Science", "MSc in Information Systems"],
    linkedin_url: "https://linkedin.com/in/janedoe",
    personal_website: "https://janedoe.com",
    publications: [
      { title: "Deep Learning for Cybersecurity", type: "Journal", year: "2022", doi: "10.1234/abc123" },
      { title: "AI-Driven Network Security", type: "Conference", year: "2023", doi: "10.5678/def456" },
    ],
    projects: ["AI-driven Intrusion Detection System", "Smart Campus Security Framework"],
  },
  {
    id: "john-smith",
    full_name: "Prof. John Smith",
    title: "Professor",
    department: "Artificial Intelligence",
    email: "john.smith@university.edu",
    phone: "+234-802-345-6789",
    profile_picture: "/professional-man-professor-with-glasses.png",
    orcid: "0000-0003-2825-1097",
    scopus_id: "57312345679",
    courses_taught: ["Machine Learning", "Neural Networks", "Computer Vision"],
    research_areas: ["Deep Learning", "Computer Vision", "Natural Language Processing"],
    qualifications: ["PhD in Artificial Intelligence", "MSc in Computer Science"],
    linkedin_url: "https://linkedin.com/in/johnsmith",
    personal_website: "https://johnsmith.ai",
    publications: [
      { title: "Transformer Models in Healthcare", type: "Journal", year: "2023", doi: "10.1234/ghi789" },
      { title: "Vision Transformers for Medical Imaging", type: "Conference", year: "2022", doi: "10.5678/jkl012" },
    ],
    projects: ["Medical Image Analysis Platform", "Multilingual NLP Framework"],
  },
  {
    id: "sarah-johnson",
    full_name: "Dr. Sarah Johnson",
    title: "Senior Lecturer",
    department: "Cybersecurity",
    email: "sarah.johnson@university.edu",
    profile_picture: "/cybersecurity-expert-woman.png",
    courses_taught: ["Network Security", "Digital Forensics", "Ethical Hacking"],
    research_areas: ["Network Security", "Digital Forensics", "Blockchain Security"],
    qualifications: ["PhD in Cybersecurity", "MSc in Network Engineering"],
    publications: [
      { title: "Blockchain-based Identity Management", type: "Journal", year: "2023", doi: "10.1234/mno345" },
    ],
    projects: ["Secure IoT Framework", "Blockchain Identity System"],
  },
  {
    id: "michael-brown",
    full_name: "Dr. Michael Brown",
    title: "Associate Professor",
    department: "Data Science",
    email: "michael.brown@university.edu",
    profile_picture: "/professional-data-scientist.png",
    courses_taught: ["Big Data Analytics", "Statistical Computing", "Data Mining"],
    research_areas: ["Big Data", "Statistical Analysis", "Predictive Modeling"],
    qualifications: ["PhD in Data Science", "MSc in Statistics"],
    publications: [
      { title: "Scalable Data Processing Frameworks", type: "Journal", year: "2022", doi: "10.1234/pqr678" },
    ],
    projects: ["Smart City Analytics Platform", "Healthcare Data Pipeline"],
  },
  {
    id: "emily-davis",
    full_name: "Dr. Emily Davis",
    title: "Lecturer",
    department: "Software Engineering",
    email: "emily.davis@university.edu",
    profile_picture: "/professional-woman-software-engineer.png",
    courses_taught: ["Software Architecture", "Agile Development", "DevOps"],
    research_areas: ["Software Architecture", "DevOps", "Cloud Computing"],
    qualifications: ["PhD in Software Engineering", "MSc in Computer Science"],
    publications: [
      { title: "Microservices Architecture Patterns", type: "Conference", year: "2023", doi: "10.1234/stu901" },
    ],
    projects: ["Cloud-Native Development Platform", "Automated Testing Framework"],
  },
  {
    id: "david-wilson",
    full_name: "Prof. David Wilson",
    title: "Professor",
    department: "Computer Science and Engineering",
    email: "david.wilson@university.edu",
    profile_picture: "/senior-professor-computer-science.png",
    courses_taught: ["Operating Systems", "Distributed Systems", "Computer Networks"],
    research_areas: ["Distributed Systems", "Cloud Computing", "System Performance"],
    qualifications: ["PhD in Computer Science", "MSc in Electrical Engineering"],
    publications: [
      { title: "Distributed Computing in Edge Networks", type: "Journal", year: "2023", doi: "10.1234/vwx234" },
      { title: "Performance Optimization in Cloud Systems", type: "Conference", year: "2022", doi: "10.5678/yzab567" },
    ],
    projects: ["Edge Computing Framework", "High-Performance Computing Cluster"],
  },
]

// Helper functions for searching and filtering
export function searchLecturers(query: string): Lecturer[] {
  const lowercaseQuery = query.toLowerCase()
  return lecturers.filter(
    (lecturer) =>
      lecturer.full_name.toLowerCase().includes(lowercaseQuery) ||
      lecturer.department.toLowerCase().includes(lowercaseQuery) ||
      lecturer.research_areas.some((area) => area.toLowerCase().includes(lowercaseQuery)) ||
      lecturer.courses_taught.some((course) => course.toLowerCase().includes(lowercaseQuery)),
  )
}

export function getLecturersByDepartment(department: string): Lecturer[] {
  return lecturers.filter((lecturer) => lecturer.department === department)
}

export function getLecturerById(id: string): Lecturer | undefined {
  return lecturers.find((lecturer) => lecturer.id === id)
}
