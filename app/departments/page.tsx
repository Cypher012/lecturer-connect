import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DepartmentCard } from "@/components/department-card"
import { departments ,getLecturersByDepartment, lecturers } from "@/lib/mock-data"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { Building2, Users, ArrowRight, BookOpen, GraduationCap } from "lucide-react"


export default function DepartmentsPage() {
  const totalLecturers = lecturers.length
  const totalDepartments = departments.length

  return (
    <div className="min-h-screen bg-background">
      {/* Header Section */}
      <section className="bg-muted/30 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="flex justify-center mb-6">
              <BookOpen className="h-12 w-12 text-accent" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 text-balance">Academic Departments</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
              Explore the diverse range of computing disciplines and discover the expert faculty who are shaping the
              future of technology and innovation.
            </p>
          </div>

          {/* Stats */}
          <div className="flex justify-center space-x-12 mb-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-accent mb-2">{totalDepartments}</div>
              <div className="text-sm text-muted-foreground">Departments</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-accent mb-2">{totalLecturers}</div>
              <div className="text-sm text-muted-foreground">Faculty Members</div>
            </div>
          </div>
        </div>
      </section>

      {/* Departments Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {departments.map((department) => {
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

      {/* Additional Info Section */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Why Choose Our Faculty?</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our departments are led by world-class researchers and educators committed to excellence in teaching and
              innovation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto mb-4 p-3 bg-accent/10 rounded-full w-fit">
                  <GraduationCap className="h-8 w-8 text-accent" />
                </div>
                <CardTitle>Expert Faculty</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Learn from distinguished professors and researchers with extensive industry and academic experience.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto mb-4 p-3 bg-accent/10 rounded-full w-fit">
                  <BookOpen className="h-8 w-8 text-accent" />
                </div>
                <CardTitle>Cutting-Edge Research</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Engage with the latest research in AI, cybersecurity, data science, and emerging technologies.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto mb-4 p-3 bg-accent/10 rounded-full w-fit">
                  <Users className="h-8 w-8 text-accent" />
                </div>
                <CardTitle>Collaborative Environment</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Join a vibrant academic community that fosters collaboration and innovation across disciplines.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}
