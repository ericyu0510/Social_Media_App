import React, { useState, useEffect } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { userlist } from "../userlist";
import axios from "axios";

const UserCard = ({
  BACKEND_URL,
  username,
  setFollowingUsers,
  posts,
  setPosts,
  setKeywordPosts,
}) => {
  // const allUsers = userlist;
  const [status, setStatus] = useState("");
  const [avatarLink, setAvatarLink] = useState("assets/avatars/avatar1.png");

  const getFollowingHeadline = async () => {
    let getFollowingHeadlineUrl = BACKEND_URL + "/headline/" + username;
    await axios
      .get(getFollowingHeadlineUrl, { withCredentials: true })
      .then((res) => {
        const headline = res.data.headline;
        setStatus(headline);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const getAvatar = async () => {
    const getAvatarUrl = BACKEND_URL + "/avatar/" + username;
    await axios
      .get(getAvatarUrl, { withCredentials: true })
      .then((res) => {
        if (res.data.avatar !== "") {
          setAvatarLink(res.data.avatar);
        } else {
          setAvatarLink("assets/avatars/avatar1.png");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  useEffect(() => {
    getFollowingHeadline();
    getAvatar();
  }, []);

  const handleUnfollow = async (e) => {
    const deletedUsername = username;
    const unfollowUrl = BACKEND_URL + "/following/" + deletedUsername;
    await axios
      .delete(unfollowUrl, { withCredentials: true })
      .then((res) => {
        const newFollowing = res.data.following;
        setFollowingUsers(newFollowing);
      })
      .catch((error) => {
        console.error("Error:", error);
      });

    // delete posts by deleted following user
    const updatedPosts = posts.filter((post) => {
      return post.author !== deletedUsername;
    });
    setPosts(updatedPosts);
  };

  return (
    <>
      <div className="m-4 p-2 md:p-4 flex flex-col bg-yellow-50 rounded-lg shadow">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <img
              className="m-3 h-12 w-12 md:h-14 md:w-14 rounded-full"
              src={avatarLink}
              alt=""
            />
            <p className="m-4 font-bold">{username}</p>
          </div>
        </div>
        <h3 className="p-4 text-lg font-normal text-gray-900 ">{status}</h3>
        <button
          data-testid="unfollowbtn"
          onClick={handleUnfollow}
          className="ml-1 w-6 h-6 self-end text-white bg-red-300 hover:bg-red-400 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-xs text-center "
        >
          <XMarkIcon className="h-5 w-5 " aria-hidden="true" />
        </button>
      </div>
    </>
  );
};

export default UserCard;
