import { NavLink } from "react-router";

import { Button } from "./ui/button.jsx";
import { useSelector } from "react-redux";
import DropDownMenu from "./DropDownMenu.jsx";



export default function Header() {
  const { user } = useSelector((state) => state.userSlice);
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between bg-blue-600 px-4 sm:px-8 py-4 gap-3">

      {/* Title */}
      <div className="text-center sm:text-left">
        <h2 className="text-white font-semibold text-lg sm:text-xl">
          Student Management System
        </h2>
      </div>

      {/* Right Section */}
      <div className="flex justify-center sm:justify-end">
        {user ? (
          <DropDownMenu user={user} />
        ) : (
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 w-full sm:w-auto">
            <NavLink to="/login" className="w-full sm:w-auto">
              <Button className="w-full sm:w-auto">Login</Button>
            </NavLink>
            <NavLink to="/register" className="w-full sm:w-auto">
              <Button className="w-full sm:w-auto">Sign Up</Button>
            </NavLink>
          </div>
        )}
      </div>

    </div>
  )
}
