import { createBrowserRouter, RouterProvider } from "react-router";
import RootLayout from "./components/RootLayout.jsx";
import Register from "./features/auth/Register.jsx";
import Login from "./features/auth/Login.jsx";
import UserProfile from "./features/user/UserProfile.jsx";
import Dashboard from "./features/addstudent/Dashboard.jsx";
import StudentEditForm from "./features/addstudent/StudentEditForm.jsx";
import StudentAddForm from "./features/addstudent/StudentAddForm.jsx";
import Home from "./features/home/Home.jsx";
import SearchPage from "./features/search/SearchPage.jsx";
import IsLogin from "./components/IsLogin.jsx";




export default function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      children: [
        {
          index: true,
          element: <Home />
        },

        {
          element: <IsLogin />,
          children: [
            {
              path: "login",
              element: <Login />
            },
            {
              path: "register",
              element: <Register />
            }
          ]
        },

        {
          path: "dashboard",
          element: <Dashboard />
        },
        {
          path: "student-add",
          element: <StudentAddForm />
        },
        {
          path: "student-edit/:id",
          element: <StudentEditForm />
        },

        {
          path: "profile",
          element: <UserProfile />
        },

        {
          path: 'search',
          element: <SearchPage />
        }

      ]
    }
  ]);

  return <RouterProvider router={router} />
}
