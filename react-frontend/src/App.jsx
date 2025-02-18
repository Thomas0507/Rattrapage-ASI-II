import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Header from './pages/Header';
import Home from './pages/Home';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Header />}>
      <Route index element={<Home />} />
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
    </Route>
  )
);

function App({}) {

  return (
    <>
      <RouterProvider router={router}/>
    </>
  );
}

export default App