import React from "react";

export default function SmallCard({ photo }) {
  const { alt, photographer, src } = photo;

  return (
    <div className="card w-96 bg-base-100 shadow-xl">
      <figure>
        <img src={src.landscape} alt="Shoes" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">
          {photographer}
          <div className="badge badge-secondary">NEW</div>
        </h2>
        <p>{alt}</p>
        <div className="card-actions justify-end">
          <div className="badge badge-outline">Fashion</div>
          <div className="badge badge-outline">Products</div>
        </div>
      </div>
    </div>
  );
}
