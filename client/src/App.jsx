import {
  createBrowserRouter,
  RouterProvider,
  redirect,
  Navigate,
} from "react-router-dom";
import {
  HomePage,
  CuratedImages,
  LoginPage,
  RegisterPage,
  PersonalizedImage,
  Layout,
} from "./pages";
import { GoogleOAuthProvider } from "@react-oauth/google";

const getToken = () => {
  const access_token = localStorage.getItem("access_token");
  return access_token;
};

const router = createBrowserRouter([
  {
    path: "*",
    element: <Navigate to={"/greet"} />,
  },
  {
    path: "/",
    element: <Layout />,
    loader: () => !localStorage.getItem("access_token") && redirect("/login"),
    children: [
      {
        path: "/greet",
        loader: async () => {
          const access_token = getToken();
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
    ],
  },
  {
    path: "/login",
    element: (
      <>
        <LoginPage />
      </>
    ),
    loader: async () => {
      const access_token = getToken();
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
      const access_token = getToken();
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
  return (
    <GoogleOAuthProvider clientId="757857290112-c6o03pkilg2g1qgblvh8favngit0at8h.apps.googleusercontent.com">
      <RouterProvider router={router} />
    </GoogleOAuthProvider>
  )
}

export default App;
