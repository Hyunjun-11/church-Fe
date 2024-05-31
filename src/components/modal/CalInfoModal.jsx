import React from "react";
import ReactModal from "react-modal";
import { Button, Box, Typography, Container, CssBaseline } from "@mui/material";

const CalInfoModal = ({ isOpen, selectedEvent, onRequestClose, onEditEvent, onDeleteEvent }) => (
  <ReactModal
    isOpen={isOpen}
    onRequestClose={onRequestClose}
    contentLabel="Event Details"
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
        maxHeight: "80vh",
        padding: "20px",
        display: "flex",
        flexDirection: "column",
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
          일정 상세
        </Typography>

        {selectedEvent && (
          <Box sx={{ mt: 3, flexGrow: 1, overflowY: "auto", width: "100%" }}>
            <Typography variant="body1">제목: {selectedEvent.title}</Typography>
            <Typography variant="body1">내용: {selectedEvent.content}</Typography>
            <Typography variant="body1">날짜: {new Date(selectedEvent.start).toLocaleDateString()}</Typography>
          </Box>
        )}

        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            gap: 2,
            width: "100%",
            pt: 3,
          }}
        >
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              onEditEvent(selectedEvent);
            }}
            sx={{ mb: 2 }}
          >
            수정
          </Button>
          <Button variant="outlined" color="primary" onClick={onDeleteEvent} sx={{ mb: 2 }}>
            삭제
          </Button>
        </Box>
      </Box>
    </Container>
  </ReactModal>
);

export default CalInfoModal;
