"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { lecturerMatchingService, type LecturerMatch } from "@/lib/matching"
import { Star, Users, BookOpen, ExternalLink } from "lucide-react"
import Link from "next/link"

interface RecommendedLecturersProps {
  studentEmail: string
  showAll?: boolean
}

export function RecommendedLecturers({ studentEmail, showAll = false }: RecommendedLecturersProps) {
  const [recommendations, setRecommendations] = useState<LecturerMatch[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        setIsLoading(true)
        const matches = showAll
          ? await lecturerMatchingService.findMatchingLecturers(studentEmail, 10)
          : await lecturerMatchingService.getRecommendedLecturers(studentEmail)
        setRecommendations(matches)
      } catch (err) {
        setError("Failed to load recommendations")
        console.error("Error fetching recommendations:", err)
      } finally {
        setIsLoading(false)
      }
    }

    if (studentEmail) {
      fetchRecommendations()
    }
  }, [studentEmail, showAll])

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="animate-pulse">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-muted rounded-full"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-muted rounded w-3/4"></div>
                  <div className="h-3 bg-muted rounded w-1/2"></div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  if (error) {
    return (
      <Card>
        <CardContent className="p-6 text-center">
          <p className="text-muted-foreground">{error}</p>
        </CardContent>
      </Card>
    )
  }

  if (recommendations.length === 0) {
    return (
      <Card>
        <CardContent className="p-6 text-center">
          <p className="text-muted-foreground">
            No recommendations available. Complete your profile to get personalized suggestions.
          </p>
        </CardContent>
      </Card>
    )
  }

  const getMatchScoreColor = (score: number) => {
    if (score >= 20) return "bg-green-100 text-green-800 border-green-200"
    if (score >= 10) return "bg-yellow-100 text-yellow-800 border-yellow-200"
    return "bg-blue-100 text-blue-800 border-blue-200"
  }

  const getMatchScoreLabel = (score: number) => {
    if (score >= 20) return "Excellent Match"
    if (score >= 10) return "Good Match"
    return "Potential Match"
  }

  return (
    <div className="space-y-6">
      {recommendations.map((match, index) => (
        <Card key={match.lecturer.id} className="hover:shadow-lg transition-shadow border-l-4 border-l-accent/30">
          <CardContent className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-4">
                <Avatar className="w-16 h-16">
                  <AvatarImage
                    src={match.lecturer.profile_picture || "/placeholder.svg"}
                    alt={match.lecturer.full_name}
                  />
                  <AvatarFallback>
                    {match.lecturer.full_name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-lg font-semibold text-foreground">{match.lecturer.full_name}</h3>
                  <p className="text-muted-foreground">{match.lecturer.title}</p>
                  <p className="text-sm text-muted-foreground">{match.lecturer.department}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Badge className={`${getMatchScoreColor(match.matchScore)} border`}>
                  <Star className="w-3 h-3 mr-1" />
                  {getMatchScoreLabel(match.matchScore)}
                </Badge>
                <span className="text-sm font-medium text-muted-foreground">{match.matchScore} pts</span>
              </div>
            </div>

            {/* Research Areas */}
            <div className="mb-4">
              <div className="flex flex-wrap gap-2">
                {match.lecturer.research_areas.slice(0, 3).map((area) => (
                  <Badge key={area} variant="secondary" className="text-xs">
                    {area}
                  </Badge>
                ))}
                {match.lecturer.research_areas.length > 3 && (
                  <Badge variant="outline" className="text-xs">
                    +{match.lecturer.research_areas.length - 3} more
                  </Badge>
                )}
              </div>
            </div>

            {/* Match Reasons */}
            <div className="mb-4">
              <h4 className="text-sm font-medium text-foreground mb-2">Why this is a good match:</h4>
              <ul className="space-y-1">
                {match.matchReasons.slice(0, 3).map((reason, idx) => (
                  <li key={idx} className="text-sm text-muted-foreground flex items-start">
                    <span className="w-1.5 h-1.5 bg-accent rounded-full mt-2 mr-2 flex-shrink-0"></span>
                    {reason}
                  </li>
                ))}
                {match.matchReasons.length > 3 && (
                  <li className="text-sm text-muted-foreground">
                    <span className="w-1.5 h-1.5 bg-accent rounded-full mt-2 mr-2 inline-block"></span>+
                    {match.matchReasons.length - 3} more reasons
                  </li>
                )}
              </ul>
            </div>

            {/* Quick Stats */}
            <div className="flex items-center space-x-4 mb-4 text-sm text-muted-foreground">
              <div className="flex items-center space-x-1">
                <BookOpen className="w-4 h-4" />
                <span>{match.lecturer.courses_taught.length} courses</span>
              </div>
              <div className="flex items-center space-x-1">
                <Users className="w-4 h-4" />
                <span>{match.lecturer.publications.length} publications</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between">
              <Button asChild variant="outline" size="sm" className="bg-transparent">
                <Link href={`/lecturers/${match.lecturer.id}`}>
                  View Profile
                  <ExternalLink className="w-3 h-3 ml-1" />
                </Link>
              </Button>
              {index === 0 && !showAll && (
                <Badge className="bg-accent/10 text-accent border-accent/20">Top Recommendation</Badge>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
