import fs from "fs"

const dept = {
  cyb: "Cybersecurity",
  se: "Software Engineering",
  csc: "Computer Science and Engineering",
  is: "Information Systems",
  ict: "Information and Communication Technology",
};

const courses = [
  {
    course_code: "CSC101",
    course_title: "Introduction to Computing I",
    departments: Object.values(dept),
  },

  {
    course_code: "CSC102",
    course_title: "Introduction to Problem Solving",
    departments: Object.values(dept),
  },

  {
    course_code: "CYB102",
    course_title: "Fundamentals of Cyber Security I",
    departments: [dept.cyb],
  },

  {
    course_code: "CYB201",
    course_title: "Fundamentals of Cyber Security II",
    departments: [dept.cyb],
  },

  {
    course_code: "CYB203",
    course_title: "Internet Architecture",
    departments: [dept.cyb],
  },

  {
    course_code: "CYB205",
    course_title: "Software Defined Networks",
    departments: [dept.cyb],
  },

  {
    course_code: "CYB207",
    course_title: "Information Security & Policy Development",
    departments: [dept.cyb],
  },

  {
    course_code: "CPE203",
    course_title: "Digital Computer Systems I",
    departments: [dept.csc, dept.ict],
  },

  {
    course_code: "CIS102",
    course_title: "Fundamentals of Information Systems",
    departments: [dept.is],
  },

  {
    course_code: "CIS201",
    course_title: "Introduction to Problem Solving",
    departments: [dept.is],
  },

  {
    course_code: "CIS203",
    course_title: "Information Assurance and Security",
    departments: [dept.is],
  },

  {
    course_code: "CIS205",
    course_title: "Web Technologies",
    departments: [dept.is],
  },

  {
    course_code: "CSC201",
    course_title: "Computer Programming I",
    departments: Object.values(dept),
  },

  {
    course_code: "CSE102",
    course_title: "Introduction to Software Engineering",
    departments: [dept.se],
  },

  {
    course_code: "CSE201",
    course_title: "Elements of Software Construction I",
    departments: [dept.se],
  },

  {
    course_code: "CSE202",
    course_title: "Elements of Software Construction II",
    departments: [dept.se],
  },

  {
    course_code: "CIS202",
    course_title: "Computer Programming for IS",
    departments: [dept.is],
  },

  {
    course_code: "CIS204",
    course_title: "Human Computer Interaction",
    departments: [dept.is],
  },

  {
    course_code: "CIS206",
    course_title: "Analysis of Business Requirements",
    departments: [dept.is],
  },

  {
    course_code: "CSC204",
    course_title: "Introduction to Operating Systems",
    departments: [dept.cyb, dept.is],
  },

  {
    course_code: "CPE204",
    course_title: "Digital Computer Systems II",
    departments: [dept.csc, dept.ict],
  },

  {
    course_code: "CPE206",
    course_title: "Digital Systems Laboratory",
    departments: [dept.csc, dept.ict],
  },

  {
    course_code: "CSC202",
    course_title: "Computer Programming II",
    departments: [dept.csc, dept.cyb, dept.se],
  },

  {
    course_code: "CYB202",
    course_title: "System & Network Administration",
    departments: [dept.cyb],
  },

  {
    course_code: "CYB204",
    course_title: "Digital Forensics",
    departments: [dept.cyb],
  },

  {
    course_code: "CYB206",
    course_title:
      "Security Strategies for Web Applications and Social Networks",
    departments: [dept.cyb],
  },

  {
    course_code: "CSC301",
    course_title: "Fundamentals of Data Structures",
    departments: [dept.cyb, dept.is],
  },

  {
    course_code: "CSC307",
    course_title: "Numerical Computation I",
    departments: [dept.cyb, dept.se, dept.csc],
  },

  {
    course_code: "CSE301",
    course_title: "Object Oriented Modelling and Design",
    departments: [dept.cyb],
  },

  {
    course_code: "CIS301",
    course_title: "System Analysis and Design",
    departments: [dept.cyb],
  },

  {
    course_code: "CYB301",
    course_title: "Biometric Security",
    departments: [dept.cyb],
  },

  {
    course_code: "CYB3O3",
    course_title: "Cryptographic Techniques",
    departments: [dept.cyb],
  },

  {
    course_code: "CYB305",
    course_title: "Systems Security",
    departments: [dept.cyb],
  },

  {
    course_code: "CYB307",
    course_title: "Information Security Engineering",
    departments: [dept.cyb],
  },

  {
    course_code: "ICT303",
    course_title: "Operating System",
    departments: [dept.ict],
  },

  {
    course_code: "CPE303",
    course_title: "Digital System Design I with HDL",
    departments: [dept.ict],
  },

  {
    course_code: "ICT311",
    course_title: "ICT Laboratory I",
    departments: [dept.ict],
  },

  {
    course_code: "ICT301",
    course_title: "Database Design and Management",
    departments: [dept.ict],
  },

  {
    course_code: "CIS301",
    course_title: "Data Analysis",
    departments: [dept.is],
  },

  {
    course_code: "CIS303",
    course_title: "E-Business Systems Development Management",
    departments: [dept.is],
  },

  {
    course_code: "CIS305",
    course_title: "Systems Thinking, Modeling and Computer Simulation",
    departments: [dept.is],
  },

  {
    course_code: "CIS307",
    course_title: "Database Management Practice",
    departments: [dept.is],
  },

  {
    course_code: "CIS309",
    course_title: "Enterprise Architecture",
    departments: [dept.is],
  },

  {
    course_code: "CPE301",
    course_title: "Low Level Languages",
    departments: [dept.se, dept.csc],
  },

  {
    course_code: "CSC305",
    course_title: "Introduction to Database Systems",
    departments: [dept.se, dept.csc],
  },

  {
    course_code: "CSC311",
    course_title: "Information Systems",
    departments: [dept.se],
  },

  {
    course_code: "CSE321",
    course_title: "Fundamentals of Requirements Engineering",
    departments: [dept.se],
  },

  {
    course_code: "CSE315",
    course_title: "Object-Oriented Programming",
    departments: [dept.se],
  },

  {
    course_code: "CSC317",
    course_title: "Automata Theory and Computability",
    departments: [dept.se],
  },

  {
    course_code: "CSE302",
    course_title: "Object Oriented Programming",
    departments: [dept.se],
  },

  {
    course_code: "CSC308",
    course_title: "Numerical Computation II",
    departments: [dept.se, dept.cyb, dept.csc],
  },

  {
    course_code: "CSC302",
    course_title: "Data Structure and Analysis of Algorithms",
    departments: [dept.se, dept.is],
  },

  {
    course_code: "CSE312",
    course_title: "Systems Analysis and Design",
    departments: [dept.se],
  },

  {
    course_code: "CSE322",
    course_title: "Software Design",
    departments: [dept.se],
  },

  {
    course_code: "CSE322",
    course_title: "Software Design",
    departments: [dept.se],
  },

  {
    course_code: "CSE324",
    course_title: "Software Testing",
    departments: [dept.se],
  },

  {
    course_code: "CPE316",
    course_title: "Artificial Intelligence",
    departments: [dept.se],
  },

  {
    course_code: "CSE421",
    course_title: "Software Systems Architecture",
    departments: [dept.se],
  },

  {
    course_code: "CPE401",
    course_title: "Computer Architecture and Organisation",
    departments: [dept.se],
  },

  {
    course_code: "CSC403",
    course_title: "Compiling Techniques",
    departments: [dept.se],
  },

  {
    course_code: "CP405",
    course_title: "Microprocessor Technology and Microprogramming",
    departments: [dept.se],
  },

  {
    course_code: "CSC415",
    course_title: "Operating Systems Principles",
    departments: [dept.se],
  },

  {
    course_code: "CSE407",
    course_title: "Techniques in Software Engineering",
    departments: [dept.se],
  },

  {
    course_code: "CSE425",
    course_title: "Software Engineering for Web Applications",
    departments: [dept.se],
  },

  {
    course_code: "CPE413",
    course_title: "Data Communication and Networking",
    departments: [dept.se, dept.is, dept.cyb],
  },

  {
    course_code: "CSC505",
    course_title: "Operations Research",
    departments: [dept.se],
  },

  {
    course_code: "CSC501",
    course_title: "Ethics and Rights Issues in Computing",
    departments: [dept.se],
  },

  {
    course_code: "CSE503",
    course_title: "Individual Project I",
    departments: [dept.se],
  },

  {
    course_code: "CSE521",
    course_title: "Aspect Oriented Development",
    departments: [dept.se],
  },

  {
    course_code: "CSE523",
    course_title: "Principles of Human Computer Interaction",
    departments: [dept.se],
  },

  {
    course_code: "CSE519",
    course_title: "Formal Methods and Program Verification",
    departments: [dept.se],
  },

  {
    course_code: "CSE525",
    course_title: "Software Maintenance",
    departments: [dept.se],
  },

  {
    course_code: "CSE504",
    course_title: "Individual Project II",
    departments: [dept.se],
  },

  {
    course_code: "CPE506",
    course_title: "Industrial Applications & Innocations",
    departments: [dept.se],
  },

  {
    course_code: "CPE502",
    course_title: "Hardware System Studies",
    departments: [dept.se, dept.csc],
  },

  {
    course_code: "CSE526",
    course_title: "Software Engineering Process and Configuration Management",
    departments: [dept.se],
  },

  {
    course_code: "CSC508",
    course_title: "Computer System Project Management",
    departments: [dept.se],
  },

  {
    course_code: "CSE514",
    course_title: "Software Quality Management",
    departments: [dept.se],
  },

  {
    course_code: "CIS302",
    course_title: "Data Science I",
    departments: [dept.is],
  },

  {
    course_code: "CIS304",
    course_title: "Systems Analysis and Design",
    departments: [dept.is],
  },

  {
    course_code: "CIS306",
    course_title: "Knowledge Management and Information retrieval",
    departments: [dept.is],
  },

  {
    course_code: "CIT316",
    course_title: "Artificial Intelligence",
    departments: [dept.is, dept.cyb],
  },

  {
    course_code: "CIS352",
    course_title: "IS Innovation and New Technologies",
    departments: [dept.is],
  },

  {
    course_code: "CIS351",
    course_title: "Business Process Management",
    departments: [dept.is],
  },

  {
    course_code: "CIS401",
    course_title: "Data Science II",
    departments: [dept.is],
  },

  {
    course_code: "CIS403",
    course_title: "Information Systems Project Management",
    departments: [dept.is],
  },

  {
    course_code: "CIS405",
    course_title: "Systems Integration and Architecture",
    departments: [dept.is],
  },

  {
    course_code: "CIS407",
    course_title: "Business Process Re-engineering",
    departments: [dept.is],
  },

  {
    course_code: "CIS409",
    course_title: "Mobile Application Development",
    departments: [dept.is],
  },

  {
    course_code: "CIS411",
    course_title: "Computer Crimes, Forensics and Auditing",
    departments: [dept.is],
  },

  {
    course_code: "CIT401",
    course_title: "Technical Communications in Computing",
    departments: [dept.is, dept.cyb],
  },

  {
    course_code: "CIS501",
    course_title: "Business Models and Innovation",
    departments: [dept.is],
  },

  {
    course_code: "CIS503",
    course_title: "Final Year Research Project I",
    departments: [dept.is],
  },

  {
    course_code: "CIS505",
    course_title: "Ethics, Legal & Professional Issues in Information System",
    departments: [dept.is],
  },

  {
    course_code: "CIS507",
    course_title: "Research Methodology in IS",
    departments: [dept.is],
  },

  {
    course_code: "CIS509",
    course_title: "Web Application Development",
    departments: [dept.is],
  },

  {
    course_code: "CIS511",
    course_title: "Application Design and Development",
    departments: [dept.is],
  },

  {
    course_code: "CIS551",
    course_title: "Network Administration",
    departments: [dept.is],
  },

  {
    course_code: "CIS555",
    course_title: "Database Analysis and Design",
    departments: [dept.is],
  },

  {
    course_code: "CIS553",
    course_title: "Information Storage and Management Technologies",
    departments: [dept.is],
  },

  {
    course_code: "CIS557",
    course_title: "Agile Web Development with OpenSource Frameworks",
    departments: [dept.is],
  },

  {
    course_code: "CIS502",
    course_title: "Special Topics in Information System",
    departments: [dept.is],
  },

  {
    course_code: "CIS504",
    course_title: "Final Year Research Project II",
    departments: [dept.is],
  },

  {
    course_code: "CIS506",
    course_title: "Information Systems Audit and Controls",
    departments: [dept.is],
  },

  {
    course_code: "CIS508",
    course_title: "Strategy Management and Acquisition in IS",
    departments: [dept.is, dept.cyb],
  },

  {
    course_code: "CIS522",
    course_title: "Database Administration",
    departments: [dept.is],
  },

  {
    course_code: "CIS524",
    course_title: "Database Programming",
    departments: [dept.is],
  },

  {
    course_code: "CIS526",
    course_title: "Network Servers and Infrastructures",
    departments: [dept.is],
  },

  {
    course_code: "ICT304",
    course_title: "Communication Principles",
    departments: [dept.ict],
  },

  {
    course_code: "CPE314",
    course_title: "Computer Engineering Laboratory II",
    departments: [dept.ict],
  },

  {
    course_code: "ICT302",
    course_title: "Computer Organization and Architecture",
    departments: [dept.ict],
  },

  {
    course_code: "ICT306",
    course_title: "Software Development Techniques",
    departments: [dept.ict],
  },

  {
    course_code: "ICT401",
    course_title: "Cyberpreneurship and Cyber law",
    departments: [dept.ict],
  },

  {
    course_code: "ICT403",
    course_title: "Computer Security Techniques",
    departments: [dept.ict],
  },

  {
    course_code: "ICT415",
    course_title: "Internet Technology and Programming",
    departments: [dept.ict],
  },

  {
    course_code: "ICT411",
    course_title: "ICT Laboratory II",
    departments: [dept.ict],
  },

  {
    course_code: "ICT405",
    course_title: "Data Communication and Networks",
    departments: [dept.ict],
  },

  {
    course_code: "ICT407",
    course_title: "System Analysis and Design",
    departments: [dept.ict],
  },

  {
    course_code: "CPE407",
    course_title: "Control Systems",
    departments: [dept.ict],
  },

  {
    course_code: "ICT413",
    course_title: "Satellite Communication",
    departments: [dept.ict],
  },

  {
    course_code: "ICT417",
    course_title: "Mobile Communication and Network",
    departments: [dept.ict],
  },

  {
    course_code: "ICT503",
    course_title: "Java Technology and Programming",
    departments: [dept.ict],
  },

  {
    course_code: "ICT503-1",
    course_title: "Individual Project I",
    departments: [dept.ict],
  },

  {
    course_code: "ICT501",
    course_title: "Digital Signal Processing",
    departments: [dept.ict],
  },

  {
    course_code: "CPE513",
    course_title: "Embedded System Design",
    departments: [dept.ict],
  },

  {
    course_code: "ICT505",
    course_title: "Neural Networks and Deep learning",
    departments: [dept.ict],
  },

  {
    course_code: "ICT509",
    course_title: "Computer Graphics and Animation",
    departments: [dept.ict],
  },

  {
    course_code: "ICT507",
    course_title: "Introduction to Enterprise Resource Planning Systems",
    departments: [dept.ict],
  },

  {
    course_code: "CYB302",
    course_title: "Information security Risk Analysis and Management",
    departments: [dept.cyb],
  },

  {
    course_code: "CYB304",
    course_title: "Edge and Perimeter Security",
    departments: [dept.cyb],
  },

  {
    course_code: "CYB306",
    course_title: "Cloud Computing Security",
    departments: [dept.cyb],
  },

  {
    course_code: "CSC306",
    course_title: "Algorithms and Complexity Analysis",
    departments: [dept.cyb],
  },

  {
    course_code: "CYB401",
    course_title: "Usable Privacy and Security",
    departments: [dept.cyb],
  },

  {
    course_code: "CYB403",
    course_title: "Cryptography Applications",
    departments: [dept.cyb],
  },

  {
    course_code: "CYB405",
    course_title: "System Vulnerability assessment and Testing",
    departments: [dept.cyb],
  },

  {
    course_code: "CYB407",
    course_title: "Cyber Security in Business & Industry",
    departments: [dept.cyb],
  },

  {
    course_code: "CYB409",
    course_title: "Information Disaster Recovery",
    departments: [dept.cyb],
  },

  {
    course_code: "CYB501",
    course_title: "Fault tolerant computing",
    departments: [dept.cyb],
  },

  {
    course_code: "CYB503",
    course_title: "Individual Project I",
    departments: [dept.cyb],
  },

  {
    course_code: "CYB507",
    course_title: "Cryptography: Algorithms and Applications",
    departments: [dept.cyb],
  },

  {
    course_code: "CYB509",
    course_title: "System Administration",
    departments: [dept.cyb],
  },

  {
    course_code: "CSC513",
    course_title: "Modeling and Simulation",
    departments: [dept.cyb],
  },

  {
    course_code: "CYB511",
    course_title: "Cyber Security Governance & Cyber Law",
    departments: [dept.cyb],
  },

  {
    course_code: "CYB502",
    course_title: "Identity Management",
    departments: [dept.cyb],
  },

  {
    course_code: "CYB504",
    course_title: "Individual Project II",
    departments: [dept.cyb],
  },

  {
    course_code: "CYB508",
    course_title: "Special Topics on Information Security",
    departments: [dept.cyb],
  },

  {
    course_code: "CYB514",
    course_title: "Ethical Hacking & Reverse Engineering",
    departments: [dept.cyb],
  },

  {
    course_code: "CYB510",
    course_title: "Network Defense",
    departments: [dept.cyb],
  },

  {
    course_code: "CYB506",
    course_title: "Multimedia applications and Security",
    departments: [dept.cyb],
  },

  {
    course_code: "CSC304",
    course_title: "Business and Commercial Programming",
    departments: [dept.csc],
  },

  {
    course_code: "CPE309",
    course_title: "Computer Engineering Laboratory I",
    departments: [dept.csc],
  },

  {
    course_code: "CSC505",
    course_title: "Object Oriented Systems Design",
    departments: [dept.csc],
  },
];

export default courses

// const prettyJson = JSON.stringify(courses, null, 2);
// // console.log(prettyJson);

// fs.writeFile("courses.json", prettyJson, (err) => {
//   if(!err) console.error("error while writing file", err)

//   console.log("Json file sucessfully written")
// })