import React, { useState, useCallback, useMemo } from "react";
import useHolidayFetcher from "../../../hooks/useHolidayFetcher";
import CalendarComponent from "../../common/calendar/CalendarComponent";
import EventModal from "../../modal/EventModal";
import CalInfoModal from "../../modal/CalInfoModal";
import BodyTitle from "../../common/BodyTitle";

const CalTest = () => {
  const initialDate = new Date();
  const { currentYear, currentMonth, holidays, handleNavigate } = useHolidayFetcher(initialDate);

  const [events, setEvents] = useState([
    {
      id: 1,
      title: "오늘일정",
      content: "content1",
      start: new Date(2024, 5, 20, 10, 0),
      end: new Date(2024, 5, 22, 12, 0),
      color: "lightblue",
    },
    {
      id: 2,
      title: "수정테스트",
      content: "content2",
      start: new Date(2024, 5, 21, 12, 0),
      end: new Date(2024, 5, 27, 13, 0),
      color: "lightgreen",
    },
  ]);

  const handleEventDrop = useCallback(
    ({ event, start, end }) => {
      const updatedEvents = events.map((e) => (e.id === event.id ? { ...e, start, end } : e));
      setEvents(updatedEvents);
    },
    [events]
  );

  const handleEventResize = useCallback(
    ({ event, start, end }) => {
      const updatedEvents = events.map((e) => (e.id === event.id ? { ...e, start, end } : e));
      setEvents(updatedEvents);
    },
    [events]
  );

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);
  const [eventTitle, setEventTitle] = useState("");
  const [eventContent, setEventContent] = useState("");
  const [eventColor, setEventColor] = useState("lightblue");
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [infoModalIsOpen, setInfoModalIsOpen] = useState(false);

  const handleSelectSlot = useCallback(({ start, end }) => {
    openModal(start, end);
  }, []);

  const openModal = (start, end) => {
    setSelectedStartDate(start);
    setSelectedEndDate(end);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedStartDate(null);
    setSelectedEndDate(null);
    setEventTitle("");
    setEventContent("");
    setEventColor("lightblue");
    setIsEditMode(false);
    setSelectedEvent(null);
  };

  const handleSubmit = useCallback(
    (event) => {
      event.preventDefault();
      if (!eventTitle) {
        alert("일정을 입력해주세요");
        return;
      }
      const newEvent = {
        id: events.length ? events[events.length - 1].id + 1 : 1,
        title: eventTitle,
        content: eventContent,
        start: selectedStartDate,
        end: selectedEndDate,
        color: eventColor,
      };
      setEvents((prevEvents) => [...prevEvents, newEvent]);
      closeModal();
    },
    [eventTitle, eventContent, selectedStartDate, selectedEndDate, eventColor, events]
  );

  const handleEditSubmit = useCallback(
    (event) => {
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
          start: selectedStartDate,
          end: selectedEndDate,
          color: eventColor,
        };
        const updatedEvents = events.map((e) => (e.id === selectedEvent.id ? updatedEvent : e));
        setEvents(updatedEvents);
        closeModal();
      } else {
        console.error("선택된 이벤트가 없습니다.");
      }
    },
    [eventTitle, eventContent, selectedStartDate, selectedEndDate, eventColor, selectedEvent, events]
  );

  const handleSelectEvent = useCallback((event) => {
    // 이벤트가 홀리데이가 아닌 경우에만 정보 모달을 엽니다.
    if (event.type !== "holiday") {
      openInfoModal(event);
    }
  }, []);

  const openInfoModal = (event) => {
    setSelectedEvent(event);
    setInfoModalIsOpen(true);
  };

  const closeInfoModal = () => {
    setInfoModalIsOpen(false);
  };

  const deleteEvent = useCallback(() => {
    if (window.confirm("이 이벤트를 삭제하시겠습니까?")) {
      setEvents((prevEvents) => prevEvents.filter((e) => e.id !== selectedEvent.id));
      closeInfoModal();
    }
  }, [selectedEvent]);

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
    [events]
  );

  const combinedEvents = useMemo(
    () =>
      Array.from(
        new Set(
          [...events, ...holidays].map((e) =>
            JSON.stringify({ ...e, start: new Date(e.start).toISOString(), end: new Date(e.end).toISOString() })
          )
        )
      ).map((e) => JSON.parse(e)),
    [events, holidays]
  );

  return (
    <div>
      <BodyTitle title={"함께섬기는 교회 일정"} />
      <CalendarComponent
        onEventDrop={handleEventDrop}
        onEventResize={handleEventResize}
        events={combinedEvents}
        holidays={holidays}
        handleSelectSlot={handleSelectSlot}
        handleSelectEvent={handleSelectEvent}
        handleNavigate={handleNavigate}
      />

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
