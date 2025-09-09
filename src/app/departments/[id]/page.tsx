import DepartmentPage from "./department"
import {getLecturers} from "~/src/lib/actions/lecturers"


const Page = async({params}: {params: Promise<{id : string}>}) => {
  const {id} = await params
  const lecturers = await getLecturers()
  return (
    <DepartmentPage id={id} lecturers={lecturers}/>
  )
}

export default Page