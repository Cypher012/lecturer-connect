import DepartmentPage from "./department"
import { getLecturersByDepartments } from "~/src/lib/actions/lecturers"


const Page = async({params}: {params: Promise<{id : string}>}) => {
  const {id} = await params
  const lecturers = await getLecturersByDepartments(id)
  return (
    <DepartmentPage id={id} lecturers={lecturers}/>
  )
}

export default Page