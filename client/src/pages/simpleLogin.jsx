import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { randomizer } from "../utils";

const access_token = localStorage.getItem("access_token");

export default function SimpleLoginPage() {
  const [photo, setPhoto] = useState([]);
  const [input, setInput] = useState([]);
  const [loading, setLoading] = useState(true);

  async function fetchImage() {
    let num = randomizer(0, 15);
    try {
      const { data } = await axios({
        method: "get",
        url: "http://localhost:3000/surprise",
      });

      setPhoto(data);
    } catch (error) {
      console.log(error);
    }
  }

  const loginInfo =  (e) => {
  console.log(e.target);
  // const {email, password} = 
  };

  useEffect(() => {
    fetchImage();
  }, [loading]);

  const { id, photographer, photographer_url, url, src } = photo;

  const landscape = `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200`
  // const landscape = `https://images.pexels.com/photos/${1906658}/pexels-photo-${1906658}.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200`;

  return (
    <>
      <div
        className="hero min-h-screen"
        style={{
          // backgroundImage: `url(${photo.src.landscape})`,
          backgroundImage: `url(${landscape})`,
        }}
      >
        <div className="hero-overlay bg-opacity-70"></div>
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
                  onChange={loginInfo}
                  name="email"
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
                  onChange={loginInfo}
                  name="password"
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
      </div>
    </>
  );
}
