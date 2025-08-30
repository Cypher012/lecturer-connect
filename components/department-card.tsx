import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Users, ArrowRight, BookOpen, Award, TrendingUp } from "lucide-react"
import type { Department } from "@/lib/mock-data"

interface DepartmentCardProps {
  department: Department
}

export function DepartmentCard({ department }: DepartmentCardProps) {
  return (
    <Card className="hover-lift card-gradient border-0 overflow-hidden relative group h-full">
      <div className="absolute inset-0 card-texture opacity-20" />
      <div className="absolute inset-0 shimmer opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-accent to-secondary" />

      <CardHeader className="relative z-10">
        <div className="flex items-start justify-between mb-2">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
            <BookOpen className="h-6 w-6 text-white" />
          </div>
          <div className="flex items-center space-x-1 text-xs text-accent bg-accent/10 px-2 py-1 rounded-full">
            <TrendingUp className="h-3 w-3" />
            <span>Active</span>
          </div>
        </div>
        <CardTitle className="text-xl font-bold text-balance group-hover:text-primary transition-colors duration-300">
          {department.name}
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4 flex flex-col h-full relative z-10">
        <p className="text-muted-foreground text-sm flex-1 leading-relaxed">{department.description}</p>

        <div className="grid grid-cols-2 gap-4 py-4 border-t border-border/50">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-1 text-2xl font-bold text-primary mb-1">
              <Users className="h-5 w-5" />
              <span>{department.lecturer_count}</span>
            </div>
            <div className="text-xs text-muted-foreground">Lecturers</div>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center space-x-1 text-2xl font-bold text-accent mb-1">
              <Award className="h-5 w-5" />
              <span>{Math.floor(Math.random() * 50) + 20}</span>
            </div>
            <div className="text-xs text-muted-foreground">Research Projects</div>
          </div>
        </div>

        <Link href={`/departments/${department.id}`} className="block">
          <Button
            size="sm"
            className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 shadow-lg hover:shadow-xl transition-all duration-300 group/btn"
          >
            <span className="flex items-center justify-center">
              Explore Department
              <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
            </span>
          </Button>
        </Link>
      </CardContent>
    </Card>
  )
}
