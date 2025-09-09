'use client';

import { useState, useTransition } from "react";
import { DepartmentWithRelations } from "../../lib/actions/departments"; 
import {deleteDepartment } from "../../lib/actions/departments";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, Plus, Edit, Trash2, Eye, Users } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";


export default function DepartmentsManagement({ initialDepartments }: { initialDepartments: DepartmentWithRelations[] }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [departments, setDepartments] = useState(initialDepartments);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (!query.trim()) return setDepartments(initialDepartments);

    const filtered = (initialDepartments ?? []).filter(
      (dept) =>
        dept?.name.toLowerCase().includes(query.toLowerCase()) ||
        dept?.description.toLowerCase().includes(query.toLowerCase())
    );
    setDepartments(filtered);
  };

  const handleDelete = (id: string) => {
    // Optimistically remove from UI
    setDepartments((prev) => prev.filter((d) => d?.id !== id));
    // Commit on server and refresh data
    startTransition(async () => {
      try {
        await deleteDepartment(id);
      } finally {
        router.refresh();
      }
    });
  };


  function truncateAtWord(str: string, maxLength:number) {
    if (str.length <= maxLength) return str; // no need to truncate
    const truncated = str.slice(0, maxLength);
    const lastSpace = truncated.lastIndexOf(' '); // find last space
    return truncated.slice(0, lastSpace) + '...';
  }
  

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Department Management</h1>
          <p className="text-slate-600">Manage academic departments and their information</p>
        </div>
        <Button asChild>
          <Link href="/admin/departments/new">
            <Plus className="h-4 w-4 mr-2" />
            Add New Department
          </Link>
        </Button>
      </div>

      {/* Search and Filter */}
      <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg mb-6">
        <CardHeader>
          <CardTitle>Search & Filter</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
            <Input
              placeholder="Search by name or description..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Departments Table */}
      <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
        <CardHeader><CardTitle>Departments ({departments.length})</CardTitle></CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Lecturer Count</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {(departments ?? []).map((department) => (
                  <TableRow key={department?.id}>
                    <TableCell>{department?.name}</TableCell>
                    <TableCell>{truncateAtWord(department?.description, 60)}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-slate-400" />
                        {department?.lecturers.length || 0}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button asChild size="sm" variant="outline">
                          <Link href={`/departments/${department?.id}`}><Eye className="h-4 w-4" /></Link>
                        </Button>
                        <Button asChild size="sm" variant="outline">
                          <Link href={`/admin/departments/${department?.id}`}><Edit className="h-4 w-4" /></Link>
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          type="button"
                          onClick={() => handleDelete(department.id)}
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
