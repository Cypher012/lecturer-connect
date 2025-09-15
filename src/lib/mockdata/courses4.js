
const dept = {
    csc: "Computer science and Cyber security",
    cse: "Computer Engineering and Information Communication Technology",
    se: "Software Engineering",
    is: "Information Systems",
    ai: "Intelligence Systems"
}

const departments = [
    {
        course_code: "CPE401",
        course_title: "Computer Architecture & Organization",
        departments: [dept.csc, dept.cse, dept.se]
    },
    {
        course_code: "CSC403",
        course_title: "Principles of compilers",
        departments: [dept.csc, dept.cse ]
    },
    {
        course_code: "ICT401",
        course_title: "Cyberpreneurship and Cyber law",
        departments: [dept.cse]
    },
    {
        course_code: "CSE421",
        course_title: "Software Systems and Architecture",
        departments: [dept.se]
    }
    
]


console.log(departments)