import LecturerPage from './lecturerPage';
import { getLecturers } from '~/src/lib/actions/lecturers';

export default async function Page() {
  const lecturers = await getLecturers()
  return (
    <LecturerPage initialLecturers={lecturers}/>
  )
}
