// src/components/departments-provider.tsx
"use client"

import { createContext, useContext } from "react"
import type { DepartmentWithRelations } from "@/lib/actions/departments"

const DepartmentsContext = createContext<DepartmentWithRelations[]>([])

export function DepartmentsProvider({ 
  children, 
  departments 
}: { 
  children: React.ReactNode
  departments: DepartmentWithRelations[]
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