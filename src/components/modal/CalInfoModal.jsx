import React from "react";
import ReactModal from "react-modal";
import { Button, Box, Typography, Container, CssBaseline, Divider } from "@mui/material";

const CalInfoModal = ({ isOpen, selectedEvent, onRequestClose, onEditEvent, onDeleteEvent }) => {
  const formatDateRange = (start, end) => {
    const startDate = new Date(start);
    const endDate = new Date(end);

    // Adjust end date by subtracting one day if start and end are not the same
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
          maxHeight: "80vh",
          padding: "20px",
          display: "flex",
          flexDirection: "column",
          borderRadius: "8px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
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
          <Typography component="h1" variant="h5" sx={{ mb: 2 }}>
            일정 상세
          </Typography>

          {selectedEvent && (
            <Box sx={{ mt: 1, width: "100%" }}>
              <Typography variant="h6" gutterBottom>
                제목
              </Typography>
              <Typography variant="body1" paragraph>
                {selectedEvent.title}
              </Typography>
              <Divider sx={{ my: 2 }} />
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <Typography variant="h6" sx={{ mr: 1 }}>
                  날짜
                </Typography>
                <Typography variant="body1" sx={{ alignSelf: "center" }}>
                  {formatDateRange(selectedEvent.start, selectedEvent.end)}
                </Typography>
              </Box>
              <Divider sx={{ my: 2 }} />
              <Typography variant="h6" gutterBottom>
                내용
              </Typography>
              <Box sx={{ maxHeight: "144px", overflowY: "auto", mb: 2, padding: "0 8px" }}>
                <Typography variant="body1" paragraph>
                  {selectedEvent.content}
                </Typography>
              </Box>
            </Box>
          )}

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
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
              sx={{ flex: 1 }}
            >
              수정
            </Button>
            <Button variant="outlined" color="secondary" onClick={() => onDeleteEvent(selectedEvent)} sx={{ flex: 1 }}>
              삭제
            </Button>
          </Box>
        </Box>
      </Container>
    </ReactModal>
  );
};

export default CalInfoModal;
