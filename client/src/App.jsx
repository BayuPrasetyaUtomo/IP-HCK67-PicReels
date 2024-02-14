import { useState } from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
  BrowserRouter,
  Outlet,
} from "react-router-dom";
import {
  HomePage,
  Root,
  CuratedImages,
  LoginPage,
  RegisterPage,
  // SimpleLoginPage,
} from "./pages";
import { Sidebar } from "./components";


const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <HomePage />
      </>
    ),
  },
  {
    path: "/images",
    element: (
      <>
        <CuratedImages />
      </>
    ),
  },
  {
    path: "/login",
    element: (
      <>
      <LoginPage />
      </>
    ),
  },
  // {
  //   path: "/register",
  //   element: <RegisterPage />,
  // },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
