import lecturers from "../data/lecturers.json" with { type: "json" };

export function loadLecturerData() {
  return lecturers.map((lecturer) => {
    const courses =
      lecturer.courses?.map((c) =>
        typeof c === "string" ? c : c.course_code || JSON.stringify(c)
      ) || [];

    const publications =
      lecturer.publications?.map((p) =>
        typeof p === "string"
          ? p
          : p.title
          ? `${p.title} (${p.year || "n.d."})`
          : JSON.stringify(p)
      ) || [];

    return {
      id: lecturer.email,
      text: `
        Name: ${lecturer.full_name}
        Title: ${lecturer.title}
        DepartmentId: ${lecturer.departmentId}
        Department: ${lecturer.department?.name || "N/A"}
        Email: ${lecturer.email}
        Phone: ${lecturer.phone || "N/A"}
        ORCID: ${lecturer.orcid || "N/A"}
        Scopus ID: ${lecturer.scopus_id || "N/A"}
        Research Areas: ${lecturer.researchAreas?.join(", ") || "N/A"}
        Qualifications: ${lecturer.qualifications?.join(", ") || "N/A"}
        Courses Taught: ${courses.join(", ") || "N/A"}
        LinkedIn: ${lecturer.linkedin_url || "N/A"}
        Publications: ${publications.join("; ") || "N/A"}
        Personal Website: ${lecturer.personal_website || "N/A"}
      `,
      metadata: {
        full_name: lecturer.full_name,
        title: lecturer.title,
        department: lecturer.department?.name || "N/A",
        role: lecturer.title?.includes("HOD") ? "HOD" : "Lecturer",
        email: lecturer.email,
        researchAreas: lecturer.researchAreas || [], // ✅ string[]
        qualifications: lecturer.qualifications || [], // ✅ string[]
        courses: courses, // ✅ string[]
        publications: publications, // ✅ string[]
        linkedin_url: lecturer.linkedin_url || "N/A",
        orcid: lecturer.orcid || "N/A",
        scopus_id: lecturer.scopus_id || "N/A",
        personal_website: lecturer.personal_website || "N/A"
      }
    };
  });
}


// console.log(loadLecturerData())