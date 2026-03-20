import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useNavigate, useParams } from "react-router";
import { Formik } from "formik";
import * as Yup from "yup";
import { Spinner } from "../../components/ui/spinner.jsx";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useGetStudentQuery, useUpdateStudentMutation } from "../student/studentApi.js";
import { useSelector } from "react-redux";
import { base } from "../../app/mainApi.js";

const studentSchema = Yup.object({
  name: Yup.string().min(4).max(50).required('Student name is required'),
  age: Yup.number().required('Age is required'),
  email: Yup.string().email('Invalid email format').required('Email is required'),
  courseEnrolled: Yup.string().required('Course is required'),
  image: Yup.mixed().test(
    'fileType',
    'Unsupported File Format',
    (value) => {
      if (value) {
        return ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/jpg'].includes(value.type)
      }
      return true
    }
  )
})

export default function StudentEditForm() {
  const { id } = useParams();
  const { user } = useSelector((state) => state.userSlice);
  const { data, error, isLoading: isLoad } = useGetStudentQuery(id);

  const [updateStudent, { isLoading }] = useUpdateStudentMutation();
  const nav = useNavigate();

  if (isLoad) {
    return <Spinner />
  }
  if (error) return <p>{error.data?.message}</p>
  return (
    <div className="flex justify-center items-center p-9">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Student Edit Form</CardTitle>
          <CardDescription>
            Update student details
          </CardDescription>

        </CardHeader>
        <CardContent>

          <Formik

            initialValues={{
              name: data?.name,
              email: data?.email,
              age: data?.age,
              courseEnrolled: data?.courseEnrolled,
              image: '',
              imagePreview: data?.image
            }}

            onSubmit={async (val) => {
              const formData = new FormData();
              formData.append('name', val.name);
              formData.append('email', val.email);
              formData.append('age', val.age);
              formData.append('courseEnrolled', val.courseEnrolled);
              formData.append('image', val.image);



              try {
                await updateStudent({
                  body: formData,
                  token: user.token,
                  id: id
                }).unwrap();
                toast.success("Student updated successfully");
                nav(-1);
              } catch (err) {
                toast.error(err.data.message || err.data)
              }
            }}
            validationSchema={studentSchema}
          >

            {({ handleChange, handleSubmit, values, touched, errors, setFieldValue }) => (
              <form onSubmit={handleSubmit}>

                <div className="flex flex-col gap-6">
                  <div className="grid gap-2">
                    <Label htmlFor="name">Student name</Label>
                    <Input
                      name="name"
                      onChange={handleChange}
                      value={values.name}
                      id="name"
                      type="text"
                      placeholder="Enter Student's name"
                    />
                    {touched.name && errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      onChange={handleChange}
                      value={values.email}
                      name="email"
                      placeholder="m@example.com"
                    />
                    {touched.email && errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="age">Age</Label>
                    <Input
                      id="age"
                      type="number"
                      onChange={handleChange}
                      value={values.age}
                      name="age"
                      placeholder="0"
                    />
                    {touched.age && errors.age && <p className="text-red-500 text-sm">{errors.age}</p>}
                  </div>

                  <div>
                    <Select
                      value={values.courseEnrolled}
                      onValueChange={(e) => setFieldValue('courseEnrolled', e)}>
                      <SelectTrigger className="w-full max-w-48">
                        <SelectValue placeholder="Select a course" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Course</SelectLabel>
                          <SelectItem value="Data Science">Data Science</SelectItem>
                          <SelectItem value="Data Analysis">Data Analysis</SelectItem>
                          <SelectItem value="Power BI">Power BI</SelectItem>
                          <SelectItem value="Mern Stack">Mern Stack</SelectItem>
                          <SelectItem value="Full Stack With JS">Full Stack With JS</SelectItem>
                          <SelectItem value="Python With Django">Python With Django</SelectItem>
                          <SelectItem value="Flutter">Flutter</SelectItem>
                          <SelectItem value="WordPress">WordPress</SelectItem>
                          <SelectItem value="UI/UX">UI/UX</SelectItem>
                          <SelectItem value="Graphic Design">Graphic Design</SelectItem>
                          <SelectItem value="Cyber Security">Cyber Security</SelectItem>
                          <SelectItem value="Digital Marketing">Digital Marketing</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    {touched.courseEnrolled && errors.courseEnrolled && <p className="text-red-500">{errors.courseEnrolled}</p>}

                  </div>


                  <div className="grid gap-2">
                    <div className="flex items-center">
                      <Label htmlFor="image">Upload your profile picture</Label>
                    </div>
                    <Input
                      id="image"
                      name="image"
                      type="file"
                      onChange={(e) => {
                        const file = e.target.files[0];
                        setFieldValue('imagePreview', URL.createObjectURL(file));
                        setFieldValue('image', file);

                      }}


                    />
                    {touched.image && errors.image && <p className="text-red-500 text-sm">{errors.image}</p>}
                    {values.imagePreview && !errors.image && <img src={values.image ? values.imagePreview : `${base}/${values.imagePreview}`} alt="" />}

                  </div>
                  <Button
                    disabled={isLoading}
                    type="submit" className="w-full mt-6">
                    {isLoading ? <Spinner /> : 'Update'}
                  </Button>

                </div>
              </form>
            )}
          </Formik>


        </CardContent>

      </Card>
    </div>
  )
}
