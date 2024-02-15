import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { randomizer } from "../utils";
import { LoadingCircle } from "../components";

const access_token = localStorage.getItem("access_token");
export default function RegisterPage() {
  const [photo, setPhoto] = useState([]);
  const [loading, setLoading] = useState(true);
  const [input, setInput] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const fetchImage = async () => {
    try {
      const { data } = await axios({
        method: "get",
        url: "http://localhost:3000/surprise",
      });

      setPhoto(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const infoRegister = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  const registerAttempt = async (e) => {
    e.preventDefault();

    const { data } = await axios({
      method: "post",
      url: "http://localhost:3000/register",
      data: input,
    });

    localStorage.setItem("access_token", data.access_token);
    navigate("/login");
  };

  useEffect(() => {
    fetchImage();
  }, [loading]);

  const { id, photographer, photographer_url, alt, src } = photo;

  return (
    <>
      {loading && <LoadingCircle />}
      {!loading && (
        <div
          className="hero min-h-screen"
          style={{
            backgroundImage: `url(${src.landscape})`,
          }}
        >
          <div className="hero-overlay bg-black bg-opacity-70"></div>
          <div className="hero-content text-center text-neutral-content">
            <div className="max-w-md">
              <h1 className="mb-5 text-5xl font-bold">Welcome to Pic Reels</h1>
              <p className="mb-5">
                This website will give you image suggestion depending on the
                mood you provide. <br /> I hope you enjoy it!
              </p>
              <p className="mb-5">
                Photo hosted by{" "}
                <Link
                  className="hover:link-info"
                  to={"https://www.pexels.com/"}
                >
                  Pexels
                </Link>
                <br />
                taken by{" "}
                <Link className="hover:link-info" to={photographer_url}>
                  {photographer}
                </Link>
              </p>
              <p>
                Have an account ? Login{" "}
                <Link to={"/login"} className="hover:link-info">
                  here
                </Link>
              </p>
            </div>
            <div className="card mx-16 shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
              <form className="card-body" onSubmit={registerAttempt}>
              <div className="form-control">
                  <label className="label">
                    <span className="label-text">Username</span>
                  </label>
                  <input
                    type="text"
                    placeholder="username"
                    className="input input-bordered"
                    onChange={infoRegister}
                    name="username"
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Email</span>
                  </label>
                  <input
                    type="email"
                    placeholder="email"
                    className="input input-bordered"
                    onChange={infoRegister}
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
                    onChange={infoRegister}
                    name="password"
                  />
                  <label className="label">
                    <a href="#" className="label-text-alt link link-hover">
                      Forgot password?
                    </a>
                  </label>
                </div>
                <div className="form-control mt-6">
                  <button className="btn btn-primary" type="submit">
                    Register
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
