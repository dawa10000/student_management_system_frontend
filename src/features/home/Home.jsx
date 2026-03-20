
import React, { useEffect } from 'react'
import { Button } from '../../components/ui/button.jsx'

import { useNavigate } from 'react-router'
import { useSelector } from 'react-redux';
import StudentList from '../addstudent/StudentList.jsx';

export default function Home() {
  const nav = useNavigate();
  const { user } = useSelector((state) => state.userSlice);


  useEffect(() => {
    if (!user) nav("/login");
  }, [user, nav]);


  return (
    <div>
      <Button onClick={() => nav('/student-add')}>Add Student</Button>

      <StudentList />
    </div>
  )
}
