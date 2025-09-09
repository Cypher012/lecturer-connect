import { notFound } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Mail, Phone, ExternalLink, BookOpen, GraduationCap, FileText, Briefcase, Calendar } from "lucide-react"
import { getLecturerById } from "@/lib/mock-data"
import Image from "next/image"
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
      {/* Header Section */}
      <section className="bg-muted/30 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-start space-y-6 lg:space-y-0 lg:space-x-8">
            {/* Profile Picture */}
            <div className="relative w-48 h-48 rounded-full overflow-hidden bg-muted flex-shrink-0 mx-auto lg:mx-0">
              <Image
                src={lecturer.profile_picture || "/placeholder.svg"}
                alt={lecturer.full_name}
                fill
                className="object-cover"
              />
            </div>

            {/* Basic Info */}
            <div className="flex-1 text-center lg:text-left">
              <h1 className="text-4xl font-bold text-foreground mb-2">{lecturer.full_name}</h1>
              <p className="text-xl text-muted-foreground mb-2">{lecturer.title}</p>
              <p className="text-lg text-accent font-medium mb-4">{lecturer.department.name}</p>

              {/* Contact Info */}
              <div className="flex flex-col sm:flex-row gap-4 mb-6 justify-center lg:justify-start">
                <Button variant="outline" asChild>
                  <a href={`mailto:${lecturer.email}`}>
                    <Mail className="h-4 w-4 mr-2" />
                    {lecturer.email}
                  </a>
                </Button>
                {lecturer.phone && (
                  <Button variant="outline" asChild>
                    <a href={`tel:${lecturer.phone}`}>
                      <Phone className="h-4 w-4 mr-2" />
                      {lecturer.phone}
                    </a>
                  </Button>
                )}
              </div>

              {/* External Links */}
              <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
                {lecturer.linkedin_url && (
                  <Button size="sm" variant="outline" asChild>
                    <a href={lecturer.linkedin_url} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4 mr-1" />
                      LinkedIn
                    </a>
                  </Button>
                )}
                {lecturer.personal_website && (
                  <Button size="sm" variant="outline" asChild>
                    <a href={lecturer.personal_website} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4 mr-1" />
                      Website
                    </a>
                  </Button>
                )}
                {lecturer.orcid && (
                  <Button size="sm" variant="outline" asChild>
                    <a href={`https://orcid.org/${lecturer.orcid}`} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4 mr-1" />
                      ORCID
                    </a>
                  </Button>
                )}
                {lecturer.scopus_id && (
                  <Button size="sm" variant="outline" asChild>
                    <a
                      href={`https://www.scopus.com/authid/detail.uri?authorId=${lecturer.scopus_id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ExternalLink className="h-4 w-4 mr-1" />
                      Scopus
                    </a>
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content Tabs */}
      <section className="py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="grid w-full grid-cols-2 lg:grid-cols-5">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="courses">Courses</TabsTrigger>
              <TabsTrigger value="research">Research</TabsTrigger>
              <TabsTrigger value="publications">Publications</TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Research Areas */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <BookOpen className="h-5 w-5" />
                      <span>Research Areas</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {lecturer.researchAreas.map((area) => (
                        <Badge key={area} variant="secondary">
                          {area}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Qualifications */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <GraduationCap className="h-5 w-5" />
                      <span>Qualifications</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {lecturer.qualifications.map((qualification, index) => (
                        <li key={index} className="flex items-start space-x-2">
                          <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0" />
                          <span>{qualification}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Courses Tab */}
            <TabsContent value="courses">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <BookOpen className="h-5 w-5" />
                    <span>Courses Taught</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {lecturer.courses.map((course) => (
                      <Card key={course.course_code} className="border-l-4 border-l-accent">
                        <CardContent className="p-4">
                          <h3 className="font-semibold text-foreground">{course.course_code}</h3>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Research Tab */}
            <TabsContent value="research">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <FileText className="h-5 w-5" />
                    <span>Research Focus</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {lecturer.researchAreas.map((area) => (
                      <div key={area} className="p-4 bg-muted/50 rounded-lg">
                        <h3 className="font-semibold text-foreground mb-2">{area}</h3>
                        <p className="text-muted-foreground text-sm">
                          Active research in {area.toLowerCase()} with focus on innovative solutions and practical
                          applications.
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Publications Tab */}
            <TabsContent value="publications">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <FileText className="h-5 w-5" />
                    <span>Publications</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {lecturer.publications.map((publication, index) => (
                      <div key={index} className="p-4 border rounded-lg">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h3 className="font-semibold text-foreground mb-1">{publication.title}</h3>
                            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                              <span className="flex items-center space-x-1">
                                <Calendar className="h-4 w-4" />
                                <span>{publication.year}</span>
                              </span>
                              <Badge variant="outline" className="text-xs">
                                {publication.type}
                              </Badge>
                            </div>
                          </div>
                          {publication.doi && (
                            <Button size="sm" variant="outline" asChild>
                              <a href={`https://doi.org/${publication.doi}`} target="_blank" rel="noopener noreferrer">
                                <ExternalLink className="h-4 w-4" />
                              </a>
                            </Button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

          </Tabs>
        </div>
      </section>
    </div>
  )
}
