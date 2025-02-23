import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import './App.css';
import { useAuth } from "./hooks/useAuth";
import { HomeLayout } from "./layouts/HomeLayout";
import { ProtectedLayout } from "./layouts/ProtectedLayout";
import CardScreen from "./pages/app/CardScreen";
import SelectScreen from "./pages/app/SelectScreen";
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Header from "./pages/Header";
import './App.css';
import Conversation from "./pages/chat/Conversation"; // Import your Conversation component
import React from "react";

function App({ }) {

  const { user } = useAuth();

  return (
    <>
      <Header user={user} />
      <Routes>
        {/* public routes */}
        <Route element={<HomeLayout />}>
          <Route path="/" element={<Navigate to="/app/main" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
        {/* private routes */}
        <Route path="/app" element={<ProtectedLayout />}>
          <Route path="main" element={<SelectScreen />} />
          <Route path="cards" element={<CardScreen />} />
          <Route path="conversation" element={<Conversation/>}/> 
        </Route>

        {/* catch all */}
        <Route path="*" element={<Navigate to="/app/main" replace />} />
      </Routes>
    </>
  );
}

export default App