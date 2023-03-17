import React, { useState, useEffect } from "react";
import UpdateProfileForm from "../components/UpdateProfileForm";
import Modal from "../components/Modal";
import Navbar from "../components/Navbar";
import axios from "axios";

const Profile = ({ BACKEND_URL }) => {
  let [isOpen, setIsOpen] = useState(false);
  const [avatarLink, setAvatarLink] = useState("assets/avatars/avatar1.png");
  const login_username = localStorage.current_user;

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
    getAvatar();
  }, []);

  return (
    <>
      <Navbar BACKEND_URL={BACKEND_URL} avatarLink={avatarLink} />
      <UpdateProfileForm
        BACKEND_URL={BACKEND_URL}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        avatarLink={avatarLink}
        setAvatarLink={setAvatarLink}
      />
      <Modal isOpen={isOpen} setIsOpen={setIsOpen} />;
    </>
  );
};

export default Profile;
