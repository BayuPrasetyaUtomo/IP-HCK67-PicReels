import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { randomizer } from "../utils";
import { LoadingCircle } from "../components";
import { GoogleLogin } from "@react-oauth/google";

// const base_url = "https://dev.katakatari.site"
const base_url = "http://localhost:3000"
export default function LoginPage() {
  const [photo, setPhoto] = useState([]);
  const [loading, setLoading] = useState(true);
  const [input, setInput] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const fetchImage = async () => {
    try {
      const { data } = await axios({
        method: "get",
        url: base_url + "/surprise",
      });

      setPhoto(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const loginInfo = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  const loginAttempt = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios({
        method: "post",
        url: base_url + "/login",
        data: input,
      });
      // console.log(data);
      const { username: name, subscription } = data.user;
      localStorage.setItem("access_token", data.access_token);
      localStorage.setItem("user", JSON.stringify({ name, subscription }));
      navigate("/greet");
    } catch (error) {
      console.log(error);
    }
  };

  const handleCredentialResponse = async (response) => {
    console.log("Encoded JWT ID token: " + response.credential);
    try {
      const { data } = await axios({
        method: "POST",
        url: base_url + "/google-login",
        headers: {
          google_token: response.credential,
        },
      });

      console.log(data);
      const { username: name, subscription } = data.user;
      localStorage.setItem("access_token", data.access_token);
      localStorage.setItem("user", JSON.stringify({ name, subscription }));
      navigate("/greet");
    } catch (error) {
      console.log(error);
    }
  };

  function googleSignIn() {
    google.accounts.id.initialize({
      client_id:
        import.meta.env.VITE_GCID,
      callback: handleCredentialResponse,
    });
    google.accounts.id.renderButton(
      document.getElementById("buttonDiv"),
      { theme: "dark", size: "large" } // customization attributes
    );
    google.accounts.id.prompt(); // also display the One Tap dialog
  }

  useEffect(() => {
    // googleSignIn();
    fetchImage();
  }, [loading]);

  const { id, photographer, photographer_url, alt, src } = photo;

  console.log(photo);
  return (
    <>
      {loading ? (
        <LoadingCircle />
      ) : (
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
                Don't have an account ? register{" "}
                <Link to={"/register"} className="hover:link-info">
                  here
                </Link>
              </p>
            </div>
            <div className="card mx-16 shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
              <form className="card-body" onSubmit={loginAttempt}>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Email</span>
                  </label>
                  <input
                    type="email"
                    placeholder="email"
                    className="input input-bordered"
                    onChange={loginInfo}
                    value={input.email}
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
                    value={input.password}
                    name="password"
                  />
                  <label className="label">
                    <a href="#" className="label-text-alt link link-hover">
                      Forgot password?
                    </a>
                  </label>
                </div>
                <div className="form-control mt-6 justify-center">
                  {/* <div id="buttonDiv"></div> */}
                  <GoogleLogin width={320} theme="filled_blue"
                    onSuccess={(handleCredentialResponse)}
                    onError={() => {
                      console.log("Login Failed");
                    }}
                  />
                  <p className="my-2">OR</p>
                  <button className="btn btn-primary" type="submit">
                    Login
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
