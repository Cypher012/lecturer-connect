import courses from "../data/courses.json" with { type: "json" };


export function loadCourseData() {
  const documents = courses.map((course) => {
    // Handle nested arrays properly
    return {
      id: course.course_code,
      text: `
        course_code: ${course.course_code}
        course_title: ${course.course_title}
        Departments: ${course.departments?.join(", ")}
      `,
    };
  });

  return documents;
}

// console.log(loadCourseData())