"use server"
import { db } from "@/server/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import type { Course as $Course, Department, Lecturer } from "~/generated/prisma";


interface CreateCourse{
    course_code: string;
    course_title: string;
    departments: Department[];
}


// TYPES

// Type for a Course record with its relations
export type CourseWithRelations = {
  department: Department | null
  lecturers: Lecturer[]
} & $Course

// CREATE
export async function createCourse<CreateCourse>(formData: FormData) {
  const course_code = String(formData.get("code") || "").trim();
  const course_title = String(formData.get("title") || "").trim();
  const departments = Array(formData.get("departments") || "") || null;
  if (!course_title && !course_code) return;
    try {
        await db.course.create({
            data: {course_code, course_title,
                departments: {
                    connect: departments.map((name) => ({name}))
                }
             }
        })
    }catch (err) {}

}