"use client"

import { useEffect, useState } from "react"
import { useAuth } from "@/lib/auth"
import { useRouter } from "next/navigation"
import { RecommendedLecturers } from "@/components/recommended-lecturers"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Star, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function RecommendationsPage() {
  const { user, isAuthenticated, checkOnboardingStatus } = useAuth()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const checkAccess = async () => {
      if (!isAuthenticated) {
        router.push("/login")
        return
      }

      const hasCompletedOnboarding = await checkOnboardingStatus()
      if (!hasCompletedOnboarding) {
        router.push("/onboarding")
        return
      }

      setIsLoading(false)
    }

    checkAccess()
  }, [isAuthenticated, checkOnboardingStatus, router])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Button asChild variant="ghost" className="mb-4">
            <Link href="/dashboard">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Link>
          </Button>

          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 bg-accent/10 rounded-lg">
              <Star className="h-6 w-6 text-accent" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">Your Lecturer Recommendations</h1>
              <p className="text-muted-foreground">Personalized suggestions based on your profile and interests</p>
            </div>
          </div>
        </div>

        {/* Info Card */}
        <Card className="mb-8 bg-accent/5 border-accent/20">
          <CardContent className="p-6">
            <div className="flex items-start space-x-3">
              <Star className="h-5 w-5 text-accent mt-0.5" />
              <div>
                <h3 className="font-semibold text-foreground mb-2">How we match you with lecturers</h3>
                <p className="text-sm text-muted-foreground">
                  Our algorithm considers your research interests, skills, career goals, and learning preferences to
                  find lecturers who align with your academic journey. Higher match scores indicate stronger alignment.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recommendations */}
        {user?.email && <RecommendedLecturers studentEmail={user.email} showAll={true} />}
      </div>
    </div>
  )
}
