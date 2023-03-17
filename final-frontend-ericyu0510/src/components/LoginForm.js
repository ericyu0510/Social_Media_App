import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
// import { userlist } from "../userlist";

const LoginForm = ({ BACKEND_URL }) => {
  const navigate = useNavigate();

  const checkLogin = async () => {
    let name = document.getElementById("username_login");
    let pass = document.getElementById("password_login");
    let flag = false;
    const url = BACKEND_URL + "/login";

    await axios
      .post(
        url,
        {
          username: name.value,
          password: pass.value,
        },
        { withCredentials: true }
      )
      .then((res) => {
        if (res.status === 200) {
          localStorage.setItem("status", "login");
          localStorage.setItem("current_user", name.value);
          localStorage.setItem("current_userId", 1);
          localStorage.setItem("headline", "Welcome to Rice. Let's go Owls!");
          flag = true;
        }
      })
      .catch((error) => {
        if (error.response.status === 401 || error.response.status === 403) {
          flag = false;
        }
      });

    return flag;
  };

  return (
    <>
      <div className="flex flex-col justify-center px-6 py-8 w-4/5 md:w-2/5 md:max-w-prose">
        <a className="flex justify-center mb-6 text-2xl font-semibold text-gray-900">
          <img
            className="w-8 h-8 mr-2"
            src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
            alt="logo"
          />
          Ricebook
        </a>
        <div className="bg-white rounded-lg shadow px-4 py-2">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
              Sign in to your account
            </h1>
            <form className="space-y-4 md:space-y-6">
              {/* <div>
                <a
                  className="w-full text-gray-700 bg-gray-200 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                  href={BACKEND_URL + "/auth/google"}
                  // onClick={async (event) => {
                  //   event.preventDefault();
                  //   navigate("/auth/google");
                  // }}
                >
                  Google
                </a>
              </div> */}

              <div>
                <label
                  htmlFor="username_login"
                  className="block mb-2 text-sm font-medium text-gray-900 "
                >
                  Username
                </label>
                <input
                  type="text"
                  name="username_login"
                  id="username_login"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                  placeholder="Your username"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="password_login"
                  className="block mb-2 text-sm font-medium text-gray-900 "
                >
                  Enter Your Password
                </label>
                <input
                  type="password"
                  name="password_login"
                  id="password_login"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                  required
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="remember"
                      aria-describedby="remember"
                      type="checkbox"
                      className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 "
                      required=""
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="remember" className="text-gray-500 ">
                      Remember me
                    </label>
                  </div>
                </div>
              </div>
              <button
                type="submit"
                className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                onClick={async (event) => {
                  event.preventDefault();
                  if (await checkLogin()) {
                    navigate("/feed");
                  } else {
                    alert("Username or password is wrong.");
                  }
                }}
              >
                Sign in
              </button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Don't have an account yet?{" "}
                <a className="font-medium text-primary-600 hover:underline dark:text-primary-500">
                  Sign up
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginForm;
