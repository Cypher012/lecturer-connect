import {getDepartments} from "@/lib/actions/departments"
import HomePage from "./app"

const Page = async() => {
  const departments =  await getDepartments()

  return (
    <HomePage departments = {departments} />
  )
}

export default Page