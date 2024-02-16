import React from "react";
import { Link } from "react-router-dom";

export default function Hero({ props }) {
  const tags = ["Angry", "Sad", "Adventurous", "Lonely", "Excited", "Happy"];

  return (
    <>
      <div className="sticky hero min-h-[450px] bg-base-200">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h1 className="text-5xl font-bold">
              {props ? `Hi, ${props.name}` : `Welcome back`}
            </h1>
            <p className="py-6 whitespace-pre-line">
              {props && props.captions
                ? props.captions
                : "These are lists of images generated for you. Some actually picked by you. And I hope you enjoy this experience"}
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              {tags.map((tag, index) => {
                return (
                  <Link
                    key={`${tag}_${index}`}
                    to={`/feelings/?feeling=${tag.toLowerCase()}`}
                    className="btn btn-primary w-32"
                  >
                    {tag}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
