import LecturerProfile from "./lecturerProfile"
import LecturerProfile2 from "./lecturerProfile2"

import {getLecturer} from "~/src/lib/actions/lecturers"

const Page = async({params}: {params: Promise<{id : string}>}) => {
  const {id} = await params
  const lecturer = await getLecturer(id)
  return (
    <LecturerProfile2 lecturer={lecturer}/>
  )
}

export default Page