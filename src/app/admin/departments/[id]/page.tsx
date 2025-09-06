import EditDepartment from "./edit-department"
import { getDepartment } from "../../../../lib/actions/departments"


const Page = async({params}: {params : {id: string}}) => {
  const { id } = params
  const department = await getDepartment(id)
  return (
    <>
      <EditDepartment department={department}/>
    </>
  )
}

export default Page