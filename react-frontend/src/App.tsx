import { createBrowserRouter, createRoutesFromElements, Route, Routes, RouterProvider } from "react-router-dom";
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Home from './pages/Home';
import { AuthProvider } from "./hooks/useAuth";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { HomeLayout } from "./layouts/HomeLayout";
import SelectScreen from "./pages/app/SelectScreen";
import CardScreen from "./pages/app/CardScreen";
import { ProtectedLayout } from "./layouts/ProtectedLayout";
import { useAuth } from "./hooks/useAuth";
import Header from "./pages/Header";
import './App.css';
import React from "react";

function App({}) {

const { user } = useAuth();

  return (
    <>
    <Header user={user}/>
    <Routes>
      {/* public routes */}
      <Route element={<HomeLayout/>}>
        <Route path="/" element = {<Home/>}/>
        <Route path="/login" element = {<Login/>}/>
        <Route path="/register" element = {<Register/>}/>
      </Route>
      {/* private routes */}
      <Route path="/app" element={<ProtectedLayout/>}>
        <Route path="main" element={<SelectScreen/>}/>
        <Route path="cards" element={<CardScreen/>}/>
      </Route>
    </Routes>
    </>
  );
}

export default App