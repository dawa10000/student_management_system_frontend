

import { Button } from '../../components/ui/button.jsx'
import { useNavigate } from 'react-router'
import StudentList from '../addstudent/StudentList.jsx';
import SearchForm from '../search/SearchForm.jsx';

export default function Home() {
  const nav = useNavigate();



  return (

    <div>
      <div className='flex gap-5 p-3'>

        <Button onClick={() => nav('/student-add')}>Add Student</Button>
        <SearchForm />
      </div>


      <StudentList />
    </div>
  )
}
