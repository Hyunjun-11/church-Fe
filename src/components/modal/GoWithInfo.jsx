import React, { useEffect, useState } from "react";
import ReactModal from "react-modal";
import styled from "styled-components";
import api from "../../api/api";
import GoWithWrite from "./GoWithWrite";
import { useSelector } from "react-redux";

ReactModal.setAppElement("#root");

const GoWithInfo = ({ isOpen, onRequestClose, boardId }) => {
  const [detail, setDetail] = useState(null);
  const [isWriteModalOpen, setIsWriteModalOpen] = useState(false); // 상태 추가
  const user = useSelector((state) => state.user);

  useEffect(() => {
    const fetchDetail = async () => {
      if (boardId) {
        try {
          const response = await api.get(`board/${boardId}`);
          setDetail(response.data.data);
        } catch (error) {
          console.error("Error fetching detail:", error);
        }
      }
    };

    fetchDetail();
  }, [boardId]);

  if (!detail) {
    return null;
  }

  const openWriteModal = () => {
    if (detail.memberId === user.id) {
      setIsWriteModalOpen(true);
      onRequestClose();
    } else alert("작성자만 수정할 수 있습니다.");
  };
  const handleDeleteClick = async () => {
    if (detail.memberId === user.id) {
      const isConfirmed = window.confirm("게시글을 삭제하시겠습니까?");
      if (isConfirmed) {
        try {
          await api.delete(`board/${boardId}`);
          alert("게시글이 삭제되었습니다.");
          onRequestClose(); // 모달을 닫고 나중에 목록을 새로고침하는 등의 추가 동작이 필요할 수 있습니다.
        } catch (error) {
          console.error(error);
          alert("게시글 삭제에 실패했습니다.");
        }
      }
    } else {
      alert("작성자만 삭제할 수 있습니다.");
    }
  };
  const closeWriteModal = () => {
    setIsWriteModalOpen(false);
  };

  return (
    <>
      <ReactModal
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        style={modalStyles}
        closeTimeoutMS={100}>
        <ModalContent>
          <ModalHeader>
            <h2>{detail.title}</h2>
          </ModalHeader>
          <ContentWrapper>
            <UserInfo>
              <div>{detail.author}</div>
              <div>{new Date(detail.createAt).toLocaleString()}</div>
            </UserInfo>
            <Content>{detail.content}</Content>
          </ContentWrapper>
          {user && (
            <ButtonContainer>
              <Button type="button" onClick={openWriteModal}>
                수정
              </Button>
              <Button type="button" onClick={handleDeleteClick} cancel>
                삭제
              </Button>
            </ButtonContainer>
          )}
        </ModalContent>
      </ReactModal>
      <GoWithWrite
        isOpen={isWriteModalOpen}
        onRequestClose={closeWriteModal}
        boardId={boardId}
      />
    </>
  );
};

export default GoWithInfo;

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
  background: #ffffff;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  animation: fadeIn 0.3s ease-in-out;

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  border-bottom: 1px solid #e0e0e0;
  padding-bottom: 10px;
  margin-bottom: 20px;

  h2 {
    margin: 0;
    font-size: 1.5rem;
    color: #333;
  }
`;

const ContentWrapper = styled.div`
  flex-grow: 1;
  overflow-y: auto;
  width: 100%;
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  color: #666;
  width: 100%;
  align-items: flex-end;

  div:first-child {
    font-weight: bold;
  }

  div:last-child {
    font-size: 0.875rem;
    color: #999;
  }
`;

const Content = styled.div`
  min-height: 200px;
  margin-top: 20px;
  width: 100%;
  text-align: start;
  color: #333;
  line-height: 1.6;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  width: 100%;
`;

const Button = styled.button`
  padding: 12px 20px;
  font-size: 16px;
  cursor: pointer;
  border: none;
  border-radius: 8px;
  background-color: ${(props) => (props.cancel ? "#ff6b6b" : "#4CAF50")};
  color: white;
  transition: background-color 0.3s;

  &:hover {
    background-color: ${(props) => (props.cancel ? "#ff4d4d" : "#45a049")};
  }
`;
