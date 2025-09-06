import {
    type Lecturer,
    type Department,
    lecturers as initialLecturers,
    departments as initialDepartments,
  } from "./mock-data"
  import type { StudentProfile } from "./database"
  
  export interface AdminDatabaseService {
    // Lecturer operations
    getAllLecturers: () => Promise<Lecturer[]>
    getLecturerById: (id: string) => Promise<Lecturer | null>
    createLecturer: (lecturer: Omit<Lecturer, "id">) => Promise<Lecturer>
    updateLecturer: (id: string, updates: Partial<Lecturer>) => Promise<Lecturer>
    deleteLecturer: (id: string) => Promise<void>
  
    // Department operations
    getAllDepartments: () => Promise<Department[]>
    getDepartmentById: (id: string) => Promise<Department | null>
    createDepartment: (department: Omit<Department, "id">) => Promise<Department>
    updateDepartment: (id: string, updates: Partial<Department>) => Promise<Department>
    deleteDepartment: (id: string) => Promise<void>
  
    // Student operations
    getAllStudents: () => Promise<StudentProfile[]>
    getStudentById: (id: string) => Promise<StudentProfile | null>
    createStudent: (student: Omit<StudentProfile, "id" | "createdAt" | "updatedAt">) => Promise<StudentProfile>
    updateStudent: (id: string, updates: Partial<StudentProfile>) => Promise<StudentProfile>
    deleteStudent: (id: string) => Promise<void>
  
    // Statistics
    getStatistics: () => Promise<{
      totalLecturers: number
      totalDepartments: number
      totalStudents: number
    }>
  }
  
  // Initialize localStorage with default data if not present
  const initializeData = () => {
    if (typeof window === "undefined") return
  
    if (!localStorage.getItem("admin_lecturers")) {
      localStorage.setItem("admin_lecturers", JSON.stringify(initialLecturers))
    }
    if (!localStorage.getItem("admin_departments")) {
      localStorage.setItem("admin_departments", JSON.stringify(initialDepartments))
    }
    if (!localStorage.getItem("students")) {
      localStorage.setItem("students", JSON.stringify([]))
    }
  }
  
  export const adminDatabase: AdminDatabaseService = {
    // Lecturer operations
    async getAllLecturers() {
      initializeData()
      return JSON.parse(localStorage.getItem("admin_lecturers") || "[]")
    },
  
    async getLecturerById(id) {
      const lecturers = await this.getAllLecturers()
      return lecturers.find((lecturer) => lecturer.id === id) || null
    },
  
    async createLecturer(lecturerData) {
      const lecturers = await this.getAllLecturers()
      const newLecturer: Lecturer = {
        ...lecturerData,
        id: Math.random().toString(36).substr(2, 9),
      }
      lecturers.push(newLecturer)
      localStorage.setItem("admin_lecturers", JSON.stringify(lecturers))
      return newLecturer
    },
  
    async updateLecturer(id, updates) {
      const lecturers = await this.getAllLecturers()
      const index = lecturers.findIndex((lecturer) => lecturer.id === id)
      if (index === -1) {
        throw new Error("Lecturer not found")
      }
      lecturers[index] = { ...lecturers[index], ...updates }
      localStorage.setItem("admin_lecturers", JSON.stringify(lecturers))
      return lecturers[index]
    },
  
    async deleteLecturer(id) {
      const lecturers = await this.getAllLecturers()
      const filteredLecturers = lecturers.filter((lecturer) => lecturer.id !== id)
      localStorage.setItem("admin_lecturers", JSON.stringify(filteredLecturers))
    },
  
    // Department operations
    async getAllDepartments() {
      initializeData()
      return JSON.parse(localStorage.getItem("admin_departments") || "[]")
    },
  
    async getDepartmentById(id) {
      const departments = await this.getAllDepartments()
      return departments.find((department) => department.id === id) || null
    },
  
    async createDepartment(departmentData) {
      const departments = await this.getAllDepartments()
      const newDepartment: Department = {
        ...departmentData,
        id: departmentData.name
          .toLowerCase()
          .replace(/\s+/g, "-")
          .replace(/[^a-z0-9-]/g, ""),
      }
      departments.push(newDepartment)
      localStorage.setItem("admin_departments", JSON.stringify(departments))
      return newDepartment
    },
  
    async updateDepartment(id, updates) {
      const departments = await this.getAllDepartments()
      const index = departments.findIndex((department) => department.id === id)
      if (index === -1) {
        throw new Error("Department not found")
      }
      departments[index] = { ...departments[index], ...updates }
      localStorage.setItem("admin_departments", JSON.stringify(departments))
      return departments[index]
    },
  
    async deleteDepartment(id) {
      const departments = await this.getAllDepartments()
      const filteredDepartments = departments.filter((department) => department.id !== id)
      localStorage.setItem("admin_departments", JSON.stringify(filteredDepartments))
    },
  
    // Student operations
    async getAllStudents() {
      return JSON.parse(localStorage.getItem("students") || "[]")
    },
  
    async getStudentById(id) {
      const students = await this.getAllStudents()
      return students.find((student: StudentProfile) => student.id === id) || null
    },
  
    async createStudent(studentData) {
      const students = await this.getAllStudents()
      const newStudent: StudentProfile = {
        ...studentData,
        id: Math.random().toString(36).substr(2, 9),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }
      students.push(newStudent)
      localStorage.setItem("students", JSON.stringify(students))
      return newStudent
    },
  
    async updateStudent(id, updates) {
      const students = await this.getAllStudents()
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
  
    async deleteStudent(id) {
      const students = await this.getAllStudents()
      const filteredStudents = students.filter((student: StudentProfile) => student.id !== id)
      localStorage.setItem("students", JSON.stringify(filteredStudents))
    },
  
    // Statistics
    async getStatistics() {
      const [lecturers, departments, students] = await Promise.all([
        this.getAllLecturers(),
        this.getAllDepartments(),
        this.getAllStudents(),
      ])
  
      return {
        totalLecturers: lecturers.length,
        totalDepartments: departments.length,
        totalStudents: students.length,
      }
    },
  }
  