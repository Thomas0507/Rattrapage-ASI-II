import React from "react";
import { Link, Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { Button } from "@mui/material";


export const HomeLayout = () => {
  const { user } = useAuth();

  if (user) {
    return <Navigate to="/app/main" />;
  }

  return (
      <Outlet />
  )
};