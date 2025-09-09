import Link from "next/link"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Mail, User, BookOpen, Award, ExternalLink } from "lucide-react"
import Image from "next/image"
import { LecturerWithRelations } from "../lib/actions/lecturers"

interface LecturerCardProps {
  lecturer: LecturerWithRelations
  variant?: "grid" | "list"
}

export function LecturerCard({ lecturer, variant = "grid" }: LecturerCardProps) {
  if (variant === "list") {
    return (
      <Card className="hover-lift card-gradient border-0 overflow-hidden relative group">
        <div className="absolute inset-0 shimmer opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <CardContent className="p-6 relative z-10">
          <div className="flex items-start space-x-6">
            <div className="relative w-20 h-20 rounded-2xl overflow-hidden bg-muted flex-shrink-0 profile-ring">
              <Image
                src={lecturer.profile_picture || "/placeholder.svg"}
                alt={lecturer.full_name}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute bottom-1 right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="text-xl font-bold text-foreground truncate mb-1">{lecturer.full_name}</h3>
                  <p className="text-sm text-muted-foreground font-medium">{lecturer.title}</p>
                  <p className="text-sm text-accent font-semibold">{lecturer.department.name}</p>
                </div>
                <div className="flex space-x-2 flex-shrink-0">
                  <Button
                    variant="outline"
                    size="sm"
                    className="hover:bg-accent hover:text-accent-foreground transition-colors bg-transparent"
                    asChild
                  >
                    <a href={`mailto:${lecturer.email}`}>
                      <Mail className="h-4 w-4" />
                    </a>
                  </Button>
                  <Button size="sm" className="bg-primary hover:bg-primary/90" asChild>
                    <Link href={`/lecturers/${lecturer.id}`}>
                      View Profile
                      <ExternalLink className="h-4 w-4 ml-1" />
                    </Link>
                  </Button>
                </div>
              </div>

              <div className="mb-4">
                <div className="flex flex-wrap gap-2">
                  {lecturer.researchAreas.slice(0, 4).map((area, index) => (
                    <Badge
                      key={area}
                      variant="secondary"
                      className={`text-xs font-medium ${
                        index === 0
                          ? "bg-primary text-primary-foreground"
                          : index === 1
                            ? "bg-accent text-accent-foreground"
                            : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {area}
                    </Badge>
                  ))}
                  {lecturer.researchAreas.length > 4 && (
                    <Badge variant="outline" className="text-xs border-accent text-accent">
                      +{lecturer.researchAreas.length - 4} more
                    </Badge>
                  )}
                </div>
              </div>

              <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                <div className="flex items-center space-x-1">
                  <BookOpen className="h-4 w-4" />
                  <span>{lecturer.courses?.length || 0} courses</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Award className="h-4 w-4" />
                  <span>{lecturer.publications?.length || 0} publications</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="hover-lift card-gradient border-0 overflow-hidden relative group h-full">
      <div className="absolute inset-0 card-texture opacity-30" />
      <div className="absolute inset-0 shimmer opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <CardHeader className="text-center pb-4 relative z-10">
        <div className="relative w-28 h-28 mx-auto rounded-3xl overflow-hidden bg-muted mb-4 profile-ring">
          <Image
            src={lecturer.profile_picture || "/placeholder.svg"}
            alt={lecturer.full_name}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full border-3 border-white flex items-center justify-center">
            <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
          </div>
        </div>
        <h3 className="text-lg font-bold text-foreground text-balance mb-1">{lecturer.full_name}</h3>
        <p className="text-sm text-muted-foreground font-medium">{lecturer.title}</p>
        <p className="text-sm text-accent font-semibold">{lecturer.department.name}</p>
      </CardHeader>

      <CardContent className="space-y-4 relative z-10">
        <div>
          <h4 className="text-sm font-semibold text-foreground mb-3 flex items-center">
            <Award className="h-4 w-4 mr-2 text-accent" />
            Research Areas
          </h4>
          <div className="flex flex-wrap gap-2">
            {(lecturer.researchAreas ?? []).slice(0, 3).map((area, index) => (
              <Badge
                key={area}
                variant="secondary"
                className={`text-xs font-medium transition-all duration-300 hover:scale-105 ${
                  index === 0
                    ? "bg-primary text-primary-foreground shadow-lg"
                    : index === 1
                      ? "bg-accent text-accent-foreground shadow-md"
                      : "bg-muted text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                }`}
              >
                {area}
              </Badge>
            ))}
            {lecturer.researchAreas && lecturer.researchAreas.length > 3 && (
              <Badge
                variant="outline"
                className="text-xs border-accent text-accent hover:bg-accent hover:text-accent-foreground transition-colors"
              >
                +{lecturer.researchAreas.length - 3}
              </Badge>
            )}
          </div>
        </div>

        <div className="flex justify-between text-xs text-muted-foreground bg-muted/50 rounded-lg p-3">
          <div className="text-center">
            <div className="font-bold text-foreground">{lecturer.courses?.length || 0}</div>
            <div>Courses</div>
          </div>
          <div className="text-center">
            <div className="font-bold text-foreground">{lecturer.publications?.length || 0}</div>
            <div>Publications</div>
          </div>
          <div className="text-center">
            <div className="font-bold text-foreground">{lecturer.researchAreas?.length || 0}</div>
            <div>Research Areas</div>
          </div>
        </div>

        <div className="flex space-x-2 pt-2">
          <Button
            variant="outline"
            size="sm"
            className="flex-1 bg-transparent hover:bg-accent hover:text-accent-foreground hover:border-accent transition-all duration-300"
            asChild
          >
            <a href={`mailto:${lecturer.email}`}>
              <Mail className="h-4 w-4 mr-2" />
              Email
            </a>
          </Button>
          <Button
            size="sm"
            className="flex-1 bg-primary hover:bg-primary/90 shadow-lg hover:shadow-xl transition-all duration-300"
            asChild
          >
            <Link href={`/lecturers/${lecturer.id}`}>
              <User className="h-4 w-4 mr-2" />
              Profile
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
