import { Route, Routes } from "react-router-dom";
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Home from './pages/Home';
import { HomeLayout } from "./layouts/HomeLayout";
import SelectScreen from "./pages/app/SelectScreen";
import ProfilePage from "./pages/profile/ProfilePage";
import { ProtectedLayout } from "./layouts/ProtectedLayout";
import { useAuth } from "./hooks/useAuth";
import Header from "./pages/Header";

import './App.css';
import React from "react";
import CardDetailPage from "./pages/app/cards/card/CardDetailPage";

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
        <Route path="card/:cardId" element={<CardDetailPage/>}/>
      </Route>
      <Route path="/profile" element={<ProtectedLayout/>}>
        <Route path="" element={<ProfilePage/>}></Route>
      </Route>
    </Routes>
    </>
  );
}

export default App