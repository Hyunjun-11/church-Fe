import React from "react";
import Modal from "react-modal";
import "./modalStyle.css";

const MyModal = ({ isOpen, closeModal }) => {
  return (
    <Modal isOpen={isOpen} onRequestClose={closeModal} className="custom-modal" overlayClassName="custom-modal-overlay">
      <div className="custom-modal-content">
        <h2>모달 제목</h2>
        <p>모달 내용</p>
      </div>
    </Modal>
  );
};

export default MyModal;
