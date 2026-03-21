import { Navigate, Outlet } from "react-router-dom";

const IsLogin = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  return user ? <Navigate to="/home" replace /> : <Outlet />;
};

export default IsLogin;