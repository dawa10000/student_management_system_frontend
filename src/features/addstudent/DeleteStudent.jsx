import { TrashIcon } from 'lucide-react'
import { Button } from '../../components/ui/button.jsx'
import { useSelector } from 'react-redux'
import { useRemoveStudentMutation } from '../student/studentApi.js';
import { Spinner } from '../../components/ui/spinner.jsx';
import { toast } from 'sonner';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"



export default function DeleteStudent({ id }) {
  const { user } = useSelector((state) => state.userSlice);
  const [removeStudent, { isLoading }] = useRemoveStudentMutation();
  const handleRemove = async () => {
    try {
      await removeStudent({ id, token: user.token }).unwrap();
      toast.success("Student deleted successfully");
    } catch (err) {
      toast.error(err.data.message);
    }
  }

  return (
    <div>

      <AlertDialog>
        <AlertDialogTrigger asChild>

          <Button disabled={isLoading} variant="ghost">{isLoading ? <Spinner /> : <TrashIcon />}
          </Button>

        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              account from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => handleRemove()}>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>




    </div>
  )
}
