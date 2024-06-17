// LoginForm.jsx
import React, { useState } from "react";
import PopupModal from "../../../components/modal/PopupModal";

const Login = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <button> Open Login Modal</button>
      <PopupModal isOpen={isModalOpen} onRequestClose={closeModal} />
    </>
  );
};

export default Login;
