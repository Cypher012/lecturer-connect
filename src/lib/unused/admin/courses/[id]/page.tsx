"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Save, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { updateCourse } from "../../../../actions/courses"
import type { Course as ServerCourse } from "../../../../actions/courses"
import { FormSubmit } from "@/components/form-submit"

export default function EditCourse({ course }: { course: ServerCourse | null }) {
  const [formData, setFormData] = useState({
    course_code: course?.course_code ?? "",
    course_title: course?.course_title ?? "",
  })

  if (!course) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-900 mb-4">Course Not Found</h1>
          <Button asChild>
            <Link href="/admin/courses">Back to Courses</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center gap-4 mb-8">
        <Button asChild variant="outline" size="sm">
          <Link href="/admin/courses">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Courses
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Edit Course</h1>
          <p className="text-slate-600">Update {course.course_code} - {course.course_title}</p>
        </div>
      </div>

      <form action={updateCourse.bind(null, course.id)} className="space-y-6">
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
          <CardHeader>
            <CardTitle>Course Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="course_code">Course Code *</Label>
              <Input
                id="course_code"
                name="course_code"
                value={formData.course_code}
                onChange={(e) => setFormData((prev) => ({ ...prev, course_code: e.target.value }))}
                placeholder="e.g., CSC101"
                required
              />
            </div>
            <div>
              <Label htmlFor="course_title">Course Title *</Label>
              <Input
                id="course_title"
                name="course_title"
                value={formData.course_title}
                onChange={(e) => setFormData((prev) => ({ ...prev, course_title: e.target.value }))}
                placeholder="e.g., Introduction to Computer Science"
                required
              />
            </div>
          </CardContent>
        </Card>

        <div className="flex gap-4">
          <FormSubmit className="flex-1">
            <Save className="h-4 w-4 mr-2" />
            Update Course
          </FormSubmit>
          <Button asChild variant="outline" className="flex-1 bg-transparent">
            <Link href="/admin/courses">Cancel</Link>
          </Button>
        </div>
      </form>
    </div>
  )
}
