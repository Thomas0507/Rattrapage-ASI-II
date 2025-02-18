import React from "react";
import { Link, Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export const ProtectedLayout = () => {
  const { user } = useAuth();

  if (!user) {
    // protection, if user not connected, return to home page
    return <Navigate to="/" />;
  }

};