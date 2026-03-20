import { useNavigate, useSearchParams } from "react-router";
import { useGetStudentsQuery } from "../student/studentApi.js";
import { base } from "../../app/mainApi.js";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table.jsx';
import { Avatar, AvatarImage } from "../../components/ui/avatar.jsx";
import { Button } from "../../components/ui/button.jsx";
import { EditIcon } from "lucide-react";
import DeleteStudent from "../addstudent/DeleteStudent.jsx";

export default function SearchPage() {
  const [searchParams] = useSearchParams();
  const nav = useNavigate();

  const { data, isLoading, error } = useGetStudentsQuery({
    search: searchParams.get('search')
  });

  const students = data?.students || [];

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>{error.data?.message || 'Something went wrong'}</p>;

  return (
    <div className='w-full mt-9'>
      {students.length === 0 ? (
        <p>No results found</p>
      ) : (
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
              {students.map(({ _id, name, age, email, courseEnrolled, image }, index) => (
                <TableRow key={_id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>
                    <div className='flex items-center gap-3'>
                      <Avatar>
                        <AvatarImage src={`${base}/${image}`} alt='image' />
                      </Avatar>
                      <div className='font-medium'>{name}</div>
                    </div>
                  </TableCell>
                  <TableCell>{email}</TableCell>
                  <TableCell>{age}</TableCell>
                  <TableCell>{courseEnrolled}</TableCell>
                  <TableCell className="flex gap-2">
                    <Button onClick={() => nav(`/student-edit/${_id}`)} variant="ghost">
                      <EditIcon />
                    </Button>
                    <DeleteStudent id={_id} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}