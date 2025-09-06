// app/admin/departments/page.tsx
import DepartmentsManagement from './departmentManagement';
import { getDepartments } from '../../../lib/actions/departments';

export default async function DepartmentsPage() {
  const departments = await getDepartments();
  return <DepartmentsManagement initialDepartments={departments} />;
}
