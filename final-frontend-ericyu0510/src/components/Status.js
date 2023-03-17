import React, { useEffect, useState } from "react";
import axios from "axios";

const Status = ({ BACKEND_URL, avatarLink, username }) => {
  const [status, setStatus] = useState("");
  const handleStatusChange = async (e) => {
    const text = document.getElementById("update_status").value;
    if (text !== "") {
      document.getElementById("update_status").value = "";
      // set headline db
      const url = BACKEND_URL + "/headline";
      const options = {
        method: "PUT",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          headline: text,
        }),
      };
      await fetch(url, options).then((res) => {
        if (res.status === 400) {
          alert("Please send headline you want to update");
        }
      });
      // set headline status web
      setStatus(text);

      // setStatus(text);
      // localStorage.setItem("headline", text);
    }
  };

  const fetchHeadline = async () => {
    // get headline
    let headline = "";
    const url = BACKEND_URL + "/headline/" + username;

    await axios
      .get(url, { withCredentials: true })
      .then((res) => {
        headline = res.data.headline;
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    // const options = {
    //   method: "GET",
    //   credentials: "include",
    // };
    // await fetch(url, options)
    //   .then((res) => console.log(res))
    //   .then((res) => {
    //     console.log(res);
    //     headline = res.headline;
    //   })
    //   .catch((error) => {
    //     console.error("Error:", error);
    //   });

    // set headline web
    setStatus(headline);
  };

  useEffect(() => {
    fetchHeadline();
  }, []);

  return (
    <>
      <div className="m-5 p-1 md:p-6 flex flex-col bg-white rounded-lg shadow">
        <div className="flex items-center">
          <img className="m-3 h-16 w-16 rounded-full" src={avatarLink} alt="" />
          <p className="m-4 font-bold">{username}</p>
        </div>
        <h3
          className="p-4 text-lg font-normal text-gray-900 "
          data-testid="statusText"
        >
          {status}
        </h3>
        <div className="flex items-center px-4 pb-4">
          <input
            type="text"
            name="update_status"
            id="update_status"
            data-testid="update_status"
            className="flex-1 mr-1 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
          />
          <button
            data-testid="updateStatusBtn"
            onClick={handleStatusChange}
            className="flex-none ml-1 w-16 h-8 text-white bg-blue-300 hover:bg-blue-400 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-xs p-2 text-center "
          >
            Update
          </button>
        </div>
      </div>
    </>
  );
};

export default Status;
