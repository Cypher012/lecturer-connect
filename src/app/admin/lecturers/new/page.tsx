"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { X, Plus, Save, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { departments, type Lecturer, type Publication } from "@/lib/mock-data"

export default function NewLecturer() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    full_name: "",
    title: "",
    department: "",
    email: "",
    phone: "",
    profile_picture: "",
    orcid: "",
    scopus_id: "",
    linkedin_url: "",
    personal_website: "",
  })

  const [courses, setCourses] = useState<string[]>([])
  const [researchAreas, setResearchAreas] = useState<string[]>([])
  const [qualifications, setQualifications] = useState<string[]>([])
  const [projects, setProjects] = useState<string[]>([])
  const [publications, setPublications] = useState<Publication[]>([])

  const [newCourse, setNewCourse] = useState("")
  const [newResearchArea, setNewResearchArea] = useState("")
  const [newQualification, setNewQualification] = useState("")
  const [newProject, setNewProject] = useState("")

  const addItem = (item: string, setter: React.Dispatch<React.SetStateAction<string[]>>, resetInput: () => void) => {
    if (item.trim()) {
      setter((prev) => [...prev, item.trim()])
      resetInput()
    }
  }

  const removeItem = (index: number, setter: React.Dispatch<React.SetStateAction<string[]>>) => {
    setter((prev) => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const newLecturer: Lecturer = {
      id: Math.random().toString(36).substr(2, 9),
      ...formData,
      courses_taught: courses,
      research_areas: researchAreas,
      qualifications,
      projects,
      publications,
    }

    // In a real app, this would call an API
    console.log("Creating new lecturer:", newLecturer)

    // Redirect back to lecturers list
    router.push("/admin/lecturers")
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center gap-4 mb-8">
        <Button asChild variant="outline" size="sm">
          <Link href="/admin/lecturers">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Lecturers
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Add New Lecturer</h1>
          <p className="text-slate-600">Create a new faculty member profile</p>
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
              <Label htmlFor="full_name">Full Name *</Label>
              <Input
                id="full_name"
                value={formData.full_name}
                onChange={(e) => setFormData((prev) => ({ ...prev, full_name: e.target.value }))}
                required
              />
            </div>
            <div>
              <Label htmlFor="title">Title *</Label>
              <Select onValueChange={(value) => setFormData((prev) => ({ ...prev, title: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select title" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Professor">Professor</SelectItem>
                  <SelectItem value="Associate Professor">Associate Professor</SelectItem>
                  <SelectItem value="Senior Lecturer">Senior Lecturer</SelectItem>
                  <SelectItem value="Lecturer">Lecturer</SelectItem>
                  <SelectItem value="Assistant Professor">Assistant Professor</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="department">Department *</Label>
              <Select onValueChange={(value) => setFormData((prev) => ({ ...prev, department: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select department" />
                </SelectTrigger>
                <SelectContent>
                  {departments.map((dept) => (
                    <SelectItem key={dept.id} value={dept.name}>
                      {dept.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
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
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
              />
            </div>
            <div>
              <Label htmlFor="profile_picture">Profile Picture URL</Label>
              <Input
                id="profile_picture"
                value={formData.profile_picture}
                onChange={(e) => setFormData((prev) => ({ ...prev, profile_picture: e.target.value }))}
                placeholder="/path/to/image.jpg"
              />
            </div>
          </CardContent>
        </Card>

        {/* Academic Information */}
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
          <CardHeader>
            <CardTitle>Academic Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Courses Taught */}
            <div>
              <Label>Courses Taught</Label>
              <div className="flex gap-2 mb-2">
                <Input
                  value={newCourse}
                  onChange={(e) => setNewCourse(e.target.value)}
                  placeholder="Enter course name"
                  onKeyPress={(e) =>
                    e.key === "Enter" && (e.preventDefault(), addItem(newCourse, setCourses, () => setNewCourse("")))
                  }
                />
                <Button type="button" onClick={() => addItem(newCourse, setCourses, () => setNewCourse(""))} size="sm">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {courses.map((course, index) => (
                  <Badge key={index} variant="secondary" className="flex items-center gap-1">
                    {course}
                    <X className="h-3 w-3 cursor-pointer" onClick={() => removeItem(index, setCourses)} />
                  </Badge>
                ))}
              </div>
            </div>

            {/* Research Areas */}
            <div>
              <Label>Research Areas</Label>
              <div className="flex gap-2 mb-2">
                <Input
                  value={newResearchArea}
                  onChange={(e) => setNewResearchArea(e.target.value)}
                  placeholder="Enter research area"
                  onKeyPress={(e) =>
                    e.key === "Enter" &&
                    (e.preventDefault(), addItem(newResearchArea, setResearchAreas, () => setNewResearchArea("")))
                  }
                />
                <Button
                  type="button"
                  onClick={() => addItem(newResearchArea, setResearchAreas, () => setNewResearchArea(""))}
                  size="sm"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {researchAreas.map((area, index) => (
                  <Badge key={index} variant="secondary" className="flex items-center gap-1">
                    {area}
                    <X className="h-3 w-3 cursor-pointer" onClick={() => removeItem(index, setResearchAreas)} />
                  </Badge>
                ))}
              </div>
            </div>

            {/* Qualifications */}
            <div>
              <Label>Qualifications</Label>
              <div className="flex gap-2 mb-2">
                <Input
                  value={newQualification}
                  onChange={(e) => setNewQualification(e.target.value)}
                  placeholder="Enter qualification"
                  onKeyPress={(e) =>
                    e.key === "Enter" &&
                    (e.preventDefault(), addItem(newQualification, setQualifications, () => setNewQualification("")))
                  }
                />
                <Button
                  type="button"
                  onClick={() => addItem(newQualification, setQualifications, () => setNewQualification(""))}
                  size="sm"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {qualifications.map((qual, index) => (
                  <Badge key={index} variant="secondary" className="flex items-center gap-1">
                    {qual}
                    <X className="h-3 w-3 cursor-pointer" onClick={() => removeItem(index, setQualifications)} />
                  </Badge>
                ))}
              </div>
            </div>

            {/* Projects */}
            <div>
              <Label>Projects</Label>
              <div className="flex gap-2 mb-2">
                <Input
                  value={newProject}
                  onChange={(e) => setNewProject(e.target.value)}
                  placeholder="Enter project name"
                  onKeyPress={(e) =>
                    e.key === "Enter" && (e.preventDefault(), addItem(newProject, setProjects, () => setNewProject("")))
                  }
                />
                <Button
                  type="button"
                  onClick={() => addItem(newProject, setProjects, () => setNewProject(""))}
                  size="sm"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {projects.map((project, index) => (
                  <Badge key={index} variant="secondary" className="flex items-center gap-1">
                    {project}
                    <X className="h-3 w-3 cursor-pointer" onClick={() => removeItem(index, setProjects)} />
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* External Links */}
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
          <CardHeader>
            <CardTitle>External Links & IDs</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="orcid">ORCID ID</Label>
              <Input
                id="orcid"
                value={formData.orcid}
                onChange={(e) => setFormData((prev) => ({ ...prev, orcid: e.target.value }))}
                placeholder="0000-0000-0000-0000"
              />
            </div>
            <div>
              <Label htmlFor="scopus_id">Scopus ID</Label>
              <Input
                id="scopus_id"
                value={formData.scopus_id}
                onChange={(e) => setFormData((prev) => ({ ...prev, scopus_id: e.target.value }))}
              />
            </div>
            <div>
              <Label htmlFor="linkedin_url">LinkedIn URL</Label>
              <Input
                id="linkedin_url"
                value={formData.linkedin_url}
                onChange={(e) => setFormData((prev) => ({ ...prev, linkedin_url: e.target.value }))}
                placeholder="https://linkedin.com/in/username"
              />
            </div>
            <div>
              <Label htmlFor="personal_website">Personal Website</Label>
              <Input
                id="personal_website"
                value={formData.personal_website}
                onChange={(e) => setFormData((prev) => ({ ...prev, personal_website: e.target.value }))}
                placeholder="https://example.com"
              />
            </div>
          </CardContent>
        </Card>

        <div className="flex gap-4">
          <Button type="submit" className="flex-1">
            <Save className="h-4 w-4 mr-2" />
            Create Lecturer
          </Button>
          <Button asChild variant="outline" className="flex-1 bg-transparent">
            <Link href="/admin/lecturers">Cancel</Link>
          </Button>
        </div>
      </form>
    </div>
  )
}
