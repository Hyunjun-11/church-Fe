import React, { useState, useCallback, useMemo, useEffect } from "react";
import axios from 'axios';
import useHolidayFetcher from "../../../hooks/useHolidayFetcher";
import CalendarComponent from "../../common/calendar/CalendarComponent";
import EventModal from "../../modal/EventModal";
import CalInfoModal from "../../modal/CalInfoModal";
import BodyTitle from "../../common/BodyTitle";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

const CalTest = () => {
  const initialDate = new Date();
  const { holidays, loading, handleNavigate } = useHolidayFetcher(initialDate);

  const [events, setEvents] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [infoModalIsOpen, setInfoModalIsOpen] = useState(false);
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);
  const [eventTitle, setEventTitle] = useState("");
  const [eventContent, setEventContent] = useState("");
  const [eventColor, setEventColor] = useState("lightblue");
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_REACT_APP_API_URL}/api/calendar/`);
        const fetchedEvents = response.data.data.map(event => {
          const { startTime, endTime, ...item } = event;
          return {
            ...item,
            start: new Date(startTime),
            end: new Date(endTime)
          };
        });
        setEvents(fetchedEvents);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };
    fetchEvents();
  }, []);

  const handleEventDrop = useCallback(
    async ({ event, start, end }) => {
      const updatedEvent = { ...event, start, end };
      setEvents((prevEvents) =>
        prevEvents.map((e) => (e.id === event.id ? updatedEvent : e))
      );

      try {
        await axios.put(`${import.meta.env.VITE_REACT_APP_API_URL}/api/calendar/${event.id}`, {
          ...updatedEvent,
          startTime: start,
          endTime: end
        });
      } catch (error) {
        console.error("Error updating event on drop:", error);
        setEvents((prevEvents) =>
          prevEvents.map((e) => (e.id === event.id ? event : e))
        );
      }
    },
    []
  );

  const handleEventResize = useCallback(
    async ({ event, start, end }) => {
      const updatedEvent = { ...event, start, end };
      setEvents((prevEvents) =>
        prevEvents.map((e) => (e.id === event.id ? updatedEvent : e))
      );

      try {
        await axios.put(`${import.meta.env.VITE_REACT_APP_API_URL}/api/calendar/${event.id}`, {
          ...updatedEvent,
          startTime: start,
          endTime: end
        });
      } catch (error) {
        console.error("Error updating event on resize:", error);
        setEvents((prevEvents) =>
          prevEvents.map((e) => (e.id === event.id ? event : e))
        );
      }
    },
    []
  );

  const openModal = useCallback((start, end) => {
    setSelectedStartDate(start);
    setSelectedEndDate(end);
    setModalIsOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setModalIsOpen(false);
    setSelectedStartDate(null);
    setSelectedEndDate(null);
    setEventTitle("");
    setEventContent("");
    setEventColor("lightblue");
    setIsEditMode(false);
    setSelectedEvent(null);
  }, []);

  const handleSubmit = useCallback(
    async (event) => {
      event.preventDefault();
      if (!eventTitle) {
        alert("일정을 입력해주세요");
        return;
      }
      const newEvent = {
        title: eventTitle,
        content: eventContent,
        startTime: selectedStartDate,
        endTime: selectedEndDate,
        color: eventColor,
      };
      try {
        const response = await axios.post(`${import.meta.env.VITE_REACT_APP_API_URL}/api/calendar/`, newEvent);
        const { id, startTime, endTime, ...rest } = response.data.data;
        const formattedEvent = {
          ...rest,
          id,
          start: new Date(startTime),
          end: new Date(endTime),
        };
        setEvents((prevEvents) => [
          ...prevEvents,
          formattedEvent
        ]);
      } catch (error) {
        console.error("Error adding event:", error);
      }
      closeModal();
    },
    [eventTitle, eventContent, selectedStartDate, selectedEndDate, eventColor, closeModal]
  );

  const handleEditSubmit = useCallback(
    async (event) => {
      event.preventDefault();
      if (!eventTitle) {
        alert("일정을 입력해주세요");
        return;
      }
      if (selectedEvent) {
        const updatedEvent = {
          ...selectedEvent,
          title: eventTitle,
          content: eventContent,
          startTime: selectedStartDate,
          endTime: selectedEndDate,
          color: eventColor,
        };
        try {
          await axios.put(`${import.meta.env.VITE_REACT_APP_API_URL}/api/calendar/${selectedEvent.id}`, updatedEvent);
          setEvents((prevEvents) =>
            prevEvents.map((e) => (e.id === selectedEvent.id ? {
              ...updatedEvent,
              start: new Date(updatedEvent.startTime),
              end: new Date(updatedEvent.endTime)
            } : e))
          );
        } catch (error) {
          console.error("Error updating event:", error);
        }
        closeModal();
      } else {
        console.error("선택된 이벤트가 없습니다.");
      }
    },
    [eventTitle, eventContent, selectedStartDate, selectedEndDate, eventColor, selectedEvent, closeModal]
  );

  const handleSelectEvent = useCallback((event) => {
    if (event.type !== "holiday") {
      setSelectedEvent(event);
      setInfoModalIsOpen(true);
    }
  }, []);

  const closeInfoModal = useCallback(() => {
    setInfoModalIsOpen(false);
  }, []);

  const deleteEvent = useCallback(async () => {
    if (window.confirm("이 이벤트를 삭제하시겠습니까?")) {
      try {
        await axios.delete(`${import.meta.env.VITE_REACT_APP_API_URL}/api/calendar/${selectedEvent.id}`);
        setEvents((prevEvents) => prevEvents.filter((e) => e.id !== selectedEvent.id));
      } catch (error) {
        console.error("Error deleting event:", error);
      }
      closeInfoModal();
    }
  }, [selectedEvent, closeInfoModal]);

  const editEvent = useCallback(
    (event) => {
      const foundEvent = events.find((item) => String(item.id) === String(event.id));

      if (foundEvent) {
        setEventTitle(foundEvent.title);
        setEventContent(foundEvent.content);
        setSelectedStartDate(foundEvent.start);
        setSelectedEndDate(foundEvent.end);
        setEventColor(foundEvent.color);
        setIsEditMode(true);
        setModalIsOpen(true);
        setSelectedEvent(foundEvent);
        closeInfoModal();
      } else {
        console.error("이벤트를 찾을 수 없습니다.");
      }
    },
    [events, closeInfoModal]
  );

  const combinedEvents = useMemo(
    () =>
      Array.from(
        new Set(
          [...events, ...holidays].map((e) =>
            JSON.stringify({ ...e, start: e.start, end: e.end })
          )
        )
      ).map((e) => JSON.parse(e)),
    [events, holidays]
  );

  return (
    <div>
      <BodyTitle title={"함께섬기는 교회 일정"} />
      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
          <CircularProgress />
        </Box>
      ) : (
        <CalendarComponent
          onEventDrop={handleEventDrop}
          onEventResize={handleEventResize}
          events={combinedEvents}
          holidays={holidays}
          handleSelectSlot={({ start, end }) => openModal(start, end)}
          handleSelectEvent={handleSelectEvent}
          handleNavigate={handleNavigate}
        />
      )}

      <EventModal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        selectedStartDate={selectedStartDate}
        selectedEndDate={selectedEndDate}
        eventTitle={eventTitle}
        setEventTitle={setEventTitle}
        eventContent={eventContent}
        setEventContent={setEventContent}
        eventColor={eventColor}
        setEventColor={setEventColor}
        handleSubmit={isEditMode ? handleEditSubmit : handleSubmit}
      />
      <CalInfoModal
        isOpen={infoModalIsOpen}
        selectedEvent={selectedEvent}
        onDeleteEvent={deleteEvent}
        onEditEvent={() => editEvent(selectedEvent)}
        onRequestClose={closeInfoModal}
      />
    </div>
  );
};

export default CalTest;
