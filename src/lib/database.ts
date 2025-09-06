export interface StudentProfile {
  id: string
  email: string
  name: string
  studentId: string
  year: string
  program: string
  researchInterests: string[]
  skills: string[]
  careerGoals: string
  preferredLearningStyle: string
  createdAt: string
  updatedAt: string
}

export interface DatabaseService {
  saveStudentProfile: (profile: Omit<StudentProfile, "id" | "createdAt" | "updatedAt">) => Promise<StudentProfile>
  getStudentProfile: (email: string) => Promise<StudentProfile | null>
  updateStudentProfile: (id: string, updates: Partial<StudentProfile>) => Promise<StudentProfile>
  getAllStudentProfiles: () => Promise<StudentProfile[]>
}

// Mock database service using localStorage
export const mockDatabase: DatabaseService = {
  async saveStudentProfile(profile) {
    const students = JSON.parse(localStorage.getItem("students") || "[]")
    const newStudent: StudentProfile = {
      ...profile,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    students.push(newStudent)
    localStorage.setItem("students", JSON.stringify(students))
    return newStudent
  },

  async getStudentProfile(email) {
    const students = JSON.parse(localStorage.getItem("students") || "[]")
    return students.find((student: StudentProfile) => student.email === email) || null
  },

  async updateStudentProfile(id, updates) {
    const students = JSON.parse(localStorage.getItem("students") || "[]")
    const index = students.findIndex((student: StudentProfile) => student.id === id)

    if (index === -1) {
      throw new Error("Student not found")
    }

    students[index] = {
      ...students[index],
      ...updates,
      updatedAt: new Date().toISOString(),
    }

    localStorage.setItem("students", JSON.stringify(students))
    return students[index]
  },

  async getAllStudentProfiles() {
    return JSON.parse(localStorage.getItem("students") || "[]")
  },
}
