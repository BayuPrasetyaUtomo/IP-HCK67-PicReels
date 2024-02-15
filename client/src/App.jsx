import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
  BrowserRouter,
  Outlet,
  redirect,
} from "react-router-dom";
import {
  HomePage,
  Root,
  CuratedImages,
  LoginPage,
  RegisterPage,
  PersonalizedImage,
} from "./pages";

const getToken = () => {
  const access_token = localStorage.getItem("access_token")
  return access_token
};

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
    loader: async () => {
      const access_token = getToken()
      if (!access_token) {
        return redirect("/login");
      }
      return null;
    },
    element: (
      <>
        <CuratedImages />
      </>
    ),
  },
  {
    path: "/greet",
    loader: async () => {
      const access_token = getToken()
      if (!access_token) {
        return redirect("/login");
      }
      return null;
    },
    element: (
      <>
        <PersonalizedImage />
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
    loader: async () => {
      const access_token = getToken()
      if (access_token) {
        return redirect("/images");
      }
      return null;
    },
  },
  {
    path: "/register",
    element: <RegisterPage />,
    loader: async () => {
      const access_token = getToken()
      if (access_token) {
        return redirect("/images");
      }
      return null;
    },
  },
  {
    path: "/logout",
    loader: async () => {
      localStorage.clear();
      return redirect("/login");
    },
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
