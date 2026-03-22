import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router";
import { Formik } from "formik";
import * as Yup from "yup";
import { Spinner } from "../../components/ui/spinner.jsx";
import { toast } from "sonner";
import { useSelector } from "react-redux";
import { useGetUserQuery, useUpdateUserMutation } from "./userApi.js";
import { base } from "../../app/mainApi.js";

const registerSchema = Yup.object({
  username: Yup.string().min(4).max(50).required("Username is required"),
  email: Yup.string().email("Invalid email format").required("Email is required"),
  image: Yup.mixed().test("fileType", "Unsupported File Format", (value) => {
    if (value) {
      return ["image/jpeg", "image/png", "image/gif", "image/webp", "image/jpg"].includes(
        value.type
      );
    }
    return true;
  }),
});

export default function UserProfile() {
  const nav = useNavigate();
  const { user } = useSelector((state) => state.userSlice);


  useEffect(() => {
    if (!user) nav("/login");
  }, [user, nav]);


  const { isLoading, data, error } = useGetUserQuery(user?.token, {
    skip: !user,
  });

  const [updateProfile, { isLoading: isLoad }] = useUpdateUserMutation();

  if (!user) return null;
  if (isLoading) return <Spinner />;
  if (error) return <p className="text-red-500">{error.data?.message}</p>;


  return (
    <div className="flex justify-center items-center p-9">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Update your account</CardTitle>
          <CardDescription>Enter your details below to update your account</CardDescription>
        </CardHeader>
        <CardContent>
          <Formik
            enableReinitialize
            initialValues={{
              username: data.username,
              email: data.email,
              image: "",
              imagePreview: data.image,
            }}
            validationSchema={registerSchema}
            onSubmit={async (val) => {
              const formData = new FormData();
              formData.append("username", val.username);
              formData.append("email", val.email);
              if (val.image) formData.append("image", val.image);

              try {
                await updateProfile({ body: formData, token: user.token }).unwrap();
                toast.success("Profile Updated Successfully");

                nav(-1);
              } catch (err) {
                toast.error(err?.data?.message || "Update failed");
              }
            }}
          >
            {({ handleChange, handleSubmit, values, touched, errors, setFieldValue }) => (
              <form onSubmit={handleSubmit}>
                <div className="flex flex-col gap-6">
                  <div className="grid gap-2">
                    <Label htmlFor="username">Username</Label>
                    <Input
                      id="username"
                      name="username"
                      type="text"
                      placeholder="Enter your username"
                      value={values.username}
                      onChange={handleChange}
                    />
                    {touched.username && errors.username && (
                      <p className="text-red-500 text-sm">{errors.username}</p>
                    )}
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="m@example.com"
                      value={values.email}
                      onChange={handleChange}
                    />
                    {touched.email && errors.email && (
                      <p className="text-red-500 text-sm">{errors.email}</p>
                    )}
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="image">Upload an image</Label>
                    <Input
                      id="image"
                      name="image"
                      type="file"
                      onChange={(e) => {
                        const file = e.target.files[0];
                        if (!file) return;
                        setFieldValue("imagePreview", URL.createObjectURL(file));
                        setFieldValue("image", file);
                      }}
                    />
                    {touched.image && errors.image && (
                      <p className="text-red-500 text-sm">{errors.image}</p>
                    )}
                    {values.imagePreview && (
                      <img
                        src={values.image ? values.imagePreview : `${base}/${values.imagePreview}`}
                        alt="preview"
                        className="mt-2 w-32 h-32 object-cover rounded"
                      />
                    )}
                  </div>

                  <Button type="submit" disabled={isLoad} className="w-full mt-6">
                    {isLoad ? <Spinner /> : "Update"}
                  </Button>
                </div>
              </form>
            )}
          </Formik>
        </CardContent>
      </Card>
    </div>
  );
}