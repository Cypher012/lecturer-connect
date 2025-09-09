// app/admin/departments/page.tsx
import DepartmentsManagement from '../../../components/AdminDepartment/DepartmentManagement';
import { getDepartments } from '../../../lib/actions/departments';

export default async function DepartmentsPage() {
  const departments = await getDepartments();
  return <DepartmentsManagement initialDepartments={departments} />;
}
