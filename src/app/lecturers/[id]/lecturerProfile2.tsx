import { notFound } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Mail, Phone, ExternalLink, BookOpen, Award, Briefcase, Users } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { getLecturerById } from "@/lib/mock-data"
import { LecturerWithRelations } from "~/src/lib/actions/lecturers"


interface LecturerProfilePageProps {
  params: {
    id: string
  }
}

export default function LecturerProfilePage({ lecturer }: {lecturer: LecturerWithRelations | null}) {

  if (!lecturer) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <Card className="mb-8">
          <CardContent className="p-8">
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Profile Picture */}
              <div className="flex-shrink-0">
                <div className="relative w-48 h-48 rounded-full overflow-hidden bg-muted mx-auto lg:mx-0">
                  <Image
                    src={lecturer.profile_picture || "/placeholder.svg"}
                    alt={lecturer.full_name}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              {/* Basic Info */}
              <div className="flex-1 text-center lg:text-left">
                <h1 className="text-4xl font-bold text-foreground mb-2">{lecturer.full_name}</h1>
                <p className="text-xl text-primary font-semibold mb-2">{lecturer.title}</p>
                <p className="text-lg text-muted-foreground mb-6">{lecturer.department.name}</p>

                {/* Contact Info */}
                <div className="flex flex-col sm:flex-row gap-4 mb-6 justify-center lg:justify-start">
                  <Button asChild variant="default">
                    <a href={`mailto:${lecturer.email}`}>
                      <Mail className="mr-2 h-4 w-4" />
                      {lecturer.email}
                    </a>
                  </Button>
                  {lecturer.phone && (
                    <Button asChild variant="outline">
                      <a href={`tel:${lecturer.phone}`}>
                        <Phone className="mr-2 h-4 w-4" />
                        {lecturer.phone}
                      </a>
                    </Button>
                  )}
                </div>

                {/* External Links */}
                <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
                  {lecturer.linkedin_url && (
                    <Button asChild variant="outline" size="sm">
                      <a href={lecturer.linkedin_url} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="mr-1 h-3 w-3" />
                        LinkedIn
                      </a>
                    </Button>
                  )}
                  {lecturer.personal_website && (
                    <Button asChild variant="outline" size="sm">
                      <a href={lecturer.personal_website} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="mr-1 h-3 w-3" />
                        Website
                      </a>
                    </Button>
                  )}
                  {lecturer.orcid && (
                    <Button asChild variant="outline" size="sm">
                      <a href={`https://orcid.org/${lecturer.orcid}`} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="mr-1 h-3 w-3" />
                        ORCID
                      </a>
                    </Button>
                  )}
                  {lecturer.scopus_id && (
                    <Button asChild variant="outline" size="sm">
                      <a
                        href={`https://www.scopus.com/authid/detail.uri?authorId=${lecturer.scopus_id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLink className="mr-1 h-3 w-3" />
                        Scopus
                      </a>
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Research Areas */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5" />
                  Research Areas
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {lecturer.researchAreas.map((area) => (
                    <Badge key={area} variant="secondary" className="text-sm">
                      {area}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Courses Taught */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Courses Taught
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {lecturer.courses.map((course) => (
                    <div key={course.course_code} className="p-3 bg-muted rounded-lg">
                      <p className="font-medium text-foreground">{course.course_code}: {course.course_title}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Publications */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5" />
                  Recent Publications
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {lecturer.publications.map((publication, index) => (
                    <div key={index} className="border-l-4 border-primary pl-4">
                      <h4 className="font-semibold text-foreground mb-1">{publication.title}</h4>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Badge variant="outline" className="text-xs">
                            {publication.type}
                          </Badge>
                        </span>
                        <span>{publication.year}</span>
                        {publication.doi && (
                          <a
                            href={`https://doi.org/${publication.doi}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary hover:underline flex items-center gap-1"
                          >
                            <ExternalLink className="h-3 w-3" />
                            DOI
                          </a>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Qualifications */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5" />
                  Qualifications
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {lecturer.qualifications.map((qualification, index) => (
                    <div key={index} className="p-3 bg-muted rounded-lg">
                      <p className="text-sm font-medium text-foreground">{qualification}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button asChild className="w-full">
                  <a href={`mailto:${lecturer.email}`}>
                    <Mail className="mr-2 h-4 w-4" />
                    Send Email
                  </a>
                </Button>
                <Button asChild variant="outline" className="w-full bg-transparent">
                  <Link href="/chat">
                    <Users className="mr-2 h-4 w-4" />
                    Ask AI About This Lecturer
                  </Link>
                </Button>
                <Button asChild variant="outline" className="w-full bg-transparent">
                  <Link href="/lecturers">
                    <BookOpen className="mr-2 h-4 w-4" />
                    Browse More Lecturers
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* Department Info */}
            <Card>
              <CardHeader>
                <CardTitle>Department</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="font-medium text-foreground mb-2">{lecturer.department.name}</p>
                <Button asChild variant="outline" size="sm" className="w-full bg-transparent">
                  <Link href={`/departments`}>View Department</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
