import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignupForm = ({ BACKEND_URL }) => {
  const navigate = useNavigate();

  const [dob, setDob] = useState("2000-01-01");

  const handleDobChange = (e) => {
    const date = e.target.value;
    setDob(date);
  };
  function checkAccName(input) {
    if (!/[a-zA-Z][a-zA-Z0-9]*/.test(input.value)) {
      input.reportValidity();
      return false;
    }
    return true;
  }

  function checkEmail(input) {
    if (!input.checkValidity()) {
      input.reportValidity();
      return false;
    }
    return true;
  }

  function checkPhone(input) {
    if (!/[0-9]{10}/.test(input.value)) {
      input.setCustomValidity(
        "Please enter phone number in the format of 1234567890."
      );
      input.reportValidity();
      return false;
    } else {
      input.setCustomValidity("");
      return true;
    }
  }
  function checkPost(input) {
    if (!/[0-9]{5}/.test(input.value)) {
      input.setCustomValidity("Please enter zip in the format of 12345");
      input.reportValidity();
      return false;
    } else {
      input.setCustomValidity("");
      return true;
    }
  }

  function passconf(pass, psconf) {
    if (pass.value === "" || pass.value !== psconf.value) {
      psconf.setCustomValidity("Password confirmation does not match.");
      psconf.reportValidity();
      return false;
    } else {
      psconf.setCustomValidity("");
      return true;
    }
  }
  const checkSignup = () => {
    let name = document.getElementById("acc_name");
    let email = document.getElementById("email_signup");
    let phone = document.getElementById("phone_signup");
    let zipcode = document.getElementById("zip_signup");
    let pass = document.getElementById("password_signup");
    let psconf = document.getElementById("pwc_signup");
    let dob = document.getElementById("dob");

    let check =
      checkAccName(name) &&
      checkEmail(email) &&
      checkPhone(phone) &&
      checkPost(zipcode) &&
      passconf(pass, psconf);

    if (!check) {
      localStorage.setItem("status", "signupError");
    }
    return check;
  };

  return (
    <div className="flex flex-col justify-center px-6 py-8 w-4/5 md:w-2/5 md:max-w-prose">
      <div className="bg-white rounded-lg shadow px-4 py-2">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
            Sign up for an account
          </h1>
          <form className="space-y-4 md:space-y-6" action="#">
            <div>
              <label
                htmlFor="acc_name"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Account Name
              </label>
              <input
                type="text"
                id="acc_name"
                name="acc_name"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                placeholder="Your Account Name"
                required
              />
            </div>

            <div>
              <label
                htmlFor="dis_name"
                className="block mb-2 text-sm font-medium text-gray-900 "
              >
                Display Name (Optional)
              </label>
              <input
                type="text"
                id="dis_name"
                name="dis_name"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                placeholder="Your Display Name"
              />
            </div>

            <div>
              <label
                htmlFor="email_signup"
                className="block mb-2 text-sm font-medium text-gray-900 "
              >
                Your email
              </label>
              <input
                type="email"
                name="email_signup"
                id="email_signup"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                placeholder="name@company.com"
                required
              />
            </div>

            <div>
              <label
                htmlFor="password_signup"
                className="block mb-2 text-sm font-medium text-gray-900 "
              >
                Password
              </label>
              <input
                type="password"
                name="password_signup"
                id="password_signup"
                placeholder="••••••••"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                required
              />
            </div>

            <div>
              <label
                htmlFor="pwc_signup"
                className="block mb-2 text-sm font-medium text-gray-900 "
              >
                Password Confirmation:
              </label>
              <input
                type="password"
                id="pwc_signup"
                name="pwc_signup"
                placeholder="••••••••"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                required
              />
            </div>

            <div>
              <label
                htmlFor="phone_signup"
                className="block mb-2 text-sm font-medium text-gray-900 "
              >
                Phone Number:
              </label>
              <input
                type="text"
                id="phone_signup"
                name="phone_signup"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                placeholder="1234567890"
                required
              />
            </div>

            <div>
              <label
                htmlFor="dob"
                className="block mb-2 text-sm font-medium text-gray-900 "
              >
                Date of Birth: (Must be 18+ to register)
              </label>
              <input
                type="date"
                id="dob"
                name="dob"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                value={dob}
                onChange={handleDobChange}
                required
              />
            </div>

            <div>
              <label
                htmlFor="zip_signup"
                className="block mb-2 text-sm font-medium text-gray-900 "
              >
                Zip Code:
              </label>
              <input
                type="text"
                id="zip_signup"
                name="zip_signup"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                placeholder="77030"
                required
              />
            </div>
            <button
              type="submit"
              onClick={async (e) => {
                e.preventDefault();
                let name = document.getElementById("acc_name");
                let email = document.getElementById("email_signup");
                let phone = document.getElementById("phone_signup");
                let zipcode = document.getElementById("zip_signup");
                let pass = document.getElementById("password_signup");
                let psconf = document.getElementById("pwc_signup");
                let dob = document.getElementById("dob");
                if (checkSignup()) {
                  localStorage.setItem("status", "login");
                  localStorage.setItem("current_user", name.value);
                  localStorage.setItem("current_userId", 11);
                  localStorage.setItem(
                    "headline",
                    "Welcome to Rice. Let's go Owls!"
                  );

                  const url = BACKEND_URL + "/register";
                  const options = {
                    method: "POST",
                    credentials: "include",
                    headers: {
                      Accept: "application/json",
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                      username: name.value,
                      email: email.value,
                      dob: dob.value,
                      zipcode: zipcode.value,
                      password: pass.value,
                    }),
                  };
                  await fetch(url, options).then((res) => {
                    if (res.status === 200) {
                      localStorage.setItem("status", "login");
                      localStorage.setItem("current_user", name.value);
                      localStorage.setItem("current_userId", 11);
                      localStorage.setItem(
                        "headline",
                        "Welcome to Rice. Let's go Owls!"
                      );
                      navigate("/feed");
                    } else if (res.status === 400) {
                      console.log(res);
                      alert("400");
                    } else if (res.status === 409) {
                      name.setCustomValidity("Username is used.");
                      name.reportValidity();
                    } else {
                      console.log("Something unexpected happens.");
                      alert("Something unexpected happens.");
                    }
                  });
                } else {
                  alert("Please check your input again.");
                  name.reportValidity();
                  email.reportValidity();
                  phone.reportValidity();
                  zipcode.reportValidity();
                  psconf.reportValidity();
                }
              }}
              className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
            >
              Sign up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;
