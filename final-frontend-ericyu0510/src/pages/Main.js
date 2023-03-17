import React, { useState, useEffect } from "react";
import Status from "../components/Status";
import NewPost from "../components/NewPost";
import Post from "../components/Post";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import SearchBar from "../components/SearchBar";
import Pagination from "../components/Pagination";
import { userlist } from "../userlist";
import { postlist } from "../postlist";
import axios from "axios";

const Main = ({ BACKEND_URL }) => {
  const avatar_link = [
    "assets/avatars/avatar1.png",
    "assets/avatars/avatar2.png",
    "assets/avatars/avatar3.png",
    "assets/avatars/avatar4.png",
    "assets/avatars/avatar5.png",
    "assets/avatars/avatar6.png",
    "assets/avatars/avatar7.png",
    "assets/avatars/avatar8.png",
    "assets/avatars/avatar9.png",
    "assets/avatars/avatar10.png",
    "assets/avatars/avatar11.png",
  ];

  const image_link = [
    "assets/images/img1.jpg",
    "assets/images/img2.jpg",
    "assets/images/img3.jpg",
    "assets/images/img4.jpg",
    "assets/images/img5.jpg",
    "assets/images/img6.jpg",
    "assets/images/img7.jpg",
    "assets/images/img8.jpg",
    "assets/images/img9.jpg",
    "assets/images/img10.jpg",
    "assets/images/img11.jpg",
  ];

  const login_user = parseInt(localStorage.current_userId);
  const login_username = localStorage.current_user;

  // try get follower
  const [followingUsers, setFollowingUsers] = useState([]);

  const [posts, setPosts] = useState([]);
  // const [searchKeyword, setSearchKeyword] = useState("");
  const [keywordPosts, setKeywordPosts] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);

  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = keywordPosts
    .sort((a, b) => (a.date > b.date ? 1 : b.date > a.date ? -1 : 0))
    .reverse()
    .slice(indexOfFirstPost, indexOfLastPost);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const [avatarLink, setAvatarLink] = useState("assets/avatars/avatar1.png");

  const getFollowing = async () => {
    let getFollowingUrl = BACKEND_URL + "/following";
    await axios
      .get(getFollowingUrl, { withCredentials: true })
      .then((res) => {
        const following = res.data.following;
        setFollowingUsers(following);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  // end try get follower

  // try get articles
  const getPosts = async () => {
    const getPostsUrl = BACKEND_URL + "/articles";
    await axios
      .get(getPostsUrl, { withCredentials: true })
      .then((res) => {
        setPosts(res.data.articles);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  // end try get articles

  const getAvatar = async () => {
    const getAvatarUrl = BACKEND_URL + "/avatar/" + login_username;
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
    getFollowing();
    getPosts();
    getAvatar();
  }, []);

  const [searchKeyword, setSearchKeyword] = useState("");

  const handleSearch = () => {
    if (searchKeyword === "") {
      setKeywordPosts(posts);
    } else {
      let res = [];
      for (let i = 0; i < posts.length; i++) {
        // if searchKeyword matches content of a post or the username, show it
        if (
          posts[i].text.search(searchKeyword) !== -1 ||
          posts[i].author === searchKeyword
        ) {
          res.push(posts[i]);
        }
      }
      setKeywordPosts(res);
    }
  };

  useEffect(() => {
    handleSearch();
  }, [searchKeyword, posts]);

  return (
    <>
      <Navbar BACKEND_URL={BACKEND_URL} avatarLink={avatarLink} />
      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 justify-center bg-gray-50">
        <div className="flex flex-col w-full md:w-1/3 self-center md:self-start">
          <Status
            BACKEND_URL={BACKEND_URL}
            avatarLink={avatarLink}
            username={localStorage.current_user}
          />
          <Sidebar
            BACKEND_URL={BACKEND_URL}
            followingUsers={followingUsers} // test V
            setFollowingUsers={setFollowingUsers} //test V
            posts={posts}
            setPosts={setPosts}
            setKeywordPosts={setKeywordPosts}
          />
        </div>
        <div className="w-full md:w-1/2 self-center md:self-start">
          <NewPost
            BACKEND_URL={BACKEND_URL}
            posts={posts}
            setPosts={setPosts}
          />
          <SearchBar
            searchKeyword={searchKeyword}
            setSearchKeyword={setSearchKeyword}
          />
          <div data-testid="postDiv">
            {currentPosts
              .sort((a, b) => (a.date > b.date ? 1 : b.date > a.date ? -1 : 0))
              .reverse()
              .map((post) => {
                return (
                  <Post
                    BACKEND_URL={BACKEND_URL}
                    key={post.pid}
                    pid={post.pid}
                    username={post.author}
                    img_link={post.img ? post.img : "assets/images/img1.jpg"}
                    title={post.title}
                    timestamp={post.date
                      .slice(0, 19)
                      .replace(/-/g, "/")
                      .replace("T", " ")}
                    text={post.text}
                    posts={posts}
                    setPosts={setPosts}
                  />
                );
              })}
          </div>

          <Pagination
            postsPerPage={postsPerPage}
            totalPosts={keywordPosts.length}
            paginate={paginate}
          />
        </div>
      </div>
    </>
  );
};

export default Main;
