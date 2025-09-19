import courses from "../data/courses.json" with { type: "json" };

export function loadCourseData() {
  return courses.map((course) => {
    const departments =
      course.departments?.map((d) =>
        typeof d === "string" ? d : d.name || JSON.stringify(d)
      ) || [];

    const lecturers =
      course.lecturers?.map((l) =>
        typeof l === "string" ? l : l.full_name || JSON.stringify(l)
      ) || [];

    return {
      id: course.course_code,
      text: `
        course_code: ${course.course_code}
        course_title: ${course.course_title}
        Departments: ${departments.join(", ")}
        Lecturers: ${lecturers.join(", ") || "N/A"}
      `,
      metadata: {
        course_code: String(course.course_code), // ✅ string
        course_title: String(course.course_title), // ✅ string
        departments: departments, // ✅ string[]
        lecturers: lecturers, // ✅ string[]
      },
    };
  });
}


// console.log(loadCourseData())