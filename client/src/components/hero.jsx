import React from "react";
import { Link } from "react-router-dom";

export default function Hero({ props }) {
  const tags = ["Angry", "Sad", "Adventurous", "Lonely", "Excited", "Happy"];

  console.log(props.captions.split("\n"));
  return (
    <>
      <div className="hero min-h-[500px] bg-base-200">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h1 className="text-5xl font-bold">
              {props ? `Hi, ${props.name}` : `Welcome back`}
            </h1>
            <p className="py-6 whitespace-pre-line">
              {props.captions
                ? props.captions
                : "Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti aut repudiandae et a id nisi."}
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              {tags.map((tag) => {
                return <Link to={`/feelings/?feeling=${tag.toLowerCase()}`} className="btn btn-primary w-32">{tag}</Link>;
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
