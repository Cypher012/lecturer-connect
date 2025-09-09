"use client";

import { useState, useTransition } from "react";
import { Course } from "~/generated/prisma"; 
// import { deleteCourse } from "../../../lib/actions/courses";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, Plus, Edit, Trash2, Eye, Users } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function CoursesManagement({ initialCourses }: { initialCourses: Course[] }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [courses, setCourses] = useState(initialCourses);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (!query.trim()) return setCourses(initialCourses);

    const filtered = (initialCourses ?? []).filter(
      (course) =>
        course?.course_code.toLowerCase().includes(query.toLowerCase()) ||
        course?.course_title.toLowerCase().includes(query.toLowerCase())
    );
    setCourses(filtered);
  };

  const handleDelete = (id: string) => {
    setCourses((prev) => prev.filter((c) => c?.id !== id));
    startTransition(async () => {
      try {
        // await deleteCourse(id);
      } finally {
        router.refresh();
      }
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Course Management</h1>
          <p className="text-slate-600">Manage academic courses and their information</p>
        </div>
        <Button asChild>
          <Link href="/admin/courses/new">
            <Plus className="h-4 w-4 mr-2" />
            Add New Course
          </Link>
        </Button>
      </div>

      {/* Search */}
      <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg mb-6">
        <CardHeader><CardTitle>Search & Filter</CardTitle></CardHeader>
        <CardContent>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
            <Input
              placeholder="Search by course code or title..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Table */}
      <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
        <CardHeader><CardTitle>Courses ({courses.length})</CardTitle></CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Course Code</TableHead>
                  <TableHead>Course Title</TableHead>
                  <TableHead>Lecturers</TableHead>
                  <TableHead>Departments</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {(courses ?? []).map((course) => (
                  <TableRow key={course?.id}>
                    <TableCell>{course?.course_code}</TableCell>
                    <TableCell>{course?.course_title}</TableCell>
                    {/* <TableCell>{course?.lecturers?.length || 0}</TableCell> */}
                    {/* <TableCell>{course?.departments?.length || 0}</TableCell> */}
                    <TableCell>
                      <div className="flex gap-2">
                        <Button asChild size="sm" variant="outline">
                          <Link href={`/courses/${course?.id}`}><Eye className="h-4 w-4" /></Link>
                        </Button>
                        <Button asChild size="sm" variant="outline">
                          <Link href={`/admin/courses/${course?.id}`}><Edit className="h-4 w-4" /></Link>
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          type="button"
                          onClick={() => handleDelete(course.id)}
                          disabled={isPending}
                          className="text-red-600 hover:text-red-700 hover:bg-red-50 disabled:opacity-50"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
