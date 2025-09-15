"use client"

import { create } from "zustand"
import type { DepartmentWithRelations } from "@/lib/actions/departments"
import { getDepartmentsCached } from "@/lib/actions/departments" // adjust import

type DepartmentsState = {
  departments: DepartmentWithRelations[]
  fetchDepartments: () => Promise<DepartmentWithRelations[]>
}

export const useDepartmentsStore = create<DepartmentsState>((set, get) => ({
  departments: [],
  fetchDepartments: async () => {
    // If already loaded, return
    if (get().departments.length > 0) {
      return get().departments
    }

    // Otherwise fetch from API/cache
    const departments = await getDepartmentsCached()
    set({ departments })
    return departments
  },
}))
