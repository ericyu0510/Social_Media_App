import React from "react";
import {
  PencilSquareIcon,
  XMarkIcon,
  ChatBubbleBottomCenterTextIcon,
} from "@heroicons/react/24/outline";
import axios from "axios";

const Post = ({
  BACKEND_URL,
  pid,
  username,
  img_link,
  title,
  timestamp,
  text,
  posts,
  setPosts,
}) => {
  const login_username = localStorage.current_user;
  const [showComments, setShowComments] = React.useState(false);
  const [showEdit, setShowEdit] = React.useState(false);
  const commentsToggle = () => {
    setShowComments(!showComments);
  };

  const showEditBox = () => {
    if (showEdit === false) {
      setShowEdit(!showEdit);
      // document.getElementById("editpost").value = text;
    } else {
      setShowEdit(!showEdit);
    }
  };

  const handleEditPost = async () => {
    if (showEdit === true) {
      const editUrl = BACKEND_URL + "/articles/" + pid;
      const newText = document.getElementById("editpost").value;
      if (newText !== "") {
        await axios
          .put(editUrl, { text: newText }, { withCredentials: true })
          .then((res) => {
            // update article text in local state so that we can render correctly
            const updatedPostList = posts.filter((post) => {
              return post.pid === pid;
            });
            const otherPosts = posts.filter((post) => {
              return post.pid !== pid;
            });

            let updatedPost = updatedPostList[0];
            updatedPost.text = newText;
            setPosts([updatedPost, ...otherPosts]);
          })
          .catch((error) => {
            console.error("Error:", error);
          });
      }
      document.getElementById("editpost").value = "";
      setShowEdit(false);
    }
  };

  return (
    <div className="m-5 px-6 py-8 flex flex-col bg-white rounded-lg shadow">
      <div className="flex items-center justify-between m-2 w-3/4 md:w-2/3 self-center">
        <p className="font-bold text-md">{username}</p>
        <p className=" text-xs md:text-sm w-3/4 md:w-2/3 m-2 self-center">
          {timestamp}
        </p>
        <button
          type="button"
          onClick={showEditBox}
          className="rounded-full p-1 text-gray-400 hover:text-gray-600 "
        >
          {username === login_username ? (
            showEdit ? (
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            ) : (
              <PencilSquareIcon className="h-6 w-6" aria-hidden="true" />
            )
          ) : null}
        </button>
      </div>
      <p className=" text-xs font-bold md:text-sm w-3/4 md:w-2/3 m-2 self-center">
        {title}
      </p>
      {showEdit ? null : (
        <p className=" text-xs md:text-sm w-3/4 md:w-2/3 m-2 self-center">
          {text}
        </p>
      )}

      {username === login_username ? (
        showEdit ? (
          <textarea
            name="editpost"
            data-testid="editpost"
            id="editpost"
            cols="30"
            rows="6"
            placeholder={text}
            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 w-3/4 md:w-2/3 p-2.5 my-4 self-center"
          ></textarea>
        ) : null
      ) : null}

      {/* {showEdit ? (
        <textarea
          name="editpost"
          data-testid="editpost"
          id="editpost"
          cols="30"
          rows="6"
          placeholder={text}
          className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 w-3/4 md:w-2/3 p-2.5 my-4 self-center"
        ></textarea>
      ) : null} */}
      {username === login_username ? (
        showEdit ? (
          <button
            onClick={handleEditPost}
            className="ml-1 w-16 h-8 text-white bg-blue-300 hover:bg-blue-400 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-xs p-2 text-center self-center"
          >
            Update
          </button>
        ) : null
      ) : null}

      {/* {showEdit ? (
        <button
          onClick={handleEditPost}
          className="ml-1 w-16 h-8 text-white bg-blue-300 hover:bg-blue-400 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-xs p-2 text-center self-center"
        >
          Update
        </button>
      ) : null} */}

      <img
        src={img_link}
        alt=""
        className="h-64 w-64 md:h-96 md:w-96 object-cover rounded self-center m-6"
      />
      <button
        type="button"
        className="rounded-full p-1 text-gray-400 hover:text-gray-600 w-3/4 md:w-2/3 self-center"
        onClick={commentsToggle}
      >
        <ChatBubbleBottomCenterTextIcon
          className="h-6 w-6"
          aria-hidden="true"
        />
      </button>
      {showComments ? (
        <div className="flex-1 mr-1 w-10/12 sm:w-3/4 md:w-2/3 self-center bg-white border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 p-2.5 m-2">
          <p>this is comment 1</p>
          <p>this is comment 2</p>
        </div>
      ) : null}
    </div>
  );
};

export default Post;
