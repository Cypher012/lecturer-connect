import DepartmentsClient from "~/src/components/Department/DepartmentPage";
import { getLecturers } from '~/src/lib/actions/lecturers';

export default async function DepartmentsPage() {
  const lecturers = await getLecturers()


  return <DepartmentsClient lecturers={lecturers}/>;
}
