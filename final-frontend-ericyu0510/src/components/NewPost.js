import React from "react";
import axios from "axios";

const NewPost = ({ BACKEND_URL, posts, setPosts }) => {
  const handleNewPost = async () => {
    // console.log(refContainerPostFile.current.files[0]);
    // console.log(document.getElementById("newpostfile").files[0]);
    const newPostTitleText = document.getElementById("newpost_title").value;
    const newPostText = document.getElementById("newpost").value;
    const newPostFile = document.getElementById("newpostfile").files[0];
    if (newPostTitleText !== "" && newPostText !== "") {
      // if correctly input title and text
      if (newPostFile) {
        // post with image
        const fd = new FormData();
        fd.append("text", newPostTitleText);
        fd.append("text", newPostText);
        fd.append("image", newPostFile);
        const Url = BACKEND_URL + "/articleImg";
        // await fetch(Url, {
        //   method: "POST",
        //   body: fd,
        //   credentials: "include",
        // })
        //   .then((res) => res.json())
        //   .then((res) => {
        //     const newPost = res.articles;
        //     setPosts([...posts, ...newPost]);
        //     console.log(posts);
        //   })
        //   .catch((err) => {
        //     console.log(err);
        //   });

        await axios({
          method: "post",
          url: Url,
          data: fd,
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        })
          .then((res) => {
            const newPost = res.data.articles;
            setPosts([...posts, ...newPost]);
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        // post without image
        const Url = BACKEND_URL + "/article";
        await axios
          .post(
            Url,
            { title: newPostTitleText, text: newPostText },
            { withCredentials: true }
          )
          .then((res) => {
            const newPost = res.data.articles;
            setPosts([...posts, ...newPost]);
          })
          .catch((err) => {
            console.log(err);
          });
      }
      document.getElementById("newpost_title").value = "";
      document.getElementById("newpost").value = "";
      document.getElementById("newpostfile").value = "";
    } else {
      // if missing either title or text, do nothing
      alert("missing title or text");
    }
  };

  return (
    <>
      <div className="m-5 px-6 py-8 flex flex-col bg-white rounded-lg shadow">
        <h2>Enter new post</h2>
        <input
          type="text"
          name="newpost_title"
          id="newpost_title"
          placeholder="Post Title"
          data-testid="newpost_title"
          className="flex-1 mr-1 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 mt-4"
        />
        <textarea
          name="newpost"
          data-testid="newpost"
          id="newpost"
          placeholder="Post Content"
          cols="30"
          rows="6"
          className="flex-1 mr-1 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 my-4"
        ></textarea>
        <input
          type="file"
          accept="image/*"
          name="newpostfile"
          id="newpostfile"
          className="block w-full text-sm text-slate-500 pb-4 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100"
        />
        <div className="flex">
          <button
            onClick={handleNewPost}
            className="flex-none ml-1 w-16 text-violet-700 bg-violet-50 hover:bg-violet-100 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-xs p-2 text-center "
          >
            Send
          </button>
          <button
            onClick={() => {
              document.getElementById("newpost_title").value = "";
              document.getElementById("newpost").value = "";
              document.getElementById("newpostfile").value = "";
            }}
            className="flex-none ml-1 w-16 text-violet-700 bg-violet-50 hover:bg-violet-100 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-xs p-2 text-center "
          >
            Clear
          </button>
        </div>
      </div>
    </>
  );
};

export default NewPost;
