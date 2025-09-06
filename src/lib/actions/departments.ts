"use server";

import { db } from "@/server/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
 

import type { Department as $Department, Course, Lecturer } from "~/generated/prisma";

// TYPES

// Type for a Department record

export type DepartmentWithRelations = {
  lecturers: Lecturer[]
  courses: Course[]
} & $Department



// CREATE
export async function createDepartment(formData: FormData) {
  const name = String(formData.get("name") || "").trim();
  const description = String(formData.get("description") || "").trim()
  console.log({name, description})
  if (!name && !description) return;
  try {
    await db.department.create({ data: { name, description } });
    console.log("created.....")
    redirect('/admin/departments')
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    redirect(`/admin/departments?error=${encodeURIComponent(message)}`);
  } finally{
    revalidatePath("/admin/departments");
  }
  
}

// READ
export async function getDepartments() {
  return db.department.findMany({
    orderBy: { createdAt: "desc" },
    include: { courses: true, lecturers: true },
  });
}

export async function getDepartment(id: string){
  return db.department.findUnique({
    where: {id},
    include: {
      lecturers: true,
      courses: true
    }
  })
}

// UPDATE
export async function updateDepartment(id: string, formData: FormData) {
  try {
    const name = formData.get("name") as string | null;
    const description = formData.get("description") as string | null;

    if (!name || !description) {
      throw new Error("Name and description are required");
    }

    await db.department.update({
      where: { id },
      data: { name, description },
    });

    redirect("/admin/departments")
  } catch (error) {
    console.error("Error updating department:", error);
    redirect(`/admin/departments?error=${encodeURIComponent((error as Error).message)}`)
  } finally{
    revalidatePath("/admin/departments")
  }

}

// DELETE
export async function deleteDepartment(id: string): Promise<void> {
  try {
    await db.department.delete({
      where: { id },
    });
  } catch (error) {
    console.error("Failed to delete department:", error);
    redirect(`/admin/departments?error=${encodeURIComponent((error as Error).message)}`)
  }
  finally{
    revalidatePath("/admin/departments")
  }
}
