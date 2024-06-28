import React, { useEffect, useRef, useState } from "react";
import ReactModal from "react-modal";
import styled from "styled-components";
import api from "../../api/api";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

ReactModal.setAppElement("#root");

const GoWithWrite = ({ isOpen, onRequestClose, boardId }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState(""); // 수정 모드인지 여부를 판단하는 상태
  const [isEditing, setIsEditing] = useState(false); // 수정 모드인지 여부를 판단하는 상태
  const user = useSelector((state) => state.user);

  const titleRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    if (!user) return; // user가 없으면 반환

    if (boardId) {
      // 수정 모드일 경우 기존 데이터를 불러오기
      const fetchGowith = async () => {
        try {
          const response = await api.get(`board/${boardId}`);
          const { author, title, content } = response.data.data;
          setAuthor(author);
          setTitle(title);
          setContent(content);
          setIsEditing(true);
        } catch (error) {
          console.error(error);
        }
      };

      fetchGowith();
    } else {
      setAuthor(user.name); // 작성 모드일 경우 현재 로그인한 사용자의 이름을 작성자로 설정
    }
  }, [boardId, user]);

  const handleSubmit = async (e) => {
    e.preventDefault(); // 폼의 기본 제출 동작을 막음

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

    try {
      if (isEditing) {
        // 수정 모드일 경우 PUT 요청
        await api.put(`board/${boardId}`, {
          title,
          content,
          author,
          category: "GOWITH",
        });
        alert("게시글이 수정되었습니다.");
        onRequestClose();
      } else {
        // 새 글 작성 모드일 경우 POST 요청
        await api.post(`board/`, {
          title,
          content,
          category: "GOWITH",
        });
        alert("게시글이 작성되었습니다.");
        onRequestClose();
      }
    } catch (error) {
      console.error(error);
      alert("오류가 발생했습니다. 다시 시도해주세요.");
    }
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
            <Button type="submit">{isEditing ? "수정" : "제출"}</Button>
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
    borderRadius: "20px",
    padding: "0",
    boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.2)",
    maxWidth: "31rem",
    width: "80%",
    overflow: "hidden",
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    transition: "opacity 0.3s ",
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
    background-color: #ea4f4f;

    &:hover {
      background-color: #eb1d1d;
    }
  }
`;
