"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Users, GraduationCap, Building2, BarChart3, Settings, Plus } from "lucide-react"
import Link from "next/link"
import { adminDatabase } from "@/lib/admin-database"

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalLecturers: 0,
    totalDepartments: 0,
    totalStudents: 0,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadStats = async () => {
      try {
        const statistics = await adminDatabase.getStatistics()
        setStats(statistics)
      } catch (error) {
        console.error("Error loading statistics:", error)
      } finally {
        setLoading(false)
      }
    }

    loadStats()
  }, [])

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">Loading dashboard...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Admin Dashboard</h1>
          <p className="text-slate-600">Manage lecturers, departments, and students</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">Total Lecturers</CardTitle>
              <GraduationCap className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-900">{stats.totalLecturers}</div>
              <p className="text-xs text-slate-500">Active faculty members</p>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">Departments</CardTitle>
              <Building2 className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-900">{stats.totalDepartments}</div>
              <p className="text-xs text-slate-500">Academic departments</p>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">Students</CardTitle>
              <Users className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-900">{stats.totalStudents}</div>
              <p className="text-xs text-slate-500">Registered students</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Lecturer Management */}
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <GraduationCap className="h-5 w-5 text-blue-600" />
                Lecturer Management
              </CardTitle>
              <CardDescription>Add, edit, and manage faculty members</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Button asChild className="flex-1">
                  <Link href="/admin/lecturers">
                    <BarChart3 className="h-4 w-4 mr-2" />
                    View All Lecturers
                  </Link>
                </Button>
                <Button asChild variant="outline">
                  <Link href="/admin/lecturers/new">
                    <Plus className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
              <p className="text-sm text-slate-500">Manage lecturer profiles, research areas, and course assignments</p>
            </CardContent>
          </Card>

          {/* Department Management */}
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="h-5 w-5 text-green-600" />
                Department Management
              </CardTitle>
              <CardDescription>Organize and manage academic departments</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Button asChild className="flex-1">
                  <Link href="/admin/departments">
                    <BarChart3 className="h-4 w-4 mr-2" />
                    View All Departments
                  </Link>
                </Button>
                <Button asChild variant="outline">
                  <Link href="/admin/departments/new">
                    <Plus className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
              <p className="text-sm text-slate-500">Create and modify department information and structure</p>
            </CardContent>
          </Card>

          {/* Student Management */}
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-orange-600" />
                Student Management
              </CardTitle>
              <CardDescription>View and manage student profiles</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Button asChild className="flex-1">
                  <Link href="/admin/students">
                    <BarChart3 className="h-4 w-4 mr-2" />
                    View All Students
                  </Link>
                </Button>
                <Button asChild variant="outline">
                  <Link href="/admin/students/new">
                    <Plus className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
              <p className="text-sm text-slate-500">Access student profiles and onboarding information</p>
            </CardContent>
          </Card>

          {/* System Settings */}
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5 text-slate-600" />
                System Settings
              </CardTitle>
              <CardDescription>Configure system preferences and settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button className="w-full bg-transparent" variant="outline">
                <Settings className="h-4 w-4 mr-2" />
                System Configuration
              </Button>
              <p className="text-sm text-slate-500">Manage system-wide settings and configurations</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
