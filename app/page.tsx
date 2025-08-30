"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Search, Users, BookOpen, MessageCircle, GraduationCap, ArrowRight, Building2  } from "lucide-react"
import Link from "next/link"
import { departments, getLecturersByDepartment, lecturers } from "@/lib/mock-data"

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("")

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      window.location.href = `/lecturers?search=${encodeURIComponent(searchQuery)}`
    }
  }

  const totalLecturers = lecturers.length
  const totalDepartments = departments.length

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary to-primary/90 text-primary-foreground py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex justify-center mb-6">
            <GraduationCap className="h-16 w-16 text-accent" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-balance">
            Discover Your Lecturers in the Faculty of Computing
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-primary-foreground/90 max-w-3xl mx-auto text-pretty">
            Connect with faculty members, explore their research areas, and find the perfect mentor for your academic
            journey.
          </p>

          {/* Main Search Bar */}
          <form onSubmit={handleSearch} className="max-w-2xl mx-auto mb-8">
            <div className="relative">
              <Input
                type="text"
                placeholder="Search by lecturer name, department, or research area..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-14 text-lg pl-6 pr-16 bg-white text-foreground border-0 shadow-lg"
              />
              <Button type="submit" size="lg" className="absolute right-2 top-2 h-10 px-6 bg-accent hover:bg-accent/90">
                <Search className="h-5 w-5 mr-2" />
                Search
              </Button>
            </div>
          </form>

          {/* Stats */}
          <div className="flex justify-center space-x-8 text-primary-foreground/80">
            <div className="text-center">
              <div className="text-2xl font-bold text-accent">{totalLecturers}</div>
              <div className="text-sm">Lecturers</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-accent">{totalDepartments}</div>
              <div className="text-sm">Departments</div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Links Section */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Explore Our Faculty</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Choose how you'd like to discover and connect with our distinguished faculty members.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Browse by Department */}
            <Card className="group hover:shadow-lg transition-all duration-300 border-2 hover:border-accent/50">
              <CardHeader className="text-center pb-4">
                <div className="mx-auto mb-4 p-3 bg-accent/10 rounded-full w-fit group-hover:bg-accent/20 transition-colors">
                  <BookOpen className="h-8 w-8 text-accent" />
                </div>
                <CardTitle className="text-xl">Browse by Department</CardTitle>
                <CardDescription>
                  Explore lecturers organized by their academic departments and specializations.
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <Link href="/departments">
                  <Button className="w-full bg-accent hover:bg-accent/90 group">
                    View Departments
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* View All Lecturers */}
            <Card className="group hover:shadow-lg transition-all duration-300 border-2 hover:border-accent/50">
              <CardHeader className="text-center pb-4">
                <div className="mx-auto mb-4 p-3 bg-accent/10 rounded-full w-fit group-hover:bg-accent/20 transition-colors">
                  <Users className="h-8 w-8 text-accent" />
                </div>
                <CardTitle className="text-xl">View All Lecturers</CardTitle>
                <CardDescription>
                  Browse the complete directory of faculty members with filtering and search options.
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <Link href="/lecturers">
                  <Button className="w-full bg-accent hover:bg-accent/90 group">
                    View All Lecturers
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Chat with AI Assistant */}
            <Card className="group hover:shadow-lg transition-all duration-300 border-2 hover:border-accent/50">
              <CardHeader className="text-center pb-4">
                <div className="mx-auto mb-4 p-3 bg-accent/10 rounded-full w-fit group-hover:bg-accent/20 transition-colors">
                  <MessageCircle className="h-8 w-8 text-accent" />
                </div>
                <CardTitle className="text-xl">Chat with AI Assistant</CardTitle>
                <CardDescription>
                  Ask questions about lecturers, courses, and research areas using our intelligent chatbot.
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <Link href="/chat">
                  <Button className="w-full bg-accent hover:bg-accent/90 group">
                    Start Chatting
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Featured Departments */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Our Departments</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Discover the diverse range of computing disciplines and the expert faculty who lead them.
            </p>
          </div>
          {/* Departmental Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {departments.slice(0, 6).map((department) => {
            const departmentLecturers = getLecturersByDepartment(department.name)
            const lecturerCount = departmentLecturers.length

            return (
              <Card key={department.id} className="hover:shadow-lg transition-shadow duration-200 group">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                        <Building2 className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-xl text-balance">{department.name}</CardTitle>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground text-pretty">{department.description}</p>

                  {/* Stats */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">
                        {lecturerCount} {lecturerCount === 1 ? "Lecturer" : "Lecturers"}
                      </span>
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {department.id.toUpperCase()}
                    </Badge>
                  </div>

                  {/* Research Areas Preview */}
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium text-foreground flex items-center gap-2">
                      <BookOpen className="h-3 w-3" />
                      Key Research Areas
                    </h4>
                    <div className="flex flex-wrap gap-1">
                      {departmentLecturers
                        .flatMap((lecturer) => lecturer.research_areas)
                        .filter((area, index, self) => self.indexOf(area) === index)
                        .slice(0, 3)
                        .map((area) => (
                          <Badge key={area} variant="outline" className="text-xs">
                            {area}
                          </Badge>
                        ))}
                      {departmentLecturers
                        .flatMap((lecturer) => lecturer.research_areas)
                        .filter((area, index, self) => self.indexOf(area) === index).length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +
                          {departmentLecturers
                            .flatMap((lecturer) => lecturer.research_areas)
                            .filter((area, index, self) => self.indexOf(area) === index).length - 3}{" "}
                          more
                        </Badge>
                      )}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2 pt-2">
                    <Button asChild className="flex-1">
                      <Link href={`/lecturers?department=${encodeURIComponent(department.name)}`}>
                        View Lecturers
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

          <div className="text-center mt-8">
            <Link href="/departments">
              <Button variant="outline" size="lg">
                View All Departments
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-accent text-accent-foreground">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Connect with Our Faculty?</h2>
          <p className="text-xl mb-8 text-accent-foreground/90">
            Start exploring lecturer profiles, research areas, and find your perfect academic mentor today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/lecturers">
              <Button size="lg" variant="secondary" className="min-w-48">
                Browse All Lecturers
              </Button>
            </Link>
            <Link href="/chat">
              <Button
                size="lg"
                variant="outline"
                className="min-w-48 border-accent-foreground text-accent-foreground hover:bg-accent-foreground hover:text-accent bg-transparent"
              >
                Ask AI Assistant
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
