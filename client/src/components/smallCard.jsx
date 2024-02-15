import React from "react";
import { Link } from "react-router-dom";

export default function SmallCard({ photo }) {
  const { id, alt, photographer, src } = photo;

  return (
    <Link to={`/greet/${id}`} className="card w-96 bg-base-100 shadow-xl">
      <figure>
        <img src={src.landscape} alt={alt} />
      </figure>
      <div className="card-body gap-0">
        <p className="card-title text-sm">Photographed by</p>
        <p className="text-lg font-bold opacity-70">{photographer}</p>
        <div className="badge badge-secondary absolute right-5 top-56">NEW</div>
        <p className="mt-3">{alt}</p>
        <div className="card-actions justify-end mt-5">
          <div className="badge badge-outline">Fashion</div>
          <div className="badge badge-outline">Products</div>
        </div>
      </div>
    </Link>
  );
}
