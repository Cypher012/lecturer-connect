import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import type{ LecturerWithRelations } from "~/src/lib/actions/lecturers"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


// Helper functions for searching and filtering
export function searchLecturers(query: string, data:LecturerWithRelations[]): LecturerWithRelations[] {
  const lowercaseQuery = query.toLowerCase()
  return data.filter(
    (lecturer: LecturerWithRelations) =>
      lecturer.full_name.toLowerCase().includes(lowercaseQuery) ||
      lecturer.department.id.toLowerCase().includes(lowercaseQuery) ||
      lecturer.researchAreas.some((area) => area.toLowerCase().includes(lowercaseQuery)) ||
      lecturer.courses.some((course) => course.course_code.toLowerCase().includes(lowercaseQuery)),
  )
}
