"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Menu, X, GraduationCap, User, LogOut } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useDepartmentsStore } from "~/src/hooks/use-department"



export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const departments = useDepartmentsStore((state) => state.departments)
  const fetchDepartments = useDepartmentsStore((state) => state.fetchDepartments)
  
  useEffect(() => {
    fetchDepartments()
  }, [fetchDepartments])


  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      window.location.href = `/lecturers?search=${encodeURIComponent(searchQuery)}`
    }
  }

  return (
    <header className="bg-primary text-primary-foreground shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <GraduationCap className="h-6 w-6" />
            <span className="text-xl font-bold">Lecturer Connect</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            <Link href="/" className="hover:text-accent transition-colors">
              Home
            </Link>

            <DropdownMenu>
              <DropdownMenuTrigger className="hover:text-accent transition-colors">Departments</DropdownMenuTrigger>
              <DropdownMenuContent>
                {departments.map((dept) => (
                  <DropdownMenuItem key={dept.id} asChild>
                    <Link href={`/departments/${dept.id}`}>{dept.name}</Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <Link href="/lecturers" className="hover:text-accent transition-colors">
              Lecturers
            </Link>

            <Link href="/chat" className="hover:text-accent transition-colors">
              Chat
            </Link>

            {/* {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="flex items-center space-x-2">
                    <User className="h-4 w-4" />
                    <span>{user?.name || "Student"}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem disabled>
                    <div className="flex flex-col">
                      <span className="font-medium">{user?.name}</span>
                      <span className="text-xs text-muted-foreground">{user?.email}</span>
                    </div>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logout}>
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link href="/login" className="hover:text-accent transition-colors">
                Login
              </Link>
            )} */}
          </nav>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="hidden lg:flex items-center space-x-2">
            <div className="relative">
              <Input
                type="text"
                placeholder="Search lecturers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-64 bg-white text-foreground"
              />
              <Button type="submit" size="sm" className="absolute right-1 top-1 h-7 w-7 bg-accent hover:bg-accent/90">
                <Search className="h-4 w-4" />
              </Button>
            </div>
          </form>

          {/* Mobile Menu Button */}
          <Button variant="ghost" size="sm" className="lg:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 border-t border-primary-foreground/20">
            <nav className="flex flex-col space-y-4">
              <Link  href="/" onClick={() => setIsMenuOpen(false)} className="hover:text-accent transition-colors">
                Home
              </Link>
              <Link  href="/lecturers" onClick={() => setIsMenuOpen(false)} className="hover:text-accent transition-colors">
                Lecturers
              </Link>
              <Link  href="/departments" onClick={() => setIsMenuOpen(false)} className="hover:text-accent transition-colors">
                Departments
              </Link>
              <Link  href="/chat" onClick={() => setIsMenuOpen(false)} className="hover:text-accent transition-colors">
                Chat
              </Link>

           

              {/* Mobile Search */}
              <form onSubmit={handleSearch} className="flex items-center space-x-2 pt-2">
                <Input
                  type="text"
                  placeholder="Search lecturers..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 bg-white text-foreground"
                />
                <Button type="submit" size="sm" className="bg-accent hover:bg-accent/90">
                  <Search className="h-4 w-4" />
                </Button>
              </form>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
