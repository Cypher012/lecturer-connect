"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { X, Plus, Save, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { mockDatabase } from "@/lib/database"

export default function NewStudent() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    studentId: "",
    year: "",
    program: "",
    careerGoals: "",
    preferredLearningStyle: "",
  })

  const [researchInterests, setResearchInterests] = useState<string[]>([])
  const [skills, setSkills] = useState<string[]>([])
  const [newResearchInterest, setNewResearchInterest] = useState("")
  const [newSkill, setNewSkill] = useState("")

  const addItem = (item: string, setter: React.Dispatch<React.SetStateAction<string[]>>, resetInput: () => void) => {
    if (item.trim()) {
      setter((prev) => [...prev, item.trim()])
      resetInput()
    }
  }

  const removeItem = (index: number, setter: React.Dispatch<React.SetStateAction<string[]>>) => {
    setter((prev) => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      await mockDatabase.saveStudentProfile({
        ...formData,
        researchInterests,
        skills,
      })

      // Redirect back to students list
      router.push("/admin/students")
    } catch (error) {
      console.error("Error creating student:", error)
    }
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
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Add New Student</h1>
          <p className="text-slate-600">Create a new student profile</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information */}
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Full Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                required
              />
            </div>
            <div>
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                required
              />
            </div>
            <div>
              <Label htmlFor="studentId">Student ID *</Label>
              <Input
                id="studentId"
                value={formData.studentId}
                onChange={(e) => setFormData((prev) => ({ ...prev, studentId: e.target.value }))}
                required
              />
            </div>
            <div>
              <Label htmlFor="year">Academic Year *</Label>
              <Select onValueChange={(value) => setFormData((prev) => ({ ...prev, year: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select year" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1st Year">1st Year</SelectItem>
                  <SelectItem value="2nd Year">2nd Year</SelectItem>
                  <SelectItem value="3rd Year">3rd Year</SelectItem>
                  <SelectItem value="4th Year">4th Year</SelectItem>
                  <SelectItem value="Graduate">Graduate</SelectItem>
                  <SelectItem value="PhD">PhD</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="md:col-span-2">
              <Label htmlFor="program">Program *</Label>
              <Input
                id="program"
                value={formData.program}
                onChange={(e) => setFormData((prev) => ({ ...prev, program: e.target.value }))}
                placeholder="e.g., Computer Science, Software Engineering"
                required
              />
            </div>
          </CardContent>
        </Card>

        {/* Academic Interests */}
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
          <CardHeader>
            <CardTitle>Academic Interests</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Research Interests */}
            <div>
              <Label>Research Interests</Label>
              <div className="flex gap-2 mb-2">
                <Input
                  value={newResearchInterest}
                  onChange={(e) => setNewResearchInterest(e.target.value)}
                  placeholder="Enter research interest"
                  onKeyPress={(e) =>
                    e.key === "Enter" &&
                    (e.preventDefault(),
                    addItem(newResearchInterest, setResearchInterests, () => setNewResearchInterest("")))
                  }
                />
                <Button
                  type="button"
                  onClick={() => addItem(newResearchInterest, setResearchInterests, () => setNewResearchInterest(""))}
                  size="sm"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {researchInterests.map((interest, index) => (
                  <Badge key={index} variant="secondary" className="flex items-center gap-1">
                    {interest}
                    <X className="h-3 w-3 cursor-pointer" onClick={() => removeItem(index, setResearchInterests)} />
                  </Badge>
                ))}
              </div>
            </div>

            {/* Skills */}
            <div>
              <Label>Skills</Label>
              <div className="flex gap-2 mb-2">
                <Input
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  placeholder="Enter skill"
                  onKeyPress={(e) =>
                    e.key === "Enter" && (e.preventDefault(), addItem(newSkill, setSkills, () => setNewSkill("")))
                  }
                />
                <Button type="button" onClick={() => addItem(newSkill, setSkills, () => setNewSkill(""))} size="sm">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, index) => (
                  <Badge key={index} variant="secondary" className="flex items-center gap-1">
                    {skill}
                    <X className="h-3 w-3 cursor-pointer" onClick={() => removeItem(index, setSkills)} />
                  </Badge>
                ))}
              </div>
            </div>

            <div>
              <Label htmlFor="careerGoals">Career Goals</Label>
              <Textarea
                id="careerGoals"
                value={formData.careerGoals}
                onChange={(e) => setFormData((prev) => ({ ...prev, careerGoals: e.target.value }))}
                placeholder="Describe career aspirations and goals"
                rows={3}
              />
            </div>

            <div>
              <Label htmlFor="preferredLearningStyle">Preferred Learning Style</Label>
              <Select onValueChange={(value) => setFormData((prev) => ({ ...prev, preferredLearningStyle: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select learning style" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Visual">Visual</SelectItem>
                  <SelectItem value="Auditory">Auditory</SelectItem>
                  <SelectItem value="Kinesthetic">Kinesthetic</SelectItem>
                  <SelectItem value="Reading/Writing">Reading/Writing</SelectItem>
                  <SelectItem value="Mixed">Mixed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <div className="flex gap-4">
          <Button type="submit" className="flex-1">
            <Save className="h-4 w-4 mr-2" />
            Create Student
          </Button>
          <Button asChild variant="outline" className="flex-1 bg-transparent">
            <Link href="/admin/students">Cancel</Link>
          </Button>
        </div>
      </form>
    </div>
  )
}
