import React from "react";
import ReactModal from "react-modal";
import styled from "styled-components";

const CalInfoModal = ({
  isOpen,
  selectedEvent,
  onRequestClose,
  onEditEvent,
  onDeleteEvent,
  readOnly,
}) => {
  const formatDateRange = (start, end) => {
    const startDate = new Date(start);
    const endDate = new Date(end);

    if (startDate.getTime() !== endDate.getTime()) {
      endDate.setDate(endDate.getDate() - 1);
    }

    const startDateString = startDate.toLocaleDateString();
    const endDateString = endDate.toLocaleDateString();

    return startDateString === endDateString
      ? startDateString
      : `${startDateString} ~ ${endDateString}`;
  };

  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Event Details"
      style={{
        overlay: {
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          zIndex: 10,
        },
        content: {
          top: "50%",
          left: "50%",
          right: "auto",
          bottom: "auto",
          transform: "translate(-50%, -50%)",
          width: "400px",
          padding: "20px",
          border: "none",
          borderRadius: "8px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          background: "#fff",
        },
      }}>
      <Container>
        <Label>제목</Label>
        <Content>{selectedEvent?.title}</Content>
        <Label>날짜</Label>
        <Content>
          {selectedEvent &&
            formatDateRange(selectedEvent.start, selectedEvent.end)}
        </Content>
        <Label>내용</Label>
        <Content>{selectedEvent?.content}</Content>
        <ButtonContainer>
          {readOnly ? (
            <>
              <Button onClick={() => onEditEvent(selectedEvent)}>수정</Button>
              <Button onClick={() => onDeleteEvent(selectedEvent)} secondary>
                삭제
              </Button>
            </>
          ) : (
            <Button onClick={onRequestClose}>닫기</Button>
          )}
        </ButtonContainer>
      </Container>
    </ReactModal>
  );
};

export default CalInfoModal;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Label = styled.div`
  font-weight: bold;
  margin-bottom: 5px;
`;

const Content = styled.div`
  background: #f0f2f5;
  padding: 10px;
  border-radius: 4px;
  margin-bottom: 10px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 10px;
`;

const Button = styled.button`
  background: ${(props) => (props.secondary ? "#f44336" : "#007bff")};
  color: white;
  border: none;
  padding: 10px;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  transition: background 0.3s;
  flex: 1;

  &:hover {
    background: ${(props) => (props.secondary ? "#d32f2f" : "#0056b3")};
  }
`;
