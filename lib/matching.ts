import { lecturers, type Lecturer } from "./mock-data"
import { mockDatabase } from "./database"

export interface LecturerMatch {
  lecturer: Lecturer
  matchScore: number
  matchReasons: string[]
}

export interface MatchingCriteria {
  researchInterests: string[]
  skills: string[]
  careerGoals: string
  preferredLearningStyle: string
  program: string
}

export class LecturerMatchingService {
  private calculateResearchInterestMatch(
    studentInterests: string[],
    lecturerAreas: string[],
  ): { score: number; matches: string[] } {
    const matches: string[] = []
    let score = 0

    for (const interest of studentInterests) {
      for (const area of lecturerAreas) {
        // Exact match
        if (interest.toLowerCase() === area.toLowerCase()) {
          matches.push(interest)
          score += 10
        }
        // Partial match (contains keywords)
        else if (
          interest.toLowerCase().includes(area.toLowerCase()) ||
          area.toLowerCase().includes(interest.toLowerCase())
        ) {
          matches.push(`${interest} (related to ${area})`)
          score += 5
        }
      }
    }

    return { score, matches }
  }

  private calculateSkillMatch(
    studentSkills: string[],
    lecturerCourses: string[],
  ): { score: number; matches: string[] } {
    const matches: string[] = []
    let score = 0

    for (const skill of studentSkills) {
      for (const course of lecturerCourses) {
        // Check if skill is relevant to course
        if (
          course.toLowerCase().includes(skill.toLowerCase()) ||
          skill.toLowerCase().includes(course.toLowerCase()) ||
          this.isSkillRelevantToCourse(skill, course)
        ) {
          matches.push(`${skill} (relevant to ${course})`)
          score += 3
        }
      }
    }

    return { score, matches }
  }

  private isSkillRelevantToCourse(skill: string, course: string): boolean {
    const skillCourseMap: Record<string, string[]> = {
      python: ["machine learning", "data", "ai", "algorithms"],
      javascript: ["web", "software", "programming"],
      java: ["programming", "software", "algorithms"],
      "machine learning": ["ai", "data", "neural", "deep learning"],
      sql: ["data", "database", "analytics"],
      cybersecurity: ["security", "network", "ethical"],
      "cloud computing": ["distributed", "devops", "systems"],
    }

    const skillLower = skill.toLowerCase()
    const courseLower = course.toLowerCase()

    if (skillCourseMap[skillLower]) {
      return skillCourseMap[skillLower].some((keyword) => courseLower.includes(keyword))
    }

    return false
  }

  private calculateCareerGoalMatch(careerGoal: string, lecturer: Lecturer): { score: number; reason?: string } {
    const goalMappings: Record<string, { keywords: string[]; departments: string[] }> = {
      "Academic Research": {
        keywords: ["research", "phd", "professor"],
        departments: ["Computer Science", "Artificial Intelligence", "Data Science"],
      },
      "Industry Research": {
        keywords: ["machine learning", "ai", "data science", "research"],
        departments: ["Artificial Intelligence", "Data Science", "Computer Science"],
      },
      "Software Development": {
        keywords: ["software", "programming", "development", "engineering"],
        departments: ["Software Engineering", "Computer Science"],
      },
      "Data Science": {
        keywords: ["data", "analytics", "statistics", "mining"],
        departments: ["Data Science", "Computer Science"],
      },
      Cybersecurity: {
        keywords: ["security", "network", "forensics", "ethical"],
        departments: ["Cybersecurity"],
      },
    }

    const mapping = goalMappings[careerGoal]
    if (!mapping) return { score: 0 }

    let score = 0
    let reason = ""

    // Check department match
    if (mapping.departments.some((dept) => lecturer.department.includes(dept))) {
      score += 8
      reason = `Specializes in ${lecturer.department}`
    }

    // Check research areas and courses
    const allLecturerContent = [...lecturer.research_areas, ...lecturer.courses_taught, lecturer.title]
      .join(" ")
      .toLowerCase()

    for (const keyword of mapping.keywords) {
      if (allLecturerContent.includes(keyword.toLowerCase())) {
        score += 3
        if (!reason) reason = `Expertise in ${keyword}`
      }
    }

    return { score, reason }
  }

