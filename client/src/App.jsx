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
import { Homepage, Root } from "./pages";
// import "./App.css";
import CuratedImages from "./pages/curatedImages";

const router = createBrowserRouter([
  // {
  //   element: <Root />,
  //   children: [
  //     {
  //       path: "/",
  //       element: (
  //         <>
  //           <Homepage>
  //             <Link to="about">About Us</Link>
  //           </Homepage>
  //         </>
  //       ),
  //     },
  //     {
  //       path: "about",
  //       element: (
  //         <>
  //           <div>About</div>
  //         </>
  //       ),
  //     },
  //   ],
  // },
  {
    path: "/",
    element: <CuratedImages/>,
    // children: [
    //   {
    //     element: (
    //       <>
    //         <Homepage>
    //           <CuratedImages />
    //         </Homepage>
    //       </>
    //     ),
      },
  //     {
  //       path: "about",
  //       element: (
  //         <>
  //           <div>About</div>
  //         </>
  //       ),
  //     },
  //   ],
  // },
]);

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <RouterProvider router={router} />
      {/* <CuratedImages/> */}
    </>
  );
}

export default App;
