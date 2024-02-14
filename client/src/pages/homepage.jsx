import React from "react";
import { Outlet, useSearchParams } from "react-router-dom";
import { Pagination, Sidebar } from "../components";
import CuratedImages from "./curatedImages";

export default function HomePage() {
  const [searchParams, setSearchParams] = useSearchParams("");

  const query = {};
  for (const [key, value] of searchParams.entries()) {
    query[key] = value;
  }

  console.log(query);

  return (
    <>
      <div className="md:container">
        <Sidebar />
        <div className="flex flex-wrap">
          <CuratedImages />
          <div className="flex flex-wrap justify-center">
            <Pagination />
          </div>
        </div>
      </div>
    </>
  );
}
