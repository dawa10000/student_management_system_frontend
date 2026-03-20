import { NavLink } from "react-router";

import { Button } from "./ui/button.jsx";
import { useSelector } from "react-redux";
import DropDownMenu from "./DropDownMenu.jsx";



export default function Header() {
  const { user } = useSelector((state) => state.userSlice);
  return (
    <div className="flex items-center justify-between bg-blue-600 px-15 py-6">
      <div>
        <h2>Student Management System</h2>
      </div >

      <div>
        {user ? <DropDownMenu user={user} /> : <div className="flex gap-3">
          <NavLink to="/login"><Button>Login</Button></NavLink>
          <NavLink to="/register"><Button>Sign Up</Button></NavLink>
        </div>
        }
      </div>
    </div>

  )
}
