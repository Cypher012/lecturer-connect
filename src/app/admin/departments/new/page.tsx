
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Save, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { FormSubmit } from "@/components/form-submit"
import { createDepartment } from "../../../../lib/actions/departments"

export default function NewDepartment() {

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center gap-4 mb-8">
        <Button asChild variant="outline" size="sm">
          <Link href="/admin/departments">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Departments
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Add New Department</h1>
          <p className="text-slate-600">Create a new academic department</p>
        </div>
      </div>

      <form action={createDepartment} className="space-y-6">
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
          <CardHeader>
            <CardTitle>Department Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="name">Department Name *</Label>
              <Input
                id="name"
                name="name"
                placeholder="e.g., Computer Science and Engineering"
                required
              />
            </div>
            <div>
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                name="description"
                placeholder="Brief description of the department's focus and activities"
                rows={4}
                required
              />
            </div>
          </CardContent>
        </Card>

        <div className="flex gap-4">
          <FormSubmit className="flex-1">
            <Save className="h-4 w-4 mr-2" />
            Create Department
          </FormSubmit>
          <Button asChild variant="outline" className="flex-1 bg-transparent">
            <Link href="/admin/departments">Cancel</Link>
          </Button>
        </div>
      </form>
    </div>
  )
}
