import React, { useEffect } from "react";
import LoginForm from "../components/LoginForm";
import SignupForm from "../components/SignupForm";

// const url_users = "https://jsonplaceholder.typicode.com/users";

const Auth = ({ BACKEND_URL }) => {
  // const getUsers = async () => {
  //   // fetch default users by API
  //   const response = await fetch(url_users);
  //   const all_users = await response.json();
  //   localStorage.setItem("all_users", JSON.stringify(all_users));
  // };

  // useEffect(() => {
  //   getUsers();
  // }, []);

  return (
    <>
      <div className="flex flex-col md:flex-row bg-gray-50 space-y-4 md:space-y-0 md:space-x-4 justify-center">
        <LoginForm BACKEND_URL={BACKEND_URL} />
        <SignupForm BACKEND_URL={BACKEND_URL} />
      </div>
    </>
  );
};

export default Auth;
