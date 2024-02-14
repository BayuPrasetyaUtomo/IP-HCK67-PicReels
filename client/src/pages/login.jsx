import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { randomizer } from "../utils";

const access_token = localStorage.getItem("access_token");
export default function LoginPage() {
  const [photo, setPhoto] = useState([]);
  const [loading, setLoading] = useState(true);

  const num = randomizer(0, 15);
  const fetchImage = async () => {
    try {
      // console.log("IN");
      const { data } = await axios({
        method: "get",
        url: "http://localhost:3000/surprise",
      });

      console.log(data);
      setPhoto(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (photo.length) {
      setLoading(false);
    }
    fetchImage();
  }, [loading]);

  console.log(photo);

  console.log(photo.src);
  console.log(photo.src.landscape);
  // const { id, photographer, photographer_url, alt, src } = photo
  // const { landscape } = src;
  // console.log(src.landscape);

  return (
    <>
      {/* <div
      className="hero min-h-screen"
      style={{
        backgroundImage: `url(${photo.src.landscape})`,
      }}
    >
      <div className="hero-content text-center text-neutral-content">
        <div className="max-w-md">
          <h1 className="mb-5 text-5xl font-bold">Welcome to Pic Reels</h1>
          <p className="mb-5">
            This website will give you image suggestion depending on the mood
            you provide. <br /> I hope you enjoy it!
          </p>
          <p className="mb-5">
            Photo hosted by
            <Link className="hover:link-info" to={"https://www.pexels.com/"}>
              Pexels
            </Link>
            <br />
            taken by
            <Link className="hover:link-info" to={photo.photographer_url}>
              {photographer}
            </Link>
          </p>
          <p>
            Don't have an account ? register
            <Link to={"/register"} className="hover:link-info">
              here
            </Link>
          </p>
        </div>
        <div className="card mx-16 shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <form className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="email"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="password"
                className="input input-bordered"
                required
              />
              <label className="label">
                <a href="#" className="label-text-alt link link-hover">
                  Forgot password?
                </a>
              </label>
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-primary">Login</button>
            </div>
          </form>
        </div>
      </div>
    </div> */}
    </>
  );
}
