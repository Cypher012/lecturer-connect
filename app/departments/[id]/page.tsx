import { notFound } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { LecturerCard } from "@/components/lecturer-card"
import { departments, getLecturersByDepartment } from "@/lib/mock-data"
import { ArrowLeft, Users, BookOpen, Mail } from "lucide-react"
import Link from "next/link"

interface DepartmentPageProps {
  params: {
    id: string
  }
}

export default function DepartmentPage({ params }: DepartmentPageProps) {
  const department = departments.find((dept) => dept.id === params.id)

  if (!department) {
    notFound()
  }

  const departmentLecturers = getLecturersByDepartment(department.name)

  // Get unique research areas from department lecturers
  const researchAreas = Array.from(new Set(departmentLecturers.flatMap((lecturer) => lecturer.research_areas))).sort()

  // Get unique courses from department lecturers
  const courses = Array.from(new Set(departmentLecturers.flatMap((lecturer) => lecturer.courses_taught))).sort()

  return (
    <div className="min-h-screen bg-background">
      {/* Header Section */}
      <section className="bg-muted/30 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Button */}
          <div className="mb-8">
            <Link href="/departments">
              <Button variant="outline" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Departments
              </Button>
            </Link>
          </div>

          <div className="text-center">
            <div className="flex justify-center mb-6">
              <BookOpen className="h-12 w-12 text-accent" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 text-balance">{department.name}</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8 text-pretty">{department.description}</p>

            {/* Department Stats */}
            <div className="flex justify-center space-x-8 mb-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-accent">{departmentLecturers.length}</div>
                <div className="text-sm text-muted-foreground">Faculty Members</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-accent">{courses.length}</div>
                <div className="text-sm text-muted-foreground">Courses Offered</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-accent">{researchAreas.length}</div>
                <div className="text-sm text-muted-foreground">Research Areas</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Department Overview */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {/* Research Areas */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BookOpen className="h-5 w-5" />
                  <span>Research Areas</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {researchAreas.map((area) => (
                    <div key={area} className="p-3 bg-muted/50 rounded-lg text-sm">
                      {area}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Courses Offered */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Users className="h-5 w-5" />
                  <span>Courses Offered</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {courses.slice(0, 8).map((course) => (
                    <div key={course} className="p-3 bg-muted/50 rounded-lg text-sm">
                      {course}
                    </div>
                  ))}
                  {courses.length > 8 && (
                    <div className="p-3 bg-accent/10 rounded-lg text-sm text-accent font-medium">
                      +{courses.length - 8} more courses
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Faculty Members */}
      <section className="py-12 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Meet Our Faculty</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Get to know the distinguished faculty members who are leading research and education in{" "}
              {department.name.toLowerCase()}.
            </p>
          </div>

          {departmentLecturers.length === 0 ? (
            <Card className="text-center py-12">
              <CardContent>
                <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">No faculty members found</h3>
                <p className="text-muted-foreground mb-4">
                  Faculty information for this department will be available soon.
                </p>
                <Link href="/lecturers">
                  <Button variant="outline">Browse All Faculty</Button>
                </Link>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {departmentLecturers.map((lecturer) => (
                <LecturerCard key={lecturer.id} lecturer={lecturer} variant="grid" />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Card className="bg-accent text-accent-foreground">
            <CardHeader>
              <CardTitle className="text-2xl">Interested in {department.name}?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-accent-foreground/90">
                Connect with our faculty members to learn more about research opportunities, course offerings, and
                academic programs.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/lecturers">
                  <Button size="lg" variant="secondary" className="min-w-48">
                    Browse Faculty
                  </Button>
                </Link>
                <Link href="/chat">
                  <Button
                    size="lg"
                    variant="outline"
                    className="min-w-48 border-accent-foreground text-accent-foreground hover:bg-accent-foreground hover:text-accent bg-transparent"
                  >
                    <Mail className="h-4 w-4 mr-2" />
                    Ask Questions
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}
