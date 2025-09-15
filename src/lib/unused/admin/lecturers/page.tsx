"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, Plus, Edit, Trash2, Eye } from "lucide-react"
import Link from "next/link"
import { lecturers, searchLecturers, type Lecturer } from "@/lib/mock-data"

export default function LecturersManagement() {
  const [searchQuery, setSearchQuery] = useState("")
  const [filteredLecturers, setFilteredLecturers] = useState<Lecturer[]>(lecturers)

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    if (query.trim() === "") {
      setFilteredLecturers(lecturers)
    } else {
      setFilteredLecturers(searchLecturers(query))
    }
  }

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this lecturer?")) {
      // In a real app, this would call an API
      console.log("Deleting lecturer:", id)
      // For now, just remove from filtered results
      setFilteredLecturers((prev) => prev.filter((lecturer) => lecturer.id !== id))
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Lecturer Management</h1>
          <p className="text-slate-600">Manage faculty members and their information</p>
        </div>
        <Button asChild>
          <Link href="/admin/lecturers/new">
            <Plus className="h-4 w-4 mr-2" />
            Add New Lecturer
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
              placeholder="Search by name, department, or research area..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
        <CardHeader>
          <CardTitle>Lecturers ({filteredLecturers.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Research Areas</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredLecturers.map((lecturer) => (
                  <TableRow key={lecturer.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-3">
                        <img
                          src={lecturer.profile_picture || "/placeholder.svg"}
                          alt={lecturer.full_name}
                          className="w-8 h-8 rounded-full object-cover"
                        />
                        {lecturer.full_name}
                      </div>
                    </TableCell>
                    <TableCell>{lecturer.title}</TableCell>
                    <TableCell>{lecturer.department}</TableCell>
                    <TableCell>{lecturer.email}</TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {lecturer.research_areas.slice(0, 2).map((area) => (
                          <Badge key={area} variant="secondary" className="text-xs">
                            {area}
                          </Badge>
                        ))}
                        {lecturer.research_areas.length > 2 && (
                          <Badge variant="outline" className="text-xs">
                            +{lecturer.research_areas.length - 2}
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button asChild size="sm" variant="outline">
                          <Link href={`/lecturers/${lecturer.id}`}>
                            <Eye className="h-4 w-4" />
                          </Link>
                        </Button>
                        <Button asChild size="sm" variant="outline">
                          <Link href={`/admin/lecturers/${lecturer.id}/edit`}>
                            <Edit className="h-4 w-4" />
                          </Link>
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleDelete(lecturer.id)}
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
