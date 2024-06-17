import React, {
  useState,
  useCallback,
  useMemo,
  useEffect,
  useRef,
} from "react";
import axios from "axios";
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
  const readOnly = useRef(false);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_REACT_APP_API_URL}calendar/`
        );
        const fetchedEvents = response.data.data.map((event) => {
          const { startTime, endTime, ...item } = event;
          return {
            ...item,
            start: new Date(startTime),
            end: new Date(endTime),
          };
        });
        setEvents(fetchedEvents);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };
    fetchEvents();
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

  const handleSelectEvent = useCallback((event) => {
    if (event.type !== "holiday" || readOnly.current) {
      setSelectedEvent(event);
      setInfoModalIsOpen(true);
    }
  }, []);

  const closeInfoModal = useCallback(() => {
    setInfoModalIsOpen(false);
  }, []);

  const editEvent = useCallback(
    (event) => {
      const foundEvent = events.find(
        (item) => String(item.id) === String(event.id)
      );

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
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}>
          <CircularProgress />
        </Box>
      ) : (
        <CalendarComponent
          events={combinedEvents}
          holidays={holidays}
          handleSelectEvent={handleSelectEvent}
          handleNavigate={handleNavigate}
          readOnly={readOnly.current}
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
      />
      <CalInfoModal
        readOnly={readOnly.current}
        isOpen={infoModalIsOpen}
        selectedEvent={selectedEvent}
        onEditEvent={() => editEvent(selectedEvent)}
        onRequestClose={closeInfoModal}
      />
    </div>
  );
};

export default CalTest;
