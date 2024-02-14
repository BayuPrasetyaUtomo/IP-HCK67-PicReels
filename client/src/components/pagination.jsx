import React from "react";

export default function Pagination({ page }) {
  return (
    <div className="join">
      <button className="join-item btn btn-primary opacity-60">«</button>
      <button className="join-item btn btn-primary opacity-60 w-16">{page ? page : 1}</button>
      <button className="join-item btn btn-primary opacity-60">»</button>
    </div>
  );
}
