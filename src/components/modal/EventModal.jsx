import React from "react";
import ReactModal from "react-modal";
import styled from "styled-components";

const EventModal = ({
  isOpen,
  onRequestClose,
  selectedStartDate,
  selectedEndDate,
  eventTitle,
  setEventTitle,
  eventContent,
  setEventContent,
  eventColor,
  setEventColor,
  handleSubmit,
}) => {
  const colors = ["lightblue", "lightgreen", "lightpink", "lightsalmon"];

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
      contentLabel="Event Modal"
      style={{
        overlay: {
          backgroundColor: "rgba(0, 0, 0, 0.75)",
          zIndex: "10",
        },
        content: {
          top: "50%",
          left: "50%",
          right: "auto",
          bottom: "auto",
          transform: "translate(-50%, -50%)",
          width: "400px",
          height: "auto",
          padding: "20px",
          background: "#fff",
          borderRadius: "8px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        },
      }}>
      <FormContainer>
        <Title>
          {selectedStartDate
            ? formatDateRange(selectedStartDate, selectedEndDate)
            : ""}
        </Title>
        <Form onSubmit={handleSubmit} noValidate>
          <Input
            type="text"
            placeholder="제목"
            value={eventTitle}
            onChange={(e) => setEventTitle(e.target.value)}
            required
          />
          <Textarea
            placeholder="내용"
            value={eventContent}
            onChange={(e) => setEventContent(e.target.value)}
            rows={3}
          />
          <ColorContainer>
            {colors.map((color) => (
              <ColorCircle
                key={color}
                color={color}
                selected={eventColor === color}
                onClick={() => setEventColor(color)}
              />
            ))}
          </ColorContainer>
          <ButtonContainer>
            <Button type="button" onClick={onRequestClose} secondary>
              취소
            </Button>
            <Button type="submit">등록</Button>
          </ButtonContainer>
        </Form>
      </FormContainer>
    </ReactModal>
  );
};

export default EventModal;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Title = styled.h1`
  text-align: center;
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Input = styled.input`
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-bottom: 10px;

  &:focus {
    border-color: #007bff;
    outline: none;
  }
`;

const Textarea = styled.textarea`
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-bottom: 10px;
  resize: none;
  min-height: 130px;

  &:focus {
    border-color: #007bff;
    outline: none;
  }
`;

const ColorContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 10px;
`;

const ColorCircle = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  margin: 0 5px;
  cursor: pointer;
  border: ${(props) => (props.selected ? "2px solid black" : "none")};
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 10px;
`;

const Button = styled.button`
  padding: 10px;
  font-size: 16px;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  flex: 1;
  background: ${(props) => (props.secondary ? "#EEE" : "#007bff")};
  color: ${(props) => (props.secondary ? "black" : "white")};

  &:hover {
    background: ${(props) => (props.secondary ? "#d3d3d3" : "#0056b3")};
  }
`;
