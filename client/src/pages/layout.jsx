import React from "react";
import { Navbar, Hero } from "../components";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <>
      <Navbar />
      {/* <Hero /> */}
      <Outlet />
    </>
  );
}
