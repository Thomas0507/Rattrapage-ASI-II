import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export const ProtectedLayout = () => {
  const { user, logout } = useAuth();

  if (!user) {
    // protection, if user not connected, return to home page
    return <Navigate to="/login" />;
  }

  const tokenPayload = JSON.parse(atob(user.split(".")[1]));
  if (tokenPayload && tokenPayload.exp && tokenPayload.exp * 1000 < Date.now()) {
    logout();
  }

  return <Outlet/>

};