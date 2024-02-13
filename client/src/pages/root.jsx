import React from "react";
import { Outlet } from "react-router-dom";

export default function Root() {
  return (
    <div className="md:container md:mx-auto">
      <Outlet />
    </div>
  );
}
