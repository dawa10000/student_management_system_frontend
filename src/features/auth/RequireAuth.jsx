import { Outlet, Navigate } from "react-router";
import { useSelector } from "react-redux";

export default function RequireAuth() {
  const { user } = useSelector((state) => state.userSlice);

  return user ? <Outlet /> : <Navigate to="/login" />;
}