  private calculateLearningStyleMatch(learningStyle: string, lecturer: Lecturer): { score: number; reason?: string } {
    const stylePreferences: Record<string, { keywords: string[]; courseTypes: string[] }> = {
      "Hands-on Practice": {
        keywords: ["practical", "lab", "project", "development"],
        courseTypes: ["programming", "development", "devops", "hacking"],
      },
      "Theoretical Study": {
        keywords: ["theory", "algorithms", "mathematics", "analysis"],
        courseTypes: ["algorithms", "theory", "mathematics", "analysis"],
      },
      "Project-based Learning": {
        keywords: ["project", "development", "engineering", "architecture"],
        courseTypes: ["software", "engineering", "architecture", "development"],
      },
      "Visual Learning": {
        keywords: ["visualization", "graphics", "vision", "interface"],
        courseTypes: ["computer vision", "graphics", "ui", "visualization"],
      },
    }

    const preference = stylePreferences[learningStyle]
    if (!preference) return { score: 0 }

    let score = 0
    let reason = ""

    const lecturerContent = [...lecturer.courses_taught, ...lecturer.research_areas].join(" ").toLowerCase()

    for (const keyword of preference.keywords) {
      if (lecturerContent.includes(keyword)) {
        score += 2
        if (!reason) reason = `Teaching style matches ${learningStyle.toLowerCase()}`
      }
    }

    for (const courseType of preference.courseTypes) {
      if (lecturerContent.includes(courseType)) {
        score += 3
        if (!reason) reason = `Courses align with ${learningStyle.toLowerCase()}`
      }
    }

    return { score, reason }
  }

  public async findMatchingLecturers(studentEmail: string, limit = 5): Promise<LecturerMatch[]> {
    const studentProfile = await mockDatabase.getStudentProfile(studentEmail)
    if (!studentProfile) {
      throw new Error("Student profile not found")
    }

    const matches: LecturerMatch[] = []

    for (const lecturer of lecturers) {
      const matchReasons: string[] = []
      let totalScore = 0

      // Research interests matching (highest weight)
      const researchMatch = this.calculateResearchInterestMatch(
        studentProfile.researchInterests,
        lecturer.research_areas,
      )
      totalScore += researchMatch.score
      if (researchMatch.matches.length > 0) {
        matchReasons.push(`Research interests: ${researchMatch.matches.join(", ")}`)
      }

      // Skills matching
      const skillMatch = this.calculateSkillMatch(studentProfile.skills, lecturer.courses_taught)
      totalScore += skillMatch.score
      if (skillMatch.matches.length > 0) {
        matchReasons.push(`Skills alignment: ${skillMatch.matches.join(", ")}`)
      }

      // Career goals matching
      const careerMatch = this.calculateCareerGoalMatch(studentProfile.careerGoals, lecturer)
      totalScore += careerMatch.score
      if (careerMatch.reason) {
        matchReasons.push(`Career alignment: ${careerMatch.reason}`)
      }

      // Learning style matching
      const learningMatch = this.calculateLearningStyleMatch(studentProfile.preferredLearningStyle, lecturer)
      totalScore += learningMatch.score
      if (learningMatch.reason) {
        matchReasons.push(`Learning style: ${learningMatch.reason}`)
      }

      // Program/department bonus
      if (lecturer.department.toLowerCase().includes(studentProfile.program.toLowerCase())) {
        totalScore += 5
        matchReasons.push(`Same department: ${studentProfile.program}`)
      }

      // Only include lecturers with meaningful matches
      if (totalScore > 0) {
        matches.push({
          lecturer,
          matchScore: totalScore,
          matchReasons,
        })
      }
    }

    // Sort by match score and return top matches
    return matches.sort((a, b) => b.matchScore - a.matchScore).slice(0, limit)
  }

  public async getRecommendedLecturers(studentEmail: string): Promise<LecturerMatch[]> {
    return this.findMatchingLecturers(studentEmail, 3)
  }
}

export const lecturerMatchingService = new LecturerMatchingService()
