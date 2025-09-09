"use client"

import type React from "react"

import { useState, useMemo } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Grid, List, Users } from "lucide-react"
import { LecturerCard } from "@/components/lecturer-card"
import { lecturers, departments, searchLecturers } from "@/lib/mock-data"
import { useSearchParams } from "next/navigation"
import { useDepartments } from "~/src/components/department-provider"
import { Lecturer } from "~/generated/prisma"
import { LecturerWithRelations } from "~/src/lib/actions/lecturers"

export default function LecturersPage({initialLecturers}: {initialLecturers: LecturerWithRelations[]}) {
  const searchParams = useSearchParams()
  const initialSearch = searchParams.get("search") || ""
  const departments = useDepartments()
  const lecturers = initialLecturers

  const [searchQuery, setSearchQuery] = useState(initialSearch)
  const [selectedDepartment, setSelectedDepartment] = useState<string>("all")
  const [selectedResearchArea, setSelectedResearchArea] = useState<string>("all")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  // Get all unique research areas
  const allResearchAreas = useMemo(() => {
    const areas = new Set<string>()
    lecturers.forEach((lecturer) => {
      lecturer.researchAreas.forEach((area) => areas.add(area))
    })
    return Array.from(areas).sort()
  }, [])

  // Filter lecturers based on search and filters
  const filteredLecturers = useMemo(() => {
    let filtered = lecturers

    // Apply search filter
    if (searchQuery.trim()) {
      filtered = searchLecturers(searchQuery, lecturers)
    }

    // Apply department filter
    if (selectedDepartment !== "all") {
      const dept = departments.find((d) => d.id === selectedDepartment)
      if (dept) {
        filtered = filtered.filter((lecturer) => lecturer.department.name === dept.name)
      }
    }

    // Apply research area filter
    if (selectedResearchArea !== "all") {
      filtered = filtered.filter((lecturer) => lecturer.researchAreas.includes(selectedResearchArea))
    }

    return filtered
  }, [searchQuery, selectedDepartment, selectedResearchArea])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // Search is handled by the useMemo above
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header Section */}
      <section className="bg-muted/30 py-12">
        <div className="max-w-[100rem] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-4">Faculty Directory</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Explore our distinguished faculty members and their areas of expertise.
            </p>
          </div>

          {/* Search and Filters */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Search className="h-5 w-5" />
                <span>Search & Filter</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Search Bar */}
              <form onSubmit={handleSearch}>
                <div className="relative">
                  <Input
                    type="text"
                    placeholder="Search by name, department, or research area..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                </div>
              </form>

              {/* Filters */}
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
                    <SelectTrigger>
                      <SelectValue placeholder="All Departments" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Departments</SelectItem>
                      {departments.map((dept) => (
                        <SelectItem key={dept.id} value={dept.id}>
                          {dept.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex-1">
                  <Select value={selectedResearchArea} onValueChange={setSelectedResearchArea}>
                    <SelectTrigger>
                      <SelectValue placeholder="All Research Areas" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Research Areas</SelectItem>
                      {allResearchAreas.map((area) => (
                        <SelectItem key={area} value={area}>
                          {area}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex space-x-2">
                  <Button
                    variant={viewMode === "grid" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setViewMode("grid")}
                  >
                    <Grid className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setViewMode("list")}
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Results Summary */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-2 text-muted-foreground">
              <Users className="h-4 w-4" />
              <span>
                {filteredLecturers.length} lecturer{filteredLecturers.length !== 1 ? "s" : ""} found
              </span>
            </div>

            {(searchQuery || selectedDepartment !== "all" || selectedResearchArea !== "all") && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setSearchQuery("")
                  setSelectedDepartment("all")
                  setSelectedResearchArea("all")
                }}
              >
                Clear Filters
              </Button>
            )}
          </div>
        </div>
      </section>

      {/* Lecturers Grid/List */}
      <section className="py-8">
        <div className="max-w-[100rem] mx-auto px-4 sm:px-6 lg:px-8">
          {filteredLecturers.length === 0 ? (
            <Card className="text-center py-12">
              <CardContent>
                <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">No lecturers found</h3>
                <p className="text-muted-foreground mb-4">Try adjusting your search terms or filters.</p>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchQuery("")
                    setSelectedDepartment("all")
                    setSelectedResearchArea("all")
                  }}
                >
                  Clear All Filters
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div
              className={
                viewMode === "grid"
                  ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                  : "space-y-4"
              }
            >
              {filteredLecturers.map((lecturer) => (
                <LecturerCard key={lecturer.id} lecturer={lecturer} variant={viewMode} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
