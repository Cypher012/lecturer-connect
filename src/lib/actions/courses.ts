"use server"
import { db } from "@/server/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import type { Course as $Course, Department, Lecturer } from "~/generated/prisma";


export interface Course{
    id: string
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
export async function createCourse(formData: FormData) {
  const course_code = String(formData.get("code") || "").trim();
  const course_title = String(formData.get("title") || "").trim();
  const departments = Array(formData.get("departments") || "") || null;
  if (!course_title && !course_code) return;
    try {
        await db.course.create({
            data: {course_code, course_title,
                departments: {
                    connect: departments.map((name) => ({ name: String(name) }))
                  }
             }
        })
    }catch (err) {}

}


// UPDATE
export async function updateCourse(id: string, formData: FormData) {
    try {
      const course_code = formData.get("course_code") as string | null;
      const course_title = formData.get("course_title") as string | null;
  
      if (!course_code || !course_title) {
        throw new Error("course_code and course_title are required");
      }
  
      await db.course.update({
        where: { id },
        data: { course_code, course_title },
      });
  
      redirect("/admin/courses")
    } catch (error) {
      console.error("Error updating department:", error);
      redirect(`/admin/courses?error=${encodeURIComponent((error as Error).message)}`)
    } finally{
      revalidatePath("/admin/courses")
    }
  
  }
  