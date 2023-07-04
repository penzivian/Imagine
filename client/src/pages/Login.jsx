import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import axios from "axios";
import Navbar from "../components/Navbar";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  // For Login/Logoout
  const [checkLogin, setCheckLogin] = useState(false);
  useEffect(() => {
    const checkLoginFunc = async () => {
      const token = localStorage.getItem("token");
      const response = await fetch("https://ai-image-generator-2-0-six.vercel.app/api/v1/checklogin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const { success } = await response.json();
      if (success) {
        setCheckLogin(true);
      } else {
        setCheckLogin(false);
      }
    };

    checkLoginFunc();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("https://ai-image-generator-2-0-six.vercel.app/api/v1/login", {
        email: email,
        password: password,
      });
      localStorage.setItem("token", data.token);
      // console.log(data.token);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  
  if(checkLogin) navigate('/')

  return (
    <>
      <Navbar checkLogin={checkLogin} setCheckLogin={setCheckLogin} />
      <section>
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div className="relative flex items-end px-4 pb-10 pt-60 sm:px-6 sm:pb-16 md:justify-center lg:px-8 lg:pb-24">
            <div className="absolute inset-0">
              <img
                className="h-full w-full rounded-md object-cover object-top"
                src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
                alt=""
              />
            </div>
          </div>
          <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
            <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
              <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl">
                Log in
              </h2>
              <p className="mt-2 text-sm text-gray-600">
                Don&apos;t have an account?
                <Link
                  to="/register"
                  title=""
                  className="font-semibold text-black transition-all duration-200 hover:underline"
                >
                  Register Here
                </Link>
              </p>
              <form onSubmit={handleSubmit} className="mt-8">
                <div className="space-y-5">
                  <div>
                    <label
                      htmlFor=""
                      className="text-base font-medium text-gray-900"
                    >
                      Email address
                    </label>
                    <div className="mt-2">
                      <input
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        required
                        className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                        type="email"
                        placeholder="Email"
                      ></input>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between">
                      <label
                        htmlFor=""
                        className="text-base font-medium text-gray-900"
                      >
                        Password
                      </label>
                    </div>
                    <div className="mt-2">
                      <input
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        required
                        className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                        type="password"
                        placeholder="Password"
                      ></input>
                    </div>
                  </div>
                  <div>
                    <button
                      type="submit"
                      className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
                    >
                      Get started <ArrowRight className="ml-2" size={16} />
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
