const dept = {
  csc: "Computer Science and Cybersecurity",
  cse: "Computer Engineering and Information Communication Technology",
  se: "Software Engineering",
  is: "Information Systems",
  ai: "Intelligence Systems",
};

export const data = [
  {
    course_code: "CSC201",
    course_title: "Computer Programming I",
    departments: Object.values(dept),
  },

  {
    course_code: "CYB201",
    course_title: "Fundamentals of Cyber Security",
    departments: [dept.csc],
  },

  {
    course_code: "CYB203",
    course_title: "Internet Architecture",
    departments: [dept.csc],
  },

  {
    course_code: "CYB205",
    course_title: "Software Defined Networks",
    departments: [dept.csc],
  },

  {
    course_code: "CYB207",
    course_title: "Information Security & Policy Development",
    departments: [dept.csc],
  },

  {
    course_code: "CSC202",
    course_title: "Computer Programming II",
    departments: [dept.csc, dept.se, dept.cse],
  },

  {
    course_code: "CSC204",
    course_title: "Introduction to Operating System",
    departments: [dept.csc],
  },

  {
    course_code: "CYB202",
    course_title: "System & Network Administration",
    departments: [dept.csc],
  },

  {
    course_code: "CYB204",
    course_title: "Digital Forensics",
    departments: [dept.csc],
  },

  {
    course_code: "CYB206",
    course_title:
      "Security Strategies for Web Applications and Social Networks",
    departments: [dept.csc],
  },

  {
    course_code: "CPE203",
    course_title: "Digital Computer Systems I",
    departments: [dept.cse, dept.se, dept.csc],
  },

  {
    course_code: "CPE204",
    course_title: "Digital Computer Systems II",
    departments: [dept.cse, dept.se, dept.csc],
  },

  {
    course_code: "CPE206",
    course_title: "Digital Systems Laboratory",
    departments: [dept.cse, dept.se, dept.csc],
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
    departments: [dept.is],
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
    course_code: "CSC101",
    course_title: "Introduction to Computing I",
    departments: Object.values(dept),
  },

  {
    course_code: "CSC102",
    course_title: "Introduction to Computing II",
    departments: Object.values(dept),
  },
];
