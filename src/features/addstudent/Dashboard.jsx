
import React, { useEffect } from 'react'
import { Button } from '../../components/ui/button.jsx'
import StudentList from './StudentList.jsx'
import { useNavigate } from 'react-router'
import { useSelector } from 'react-redux';

export default function Dashboard() {
  const nav = useNavigate();
  const { user } = useSelector((state) => state.userSlice);


  useEffect(() => {
    if (!user) nav("/login");
  }, [user, nav]);


  return (
    <div>

    </div>
  )
}
