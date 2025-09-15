"use server";

import { db } from "../../server/db";
// import { revalidatePath } from "necxt/cache";
// import { redirect } from "next/navigation";
import { cache } from "react";

import type { Department, Course,Publication ,Lecturer as $Lecturer } from "~/generated/prisma";


export type LecturerWithRelations = {
  department: Department
  courses: Course[]
  publications: Publication[]
} & $Lecturer


export  async function getLecturers():Promise<LecturerWithRelations[]> {
  return db.lecturer.findMany({
    orderBy: { full_name: "asc" },
    include: { courses: true, department: true, publications: true },
  });
}

export const getLecturersCached = cache(getLecturers);

export  async function getLecturer(id:string) {
  const lecturer = db.lecturer.findUnique({
    where: {id},
    include: { courses: true, department: true, publications: true },
  });

  if (!lecturer) throw new Error("Lecturer not found");

  return lecturer
}

export async function getLecturersByDepartments(deptId:string) {
  const lecturers = db.lecturer.findMany({
    where: {departmentId: deptId},
    include: { courses: true, department: true, publications: true }
  })
  if (!lecturers) throw new Error("Lecturer not found");

  return lecturers
}