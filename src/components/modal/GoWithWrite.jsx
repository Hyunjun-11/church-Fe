import React, { useEffect, useRef, useState } from "react";
import ReactModal from "react-modal";
import styled from "styled-components";
import api from "../../api/api";

ReactModal.setAppElement("#root");

const GoWithWrite = ({ isOpen, onRequestClose }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const titleRef = useRef(null);
  const contentRef = useRef(null);
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
      resetForm(); // 모달이 닫힐 때 폼을 초기화
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  const resetForm = () => {
    setTitle("");
    setContent("");
  };

  const handleSubmit = async () => {
    if (title.trim() === "") {
      alert("제목을 입력해주세요.");
      titleRef.current.focus();
      return;
    }
    if (content.trim() === "") {
      alert("내용을 입력해주세요.");
      contentRef.current.focus();
      return;
    }

    //   if (isEditing) {
    //     // 수정 모드일 경우 PUT 요청
    //     await api.put(`board/${id}`, {
    //       title,
    //       author,
    //       content,
    //       category: upperCategory,
    //     });
    //     alert("게시글이 수정되었습니다.");
    //   } else {
    // 새 글 작성 모드일 경우 POST 요청
    await api.post(`board/`, {
      title,
      content,
      category: "GOWITH",
    });
    alert("게시글이 작성되었습니다.");
    onRequestClose();
  };

  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={modalStyles}>
      <ModalContent>
        <h2>글쓰기</h2>
        <Form onSubmit={handleSubmit}>
          <Input
            type="text"
            placeholder="제목을 입력하세요"
            value={title}
            ref={titleRef}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <Textarea
            placeholder="내용을 입력하세요"
            value={content}
            ref={contentRef}
            onChange={(e) => setContent(e.target.value)}
            required
          />
          <ButtonContainer>
            <Button type="button" onClick={onRequestClose} cancel>
              취소
            </Button>
            <Button type="submit">작성</Button>
          </ButtonContainer>
        </Form>
      </ModalContent>
    </ReactModal>
  );
};

export default GoWithWrite;

// Styled-components for styling
const modalStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    transform: "translate(-50%, -50%)",
    border: "none",
    borderRadius: "10px",
    padding: "0",
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
    maxWidth: "400px",
    width: "80%",
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
};

const ModalContent = styled.div`
  padding: 20px;
  background: #fff;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Input = styled.input`
  padding: 12px;
  margin-bottom: 15px;
  font-size: 16px;
  width: 100%;
  box-sizing: border-box;
  border: 1px solid #ddd;
  border-radius: 8px;
  outline: none;
  transition: border-color 0.2s;

  &:focus {
    border-color: #007bff;
  }
`;

const Textarea = styled.textarea`
  padding: 12px;
  margin-bottom: 15px;
  font-size: 16px;
  width: 100%;
  height: 200px;
  box-sizing: border-box;
  border: 1px solid #ddd;
  border-radius: 8px;
  outline: none;
  resize: none;
  transition: border-color 0.2s;

  &:focus {
    border-color: #007bff;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`;

const Button = styled.button`
  padding: 12px 20px;
  font-size: 16px;
  cursor: pointer;
  border: none;
  border-radius: 8px;
  background-color: ${(props) => (props.cancel ? "#dc3545" : "#007bff")};
  color: white;
  transition: background-color 0.3s;

  &:hover {
    background-color: ${(props) => (props.cancel ? "#c82333" : "#0056b3")};
  }

  &:first-child {
    background-color: #28a745;

    &:hover {
      background-color: #218838;
    }
  }
`;
