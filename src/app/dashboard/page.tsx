"use client"

import { useEffect, useState } from "react"
import { useAuth } from "@/lib/auth"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { RecommendedLecturers } from "@/components/recommended-lecturers"
import { GraduationCap, Users, BookOpen, MessageCircle, Star } from "lucide-react"
import Link from "next/link"

export default function DashboardPage() {
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
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-accent/10 rounded-full">
              <GraduationCap className="h-12 w-12 text-accent" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Welcome back, {user?.name}!</h1>
          <p className="text-muted-foreground">Your personalized dashboard for connecting with lecturers</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Recommended Lecturers Section */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-2">
                  <Star className="h-5 w-5 text-accent" />
                  <h2 className="text-2xl font-bold text-foreground">Recommended for You</h2>
                </div>
                <Button asChild variant="outline" size="sm" className="bg-transparent">
                  <Link href="/recommendations">View All</Link>
                </Button>
              </div>
              {user?.email && <RecommendedLecturers studentEmail={user.email} />}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Users className="h-5 w-5 text-accent" />
                  <span>Browse Lecturers</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Explore our faculty directory and find lecturers in your field of interest.
                </p>
                <Button asChild className="w-full">
                  <Link href="/lecturers">View All Lecturers</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BookOpen className="h-5 w-5 text-accent" />
                  <span>Departments</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Browse lecturers by department and discover specialized expertise.
                </p>
                <Button asChild variant="outline" className="w-full bg-transparent">
                  <Link href="/departments">View Departments</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <MessageCircle className="h-5 w-5 text-accent" />
                  <span>AI Assistant</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Chat with our AI to get personalized lecturer recommendations.
                </p>
                <Button asChild variant="outline" className="w-full bg-transparent">
                  <Link href="/chat">Start Chatting</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
