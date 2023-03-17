import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

const UpdateProfileForm = ({
  BACKEND_URL,
  isOpen,
  setIsOpen,
  avatarLink,
  setAvatarLink,
}) => {
  const [email, setEmail] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [dob, setDob] = useState("");

  const getProfileData = () => {
    const login_username = localStorage.current_user;
    const emailUrl = BACKEND_URL + "/email/" + login_username;
    const zipcodeUrl = BACKEND_URL + "/zipcode/" + login_username;
    const dobUrl = BACKEND_URL + "/dob/" + login_username;
    axios
      .get(emailUrl, { withCredentials: true })
      .then((res) => {
        setEmail(res.data.email);
      })
      .catch((error) => {
        console.error("Error:", error);
      });

    axios
      .get(zipcodeUrl, { withCredentials: true })
      .then((res) => {
        setZipcode(res.data.zipcode);
      })
      .catch((error) => {
        console.error("Error:", error);
      });

    axios
      .get(dobUrl, { withCredentials: true })
      .then((res) => {
        setDob(res.data.dob);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  useEffect(() => {
    getProfileData();
  }, []);

  const refContainerEmail = useRef(null);
  // const refContainerPhone = useRef(null);
  const refContainerZipcode = useRef(null);

  function openModal() {
    setIsOpen(true);
  }

  function checkEmail(input) {
    if (!input.checkValidity()) {
      input.reportValidity();
      return false;
    }
    return true;
  }

  // function checkPhone(input) {
  //   if (!input.checkValidity()) {
  //     input.setCustomValidity(
  //       "Please enter phone number in the format of 123-456-7890."
  //     );
  //     input.reportValidity();
  //     return false;
  //   } else {
  //     input.setCustomValidity("");
  //     return true;
  //   }
  // }
  function checkPost(input) {
    if (!input.checkValidity()) {
      input.setCustomValidity("Please enter zip in the format of 12345");
      input.reportValidity();
      return false;
    } else {
      input.setCustomValidity("");
      return true;
    }
  }

  function passconf() {
    let pass = document.getElementById("pass");
    let passconf = document.getElementById("passconf");
    if (pass.value !== passconf.value) {
      passconf.setCustomValidity("Password confirmation does not match.");
      passconf.reportValidity();
      return false;
    } else {
      passconf.setCustomValidity("");
      return true;
    }
  }

  function sendupdate() {
    // let name = document.getElementById("name");
    let email = document.getElementById("email");
    // let phone = document.getElementById("phone");
    let zipcode = document.getElementById("zipcode");
    let pass = document.getElementById("pass");
    let psconf = document.getElementById("passconf");

    // let nametag = document.getElementById("nametag");
    // let emailtag = document.getElementById("emailtag");
    // let phonetag = document.getElementById("phonetag");
    // let zipcodetag = document.getElementById("zipcodetag");
    let passtag = document.getElementById("passtag");
    let passconftag = document.getElementById("passconftag");

    // let check = checkEmail(email) & checkPhone(phone) & passconf(psconf);
    let check = checkEmail(email) & passconf(psconf);
    if (check) {
      let update = false;

      // update =
      //   name.value.length > 0 ||
      //   email.value.length > 0 ||
      //   phone.value.length > 0 ||
      //   zipcode.value.length > 0 ||
      //   psconf.value.length > 0;

      update =
        email.value.length > 0 ||
        zipcode.value.length > 0 ||
        psconf.value.length > 0;

      if (update) {
        openModal();

        // if (name.value.length > 0) {
        //   nametag.innerHTML = name.value;
        //   name.value = "";
        // }
        if (email.value.length > 0) {
          const emailUrl = BACKEND_URL + "/email";
          axios
            .put(emailUrl, { email: email.value }, { withCredentials: true })
            .then((res) => {
              setEmail(res.data.email);
            })
            .catch((error) => {
              console.error("Error:", error);
            });
          email.value = "";
        }
        // if (phone.value.length > 0) {
        //   phonetag.innerHTML = phone.value;
        //   phone.value = "";
        // }
        if (zipcode.value.length > 0) {
          const zipcodeUrl = BACKEND_URL + "/zipcode";
          axios
            .put(
              zipcodeUrl,
              { zipcode: parseInt(zipcode.value) },
              { withCredentials: true }
            )
            .then((res) => {
              setZipcode(res.data.zipcode);
            })
            .catch((error) => {
              console.error("Error:", error);
            });
          zipcode.value = "";
        }
        if (psconf.value.length > 0) {
          const passwordUrl = BACKEND_URL + "/password";
          let len = pass.value.length;
          axios
            .put(
              passwordUrl,
              { password: pass.value },
              { withCredentials: true }
            )
            .then((res) => {
              passtag.innerHTML = "*".repeat(len);
              passconftag.innerHTML = "*".repeat(len);
            })
            .catch((error) => {
              console.error("Error:", error);
            });
          pass.value = "";
          psconf.value = "";
        }
      }
    }
  }

  const handleAvatarChange = async (e) => {
    const file = e.target.files[0];
    const fd = new FormData();
    fd.append("image", file);

    let newAvatarUrl = "";
    const setAvatarUrl = BACKEND_URL + "/avatar";
    await fetch(setAvatarUrl, {
      method: "PUT",
      body: fd,
      credentials: "include",
    })
      .then((res) => res.json())
      .then((res) => {
        newAvatarUrl = res.avatar;
        setAvatarLink(newAvatarUrl);
      });
  };

  return (
    <>
      <div className="m-5 px-6 py-8 flex flex-col bg-white rounded-lg shadow">
        <p className="text-2xl font-semibold">Update Profile</p>

        <div>
          <img className="m-3 h-32 w-32 rounded-full" src={avatarLink} alt="" />

          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleAvatarChange(e)}
            className="block w-full text-sm text-slate-500 pb-4 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100"
          />
        </div>

        <div className="flex items-center">
          <span className="my-2 mr-2" id="nametag" data-testid="nametag">
            {localStorage.current_user}
          </span>
        </div>

        <div className="flex items-center">
          <span className="my-2 mr-2" id="dobtag">
            {dob}
          </span>
        </div>

        <div className="flex items-center">
          <span className="my-2 mr-2" id="emailtag" data-testid="emailtag">
            {email}
          </span>
          <input
            type="email"
            className="my-2 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
            placeholder="Email"
            aria-label="Email"
            aria-describedby="emailtag"
            id="email"
            ref={refContainerEmail}
            onChange={() => checkEmail(refContainerEmail.current)}
          />
        </div>

        {/* <div className="flex items-center">
          <span className="my-2 mr-2 w-32" id="phonetag" data-testid="phonetag">
            123-456-7890
          </span>
          <input
            type="tel"
            className="my-2 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
            placeholder="Phone Number"
            aria-label="Phone Number"
            aria-describedby="phonetag"
            id="phone"
            pattern={"[0-9]{3}-[0-9]{3}-[0-9]{4}"}
            ref={refContainerPhone}
            onInput={() => refContainerPhone.current.setCustomValidity("")}
            onChange={() => checkPhone(refContainerPhone.current)}
          />
        </div> */}

        <div className="flex items-center">
          <span className="my-2 mr-2" id="zipcodetag" data-testid="zipcodetag">
            {zipcode}
          </span>
          <input
            type="text"
            className="my-2 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
            placeholder="Zipcode"
            aria-label="Zipcode"
            aria-describedby="zipcodetag"
            id="zipcode"
            pattern={"[0-9]{5}"}
            ref={refContainerZipcode}
            onInput={() => refContainerZipcode.current.setCustomValidity("")}
            onChange={() => checkPost(refContainerZipcode.current)}
          />
        </div>

        <div className="flex items-center">
          <span className="my-2 mr-2" id="passtag" data-testid="passupdatetag">
            ****
          </span>
          <input
            type="password"
            className="my-2 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
            placeholder="Password"
            aria-label="Password"
            aria-describedby="passtag"
            id="pass"
            data-testid="passUpdate"
          />
        </div>

        <div className="flex items-center">
          <span
            className="my-2 mr-2"
            id="passconftag"
            data-testid="passconftag"
          >
            ****
          </span>
          <input
            type="password"
            className="my-2 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
            placeholder="Password Confirmation"
            aria-label="Password Confirmation"
            aria-describedby="passconftag"
            id="passconf"
            data-testid="passconfUpdate"
            onChange={passconf}
          />
        </div>

        <div className="flex items-center justify-center">
          <button
            type="button"
            onClick={sendupdate}
            className="rounded-md bg-black bg-opacity-20 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
          >
            Send
          </button>
        </div>
      </div>
    </>
  );
};

export default UpdateProfileForm;
