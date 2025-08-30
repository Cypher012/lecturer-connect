import { lecturers, departments, searchLecturers, type Lecturer } from "./mock-data"

export interface ChatMessage {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
  lecturerLinks?: string[]
}

export class LecturerChatbot {
  private generateId(): string {
    return Math.random().toString(36).substr(2, 9)
  }

  private findLecturersByQuery(query: string): Lecturer[] {
    const lowercaseQuery = query.toLowerCase()

    // Check for specific lecturer names
    const lecturerByName = lecturers.filter(
      (lecturer) =>
        lecturer.full_name.toLowerCase().includes(lowercaseQuery) ||
        lecturer.full_name
          .toLowerCase()
          .replace(/dr\.|prof\./g, "")
          .trim()
          .includes(lowercaseQuery),
    )

    if (lecturerByName.length > 0) {
      return lecturerByName
    }

    // Check for courses
    const lecturersByCourse = lecturers.filter((lecturer) =>
      lecturer.courses_taught.some((course) => course.toLowerCase().includes(lowercaseQuery)),
    )

    if (lecturersByCourse.length > 0) {
      return lecturersByCourse
    }

    // Check for departments
    const lecturersByDept = lecturers.filter((lecturer) => lecturer.department.toLowerCase().includes(lowercaseQuery))

    if (lecturersByDept.length > 0) {
      return lecturersByDept
    }

    // Check for research areas
    const lecturersByResearch = lecturers.filter((lecturer) =>
      lecturer.research_areas.some((area) => area.toLowerCase().includes(lowercaseQuery)),
    )

    return lecturersByResearch
  }

  private formatLecturerInfo(lecturer: Lecturer, detailed = false): string {
    let info = `**${lecturer.full_name}** (${lecturer.title})\n`
    info += `Department: ${lecturer.department}\n`
    info += `Email: ${lecturer.email}\n`

    if (detailed) {
      if (lecturer.research_areas.length > 0) {
        info += `\n**Research Areas:** ${lecturer.research_areas.join(", ")}\n`
      }

      if (lecturer.courses_taught.length > 0) {
        info += `**Courses Taught:** ${lecturer.courses_taught.join(", ")}\n`
      }

      if (lecturer.publications.length > 0) {
        info += `\n**Recent Publications:**\n`
        lecturer.publications.slice(0, 3).forEach((pub) => {
          info += `• ${pub.title} (${pub.year})\n`
        })
      }

      if (lecturer.projects.length > 0) {
        info += `\n**Current Projects:**\n`
        lecturer.projects.forEach((project) => {
          info += `• ${project}\n`
        })
      }
    } else {
      info += `Research: ${lecturer.research_areas.slice(0, 2).join(", ")}`
      if (lecturer.research_areas.length > 2) {
        info += ` and ${lecturer.research_areas.length - 2} more areas`
      }
    }

    return info
  }

