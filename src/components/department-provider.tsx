// src/components/departments-provider.tsx
"use client"

import { createContext, useContext } from "react"
import type { DepartmentWithRelations as Department } from "@/lib/actions/departments"

const DepartmentsContext = createContext<Department[]>([])

export function DepartmentsProvider({ 
  children, 
  departments 
}: { 
  children: React.ReactNode
  departments: Department[]
}) {
  return (
    <DepartmentsContext.Provider value={departments}>
      {children}
    </DepartmentsContext.Provider>
  )
}

export function useDepartments() {
  return useContext(DepartmentsContext)
}