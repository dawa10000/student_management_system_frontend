import React, { useEffect } from 'react';
import { useGetStudentsQuery } from '../student/studentApi.js';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table.jsx';
import { Avatar, AvatarFallback, AvatarImage } from '../../components/ui/avatar.jsx';
import { Button } from '../../components/ui/button.jsx';
import { base } from '../../app/mainApi.js';
import DeleteStudent from './DeleteStudent.jsx';
import { EditIcon } from 'lucide-react';
import { useNavigate, useSearchParams } from 'react-router';

export default function StudentList() {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get('page')) || 1;
  const nav = useNavigate();

  const { isLoading, error, data } = useGetStudentsQuery({ page });


  const students = data?.students || [];
  const totalPages = data?.totalPages || 1;
  const totalStudents = data?.students?.length || 0;


  useEffect(() => {
    window.scrollTo(0, 0);
  }, [page]);


  useEffect(() => {
    if (page > totalPages && totalPages > 0) {
      setSearchParams({ page: totalPages });
    }
  }, [page, totalPages, setSearchParams]);

  if (isLoading) return <p className='mt-2'>Loading...</p>;
  if (error) return <p>{error.data?.message || 'Something went wrong'}</p>;


  const isDatabaseEmpty = totalStudents === 0 && totalPages === 1;

  return (
    <div className='w-full mt-9'>
      <div className='[&>div]:rounded-sm [&>div]:border'>
        <Table>
          <TableHeader>
            <TableRow className='hover:bg-transparent'>
              <TableHead>ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Age</TableHead>
              <TableHead>Course Enrolled</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isDatabaseEmpty ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center">
                  No students found in the database
                </TableCell>
              </TableRow>
            ) : students.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center">
                  No students on this page
                </TableCell>
              </TableRow>
            ) : (
              students.map(({ _id, name, age, email, courseEnrolled, image }, index) => (
                <TableRow key={_id}>
                  <TableCell>{(page - 1) * 10 + index + 1}</TableCell>
                  <TableCell>
                    <div className='flex items-center gap-3'>
                      <Avatar className="w-14 h-14 rounded-full overflow-hidden">
                        <AvatarImage className="object-cover w-full h-full" src={`${base}/${image}`} alt='AV' />
                        <AvatarFallback className='text-xs'>AV</AvatarFallback>
                      </Avatar>
                      <div className='font-medium'>{name}</div>
                    </div>
                  </TableCell>
                  <TableCell>{email}</TableCell>
                  <TableCell>{age}</TableCell>
                  <TableCell>{courseEnrolled}</TableCell>
                  <TableCell className="flex mt-2 gap-2">
                    <Button onClick={() => nav(`/student-edit/${_id}`)} variant="ghost">
                      <EditIcon />
                    </Button>
                    <DeleteStudent id={_id} />
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex gap-5 my-4 items-center">
        <Button
          onClick={() => setSearchParams({ page: page - 1 })}
          disabled={page === 1}
        >
          Prev
        </Button>
        <span>{page}</span>
        <Button
          onClick={() => setSearchParams({ page: page + 1 })}
          disabled={page >= totalPages}
        >
          Next
        </Button>
      </div>
    </div>
  );
}