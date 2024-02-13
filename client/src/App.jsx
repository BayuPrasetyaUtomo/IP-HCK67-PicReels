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
import { Homepage, Root, CuratedImages } from "./pages";
import { SmallCard } from "./components";
// import "./App.css";

const router = createBrowserRouter([
  {
    path: "/images",
    element: <CuratedImages />,
  },
]);

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
