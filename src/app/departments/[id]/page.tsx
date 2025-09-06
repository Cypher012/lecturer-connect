import DepartmentPage from "./department"


const Page = async({params}: {params: Promise<{id : string}>}) => {
  const {id} = await params
  return (
    <DepartmentPage params={id}/>
  )
}

export default Page