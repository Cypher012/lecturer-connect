"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { mockDatabase } from "./database"

interface User {
  id: string
  email: string
  name: string
  studentId: string
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<{ needsOnboarding: boolean }>
  logout: () => void
  isAuthenticated: boolean
  checkOnboardingStatus: () => Promise<boolean>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check for existing session on mount
    const checkAuth = () => {
      const savedUser = localStorage.getItem("lecturer-connect-user")
      if (savedUser) {
        try {
          setUser(JSON.parse(savedUser))
        } catch (error) {
          localStorage.removeItem("lecturer-connect-user")
        }
      }
      setIsLoading(false)
    }

    checkAuth()
  }, [])

  const checkOnboardingStatus = async (): Promise<boolean> => {
    if (!user?.email) return false

    try {
      const profile = await mockDatabase.getStudentProfile(user.email)
      return !!profile
    } catch (error) {
      console.error("Error checking onboarding status:", error)
      return false
    }
  }

  const login = async (email: string, password: string): Promise<{ needsOnboarding: boolean }> => {
    setIsLoading(true)

    // Simulate API call - replace with BetterAuth integration
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Mock user data
    const mockUser: User = {
      id: "1",
      email,
      name: "Student User",
      studentId: "CS2024001",
    }

    setUser(mockUser)
    localStorage.setItem("lecturer-connect-user", JSON.stringify(mockUser))

    // Check if user has completed onboarding
    const profile = await mockDatabase.getStudentProfile(email)
    const needsOnboarding = !profile

    setIsLoading(false)
    return { needsOnboarding }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("lecturer-connect-user")
  }

  const value = {
    user,
    isLoading,
    login,
    logout,
    isAuthenticated: !!user,
    checkOnboardingStatus,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
