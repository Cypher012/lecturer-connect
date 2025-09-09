"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Save, ArrowLeft } from "lucide-react"
import Link from "next/link"
import {updateDepartment} from "../../lib/actions/departments"
import type { Department as ServerDepartment } from "~/generated/prisma"
import { FormSubmit } from "~/src/components/form-submit"

export default function EditDepartment({ department }: { department: ServerDepartment | null }) {
  const [formData, setFormData] = useState({
    name: department?.name ?? "",
    description: department?.description ?? "",
  })


  if (!department) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-900 mb-4">Department Not Found</h1>
          <Button asChild>
            <Link href="/admin/departments">Back to Departments</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center gap-4 mb-8">
        <Button asChild variant="outline" size="sm">
          <Link href="/admin/departments">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Departments
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Edit Department</h1>
          <p className="text-slate-600">Update {department.name} information</p>
        </div>
      </div>

      <form action={updateDepartment.bind(null, department.id)} className="space-y-6">
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
          <CardHeader>
            <CardTitle>Department Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="name">Department Name *</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                placeholder="e.g., Computer Science and Engineering"
                required
              />
            </div>
            <div>
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                placeholder="Brief description of the department's focus and activities"
                rows={4}
                required
              />
            </div>
          </CardContent>
        </Card>

        <div className="flex gap-4">
          <FormSubmit className="flex-1">
            <Save className="h-4 w-4 mr-2" />
            Update Department
          </FormSubmit>
          <Button asChild variant="outline" className="flex-1 bg-transparent">
            <Link href="/admin/departments">Cancel</Link>
          </Button>
        </div>
      </form>
    </div>
  )
}
