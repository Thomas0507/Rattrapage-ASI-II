import React from "react";
import { Link, Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export const HomeLayout = () => {
  const { user } = useAuth();

  if (user) {
    return <Navigate to="/app/main" />;
  }

  return (
    <div>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/login">Login</Link>
      </nav>
      <Outlet />
    </div>
  )
};