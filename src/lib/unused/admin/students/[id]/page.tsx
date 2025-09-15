"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Mail, Calendar, User, GraduationCap, Target, Brain } from "lucide-react"
import Link from "next/link"
import { mockDatabase, type StudentProfile } from "@/lib/database"

export default function StudentDetails({ params }: { params: { id: string } }) {
  const [student, setStudent] = useState<StudentProfile | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadStudent = async () => {
      try {
        const students = await mockDatabase.getAllStudentProfiles()
        const studentData = students.find((s) => s.id === params.id)
        setStudent(studentData || null)
      } catch (error) {
        console.error("Error loading student:", error)
      } finally {
        setLoading(false)
      }
    }

    loadStudent()
  }, [params.id])

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">Loading student details...</div>
      </div>
    )
  }

  if (!student) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-900 mb-4">Student Not Found</h1>
          <Button asChild>
            <Link href="/admin/students">Back to Students</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center gap-4 mb-8">
        <Button asChild variant="outline" size="sm">
          <Link href="/admin/students">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Students
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">{student.name}</h1>
          <p className="text-slate-600">Student Profile Details</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Basic Information */}
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Basic Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex items-center gap-2 text-sm text-slate-500 mb-1">
                <Mail className="h-4 w-4" />
                Email
              </div>
              <p className="font-medium">{student.email}</p>
            </div>
            <div>
              <div className="text-sm text-slate-500 mb-1">Student ID</div>
              <p className="font-medium">{student.studentId}</p>
            </div>
            <div>
              <div className="flex items-center gap-2 text-sm text-slate-500 mb-1">
                <GraduationCap className="h-4 w-4" />
                Program
              </div>
              <p className="font-medium">{student.program}</p>
            </div>
            <div>
              <div className="text-sm text-slate-500 mb-1">Academic Year</div>
              <p className="font-medium">{student.year}</p>
            </div>
            <div>
              <div className="flex items-center gap-2 text-sm text-slate-500 mb-1">
                <Calendar className="h-4 w-4" />
                Joined
              </div>
              <p className="font-medium">{new Date(student.createdAt).toLocaleDateString()}</p>
            </div>
          </CardContent>
        </Card>

        {/* Academic Interests */}
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              Academic Profile
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h4 className="font-medium text-slate-900 mb-2">Research Interests</h4>
              <div className="flex flex-wrap gap-2">
                {student.researchInterests.map((interest) => (
                  <Badge key={interest} variant="secondary">
                    {interest}
                  </Badge>
                ))}
                {student.researchInterests.length === 0 && (
                  <p className="text-slate-500 text-sm">No research interests specified</p>
                )}
              </div>
            </div>

            <div>
              <h4 className="font-medium text-slate-900 mb-2">Skills</h4>
              <div className="flex flex-wrap gap-2">
                {student.skills.map((skill) => (
                  <Badge key={skill} variant="outline">
                    {skill}
                  </Badge>
                ))}
                {student.skills.length === 0 && <p className="text-slate-500 text-sm">No skills specified</p>}
              </div>
            </div>

            <div>
              <h4 className="font-medium text-slate-900 mb-2">Career Goals</h4>
              <p className="text-slate-600">{student.careerGoals || "No career goals specified"}</p>
            </div>

            <div>
              <h4 className="flex items-center gap-2 font-medium text-slate-900 mb-2">
                <Brain className="h-4 w-4" />
                Preferred Learning Style
              </h4>
              <Badge variant="secondary">{student.preferredLearningStyle || "Not specified"}</Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-6 flex gap-4">
        <Button asChild>
          <Link href={`/admin/students/${student.id}/edit`}>Edit Student Profile</Link>
        </Button>
      </div>
    </div>
  )
}