  async processMessage(userMessage: string): Promise<ChatMessage> {
    const query = userMessage.toLowerCase()
    let response = ""
    const lecturerLinks: string[] = []

    // Greeting responses
    if (query.includes("hello") || query.includes("hi") || query.includes("hey")) {
      response =
        'Hello! I\'m your Lecturer Connect assistant. I can help you find information about faculty members, their courses, research areas, and more. Try asking me:\n\n• "Who teaches Machine Learning?"\n• "Tell me about Dr. Jane Doe"\n• "Show me lecturers in Cybersecurity"\n• "What research areas are available?"'
    }

    // Help responses
    else if (query.includes("help") || query.includes("what can you do")) {
      response =
        'I can help you with:\n\n🔍 **Finding Lecturers:** Ask about specific faculty members by name\n📚 **Course Information:** Find out who teaches specific courses\n🏢 **Department Info:** Explore lecturers by department\n🔬 **Research Areas:** Discover faculty research interests\n📄 **Publications:** Learn about faculty publications and projects\n\nJust ask me naturally, like "Who teaches Algorithms?" or "Tell me about the AI department."'
    }

    // Course-related queries
    else if (query.includes("who teaches") || query.includes("teaches") || query.includes("course")) {
      const courseKeywords = [
        "algorithm",
        "machine learning",
        "data structure",
        "cybersecurity",
        "ai",
        "artificial intelligence",
        "software",
        "network",
        "database",
        "programming",
      ]
      const foundCourse = courseKeywords.find((keyword) => query.includes(keyword))

      if (foundCourse) {
        const relevantLecturers = this.findLecturersByQuery(foundCourse)

        if (relevantLecturers.length > 0) {
          response = `Here are the lecturers who teach courses related to "${foundCourse}":\n\n`
          relevantLecturers.forEach((lecturer) => {
            response += this.formatLecturerInfo(lecturer) + "\n\n"
            lecturerLinks.push(`/lecturers/${lecturer.id}`)
          })
          response += "Click on any lecturer's name above to view their full profile!"
        } else {
          response = `I couldn't find any lecturers specifically teaching "${foundCourse}". Try searching for related terms or browse our departments to explore available courses.`
        }
      } else {
        response =
          'I\'d be happy to help you find who teaches a specific course! Please mention the course name, like "Who teaches Machine Learning?" or "Who teaches Algorithms?"'
      }
    }

    // Specific lecturer queries
    else if (
      query.includes("tell me about") ||
      query.includes("about") ||
      query.includes("dr.") ||
      query.includes("prof.")
    ) {
      const foundLecturers = this.findLecturersByQuery(userMessage)

      if (foundLecturers.length === 1) {
        const lecturer = foundLecturers[0]
        response = `Here's detailed information about ${lecturer.full_name}:\n\n`
        response += this.formatLecturerInfo(lecturer, true)
        lecturerLinks.push(`/lecturers/${lecturer.id}`)
      } else if (foundLecturers.length > 1) {
        response = "I found multiple lecturers matching your query:\n\n"
        foundLecturers.forEach((lecturer) => {
          response += this.formatLecturerInfo(lecturer) + "\n\n"
          lecturerLinks.push(`/lecturers/${lecturer.id}`)
        })
      } else {
        response =
          "I couldn't find a lecturer matching that name. Try using their full name or check the spelling. You can also browse all lecturers to find who you're looking for."
      }
    }

    // Department queries
    else if (
      query.includes("department") ||
      query.includes("cybersecurity") ||
      query.includes("ai") ||
      query.includes("data science") ||
      query.includes("software engineering")
    ) {
      const deptKeywords = {
        cybersecurity: "Cybersecurity",
        ai: "Artificial Intelligence",
        "artificial intelligence": "Artificial Intelligence",
        "data science": "Data Science",
        "software engineering": "Software Engineering",
        "computer science": "Computer Science and Engineering",
      }

      const foundDept = Object.entries(deptKeywords).find(([keyword]) => query.includes(keyword))

      if (foundDept) {
        const [, deptName] = foundDept
        const deptLecturers = lecturers.filter((l) => l.department === deptName)

        if (deptLecturers.length > 0) {
          response = `Here are the lecturers in ${deptName}:\n\n`
          deptLecturers.forEach((lecturer) => {
            response += this.formatLecturerInfo(lecturer) + "\n\n"
            lecturerLinks.push(`/lecturers/${lecturer.id}`)
          })
        } else {
          response = `I couldn't find lecturers in that specific department. Here are our available departments:\n\n${departments.map((d) => `• ${d.name}`).join("\n")}`
        }
      } else {
        response = `Here are all our departments:\n\n${departments.map((d) => `• **${d.name}**: ${d.description} (${d.lecturer_count} lecturers)`).join("\n\n")}\n\nWhich department would you like to explore?`
      }
    }

    // Research area queries
    else if (query.includes("research") || query.includes("publication")) {
      const researchAreas = Array.from(new Set(lecturers.flatMap((l) => l.research_areas)))
      response = `Our faculty members are actively researching in these areas:\n\n${researchAreas.map((area) => `• ${area}`).join("\n")}\n\nWhich research area interests you? I can show you the relevant faculty members!`
    }

    // General search
    else {
      const searchResults = searchLecturers(userMessage)

      if (searchResults.length > 0) {
        response = `I found ${searchResults.length} lecturer${searchResults.length > 1 ? "s" : ""} related to your search:\n\n`
        searchResults.slice(0, 5).forEach((lecturer) => {
          response += this.formatLecturerInfo(lecturer) + "\n\n"
          lecturerLinks.push(`/lecturers/${lecturer.id}`)
        })

        if (searchResults.length > 5) {
          response += `And ${searchResults.length - 5} more lecturers. Try a more specific search to narrow down the results.`
        }
      } else {
        response =
          'I\'m not sure how to help with that specific query. Here are some things you can ask me:\n\n• "Who teaches [course name]?"\n• "Tell me about [lecturer name]"\n• "Show lecturers in [department]"\n• "What research areas are available?"\n\nOr try browsing our departments and lecturers directly!'
      }
    }

    return {
      id: this.generateId(),
      role: "assistant",
      content: response,
      timestamp: new Date(),
      lecturerLinks,
    }
  }
}
