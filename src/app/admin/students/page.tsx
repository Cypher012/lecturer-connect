"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, Plus, Edit, Trash2, Eye, Calendar } from "lucide-react"
import Link from "next/link"
import { mockDatabase, type StudentProfile } from "@/lib/database"

export default function StudentsManagement() {
  const [searchQuery, setSearchQuery] = useState("")
  const [students, setStudents] = useState<StudentProfile[]>([])
  const [filteredStudents, setFilteredStudents] = useState<StudentProfile[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadStudents = async () => {
      try {
        const studentData = await mockDatabase.getAllStudentProfiles()
        setStudents(studentData)
        setFilteredStudents(studentData)
      } catch (error) {
        console.error("Error loading students:", error)
      } finally {
        setLoading(false)
      }
    }

    loadStudents()
  }, [])

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    if (query.trim() === "") {
      setFilteredStudents(students)
    } else {
      const filtered = students.filter(
        (student) =>
          student.name.toLowerCase().includes(query.toLowerCase()) ||
          student.email.toLowerCase().includes(query.toLowerCase()) ||
          student.studentId.toLowerCase().includes(query.toLowerCase()) ||
          student.program.toLowerCase().includes(query.toLowerCase()) ||
          student.researchInterests.some((interest) => interest.toLowerCase().includes(query.toLowerCase())),
      )
      setFilteredStudents(filtered)
    }
  }

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this student?")) {
      try {
        // In a real app, this would call an API to delete
        // For now, just remove from localStorage
        const updatedStudents = students.filter((student) => student.id !== id)
        localStorage.setItem("students", JSON.stringify(updatedStudents))
        setStudents(updatedStudents)
        setFilteredStudents(
          updatedStudents.filter(
            (student) =>
              searchQuery === "" ||
              student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
              student.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
              student.studentId.toLowerCase().includes(searchQuery.toLowerCase()) ||
              student.program.toLowerCase().includes(searchQuery.toLowerCase()),
          ),
        )
      } catch (error) {
        console.error("Error deleting student:", error)
      }
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">Loading students...</div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Student Management</h1>
          <p className="text-slate-600">Manage student profiles and information</p>
        </div>
        <Button asChild>
          <Link href="/admin/students/new">
            <Plus className="h-4 w-4 mr-2" />
            Add New Student
          </Link>
        </Button>
      </div>

      <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg mb-6">
        <CardHeader>
          <CardTitle>Search & Filter</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
            <Input
              placeholder="Search by name, email, student ID, program, or research interests..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
        <CardHeader>
          <CardTitle>Students ({filteredStudents.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Student ID</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Program</TableHead>
                  <TableHead>Year</TableHead>
                  <TableHead>Research Interests</TableHead>
                  <TableHead>Joined</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredStudents.map((student) => (
                  <TableRow key={student.id}>
                    <TableCell className="font-medium">{student.name}</TableCell>
                    <TableCell>{student.studentId}</TableCell>
                    <TableCell>{student.email}</TableCell>
                    <TableCell>{student.program}</TableCell>
                    <TableCell>{student.year}</TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {student.researchInterests.slice(0, 2).map((interest) => (
                          <Badge key={interest} variant="secondary" className="text-xs">
                            {interest}
                          </Badge>
                        ))}
                        {student.researchInterests.length > 2 && (
                          <Badge variant="outline" className="text-xs">
                            +{student.researchInterests.length - 2}
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1 text-sm text-slate-500">
                        <Calendar className="h-3 w-3" />
                        {new Date(student.createdAt).toLocaleDateString()}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button asChild size="sm" variant="outline">
                          <Link href={`/admin/students/${student.id}`}>
                            <Eye className="h-4 w-4" />
                          </Link>
                        </Button>
                        <Button asChild size="sm" variant="outline">
                          <Link href={`/admin/students/${student.id}/edit`}>
                            <Edit className="h-4 w-4" />
                          </Link>
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleDelete(student.id)}
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
                {filteredStudents.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-8 text-slate-500">
                      {students.length === 0
                        ? "No students found. Students will appear here after they complete onboarding."
                        : "No students match your search criteria."}
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
