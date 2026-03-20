import { useSelector } from "react-redux"
import { Navigate, Outlet, useLocation } from "react-router"




export default function IsLogin() {

  const location = useLocation();

  const { user } = useSelector((state) => state.userSlice);
  return !user ? <Outlet /> : <Navigate to="/" state={{ from: location }} />
}
