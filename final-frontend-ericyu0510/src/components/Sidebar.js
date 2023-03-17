import React from "react";
import UserCard from "./UserCard";
import { useState } from "react";
import axios from "axios";

const Sidebar = ({
  BACKEND_URL,
  followingUsers, //test
  setFollowingUsers, //test
  posts,
  setPosts,
  setKeywordPosts,
}) => {
  const [addFollowerError, setAddFollowerError] = useState(false);
  const [addFollowerErrorMsg, setAddFollowerErrorMsg] = useState("");

  const handleAddFollow = async () => {
    const add_follow_input = document.getElementById("add_follow").value;
    document.getElementById("add_follow").value = "";
    if (add_follow_input === "") {
      setAddFollowerError(false);
      setAddFollowerErrorMsg("");
    } else if (followingUsers.includes(add_follow_input)) {
      setAddFollowerError(true);
      setAddFollowerErrorMsg("The user is already your friend.");
    } else if (add_follow_input === localStorage.current_user) {
      setAddFollowerError(true);
      setAddFollowerErrorMsg("You cannot add yourself as friend.");
    } else {
      const addFollowingUrl = BACKEND_URL + "/following/" + add_follow_input;

      await axios
        .put(addFollowingUrl, {}, { withCredentials: true })
        .then((res) => {
          // success 200
          setAddFollowerError(false);
          const newFollowing = res.data.following;
          setFollowingUsers(newFollowing);
        })
        .catch((error) => {
          if (error.response.data === "Username does not exist.") {
            // 401
            setAddFollowerError(true);
            setAddFollowerErrorMsg("Username does not exist.");
          } else if (
            error.response.data === "Cannot add a user you've already followed."
          ) {
            // 401
            setAddFollowerError(true);
            setAddFollowerErrorMsg(
              "Cannot add a user you've already followed."
            );
          } else {
            setAddFollowerError(true);
            setAddFollowerErrorMsg("Something wrong.");
          }
        });

      // update posts (add newly added user's posts to feed)
      const getPostsUrl = BACKEND_URL + "/articles/" + add_follow_input;
      await axios
        .get(getPostsUrl, { withCredentials: true })
        .then((res) => {
          const addedUserPosts = res.data.articles;
          setPosts([...posts, ...addedUserPosts]);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  };

  return (
    <>
      <div className="flex items-center px-4">
        <input
          type="text"
          name="add_follow"
          id="add_follow"
          data-testid="add_follow"
          placeholder="Add Username"
          className="flex-1 mr-1 bg-yellow-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
        />
        <button
          onClick={handleAddFollow}
          data-testid="addfollowbtn"
          className="flex-none ml-1 w-16 h-8 text-white bg-blue-300 hover:bg-blue-400 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-xs p-2 text-center "
        >
          Add
        </button>
      </div>
      <div>
        {addFollowerError ? (
          <p
            id="addFollowerErrMsg"
            className="text-sm bg-red-100 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 p-2 mx-5 my-1"
          >
            {addFollowerErrorMsg}
          </p>
        ) : null}
      </div>
      <div id="followedUsers" data-testid="followedUsers">
        {followingUsers.map((following_user) => {
          return (
            <UserCard
              BACKEND_URL={BACKEND_URL}
              key={following_user}
              username={following_user}
              setFollowingUsers={setFollowingUsers} //test
              posts={posts}
              setPosts={setPosts}
              setKeywordPosts={setKeywordPosts}
            />
          );
        })}
      </div>
    </>
  );
};

export default Sidebar;
