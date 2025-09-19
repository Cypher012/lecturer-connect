import lecturers from "../data/lecturers.json" with { type: "json" };

export function loadLecturerData() {
  const documents = lecturers.map((lecturer) => {
    // Handle nested arrays properly
    const courses =
      lecturer.courses && lecturer.courses.length > 0
        ? lecturer.courses.map((c) =>
            typeof c === "string" ? c : c.code || JSON.stringify(c)
          ).join(", ")
        : "N/A";

    const publications =
      lecturer.publications && lecturer.publications.length > 0
        ? lecturer.publications.map((p) =>
            typeof p === "string"
              ? p
              : p.title
              ? `${p.title} (${p.year || "n.d."})`
              : JSON.stringify(p)
          ).join("; ")
        : "N/A";

    return {
      id: lecturer.email,
      text: `
        Name: ${lecturer.full_name}
        Title: ${lecturer.title}
        DepartmentId: ${lecturer.departmentId}
        Department: ${lecturer.department?.name || lecturer.departmentId || "N/A"}
        Email: ${lecturer.email}
        Phone: ${lecturer.phone || "N/A"}
        ORCID: ${lecturer.orcid || "N/A"}
        Scopus ID: ${lecturer.scopus_id || "N/A"}
        Research Areas: ${lecturer.researchAreas?.join(", ") || "N/A"}
        Qualifications: ${lecturer.qualifications?.join(", ") || "N/A"}
        Courses Taught: ${courses}
        LinkedIn: ${lecturer.linkedin_url || "N/A"}
        Publications: ${publications}
        Personal Website: ${lecturer.personal_website || "N/A"}
      `,
    };
  });

  return documents;
}

// console.log(loadLecturerData())