import React from "react";
import ReactModal from "react-modal";
import { TextField, Button, Box, Typography, Container, CssBaseline } from "@mui/material";

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

    return startDateString === endDateString ? startDateString : `${startDateString} ~ ${endDateString}`;
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
          marginRight: "-50%",
          transform: "translate(-50%, -50%)",
          width: "400px",
          height: "auto",
          padding: "20px",
        },
      }}
    >
      <CssBaseline />
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            {selectedStartDate ? formatDateRange(selectedStartDate, selectedEndDate) : ""}
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 3 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="title"
              label="제목"
              name="title"
              autoComplete="off"
              autoFocus
              value={eventTitle}
              onChange={(e) => setEventTitle(e.target.value)}
            />
            <TextField
              margin="normal"
              fullWidth
              id="content"
              label="내용"
              name="content"
              autoComplete="off"
              value={eventContent}
              onChange={(e) => setEventContent(e.target.value)}
            />
            <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
              {colors.map((color) => (
                <Box
                  key={color}
                  sx={{
                    width: 24,
                    height: 24,
                    borderRadius: "50%",
                    backgroundColor: color,
                    margin: 1,
                    cursor: "pointer",
                    border: eventColor === color ? "2px solid black" : "none",
                  }}
                  onClick={() => setEventColor(color)}
                />
              ))}
            </Box>
            <Button type="submit" fullWidth variant="contained" color="primary" sx={{ mt: 3, mb: 2 }}>
              등록
            </Button>
            <Button fullWidth variant="outlined" color="secondary" onClick={onRequestClose} sx={{ mb: 2 }}>
              취소
            </Button>
          </Box>
        </Box>
      </Container>
    </ReactModal>
  );
};

export default EventModal;
