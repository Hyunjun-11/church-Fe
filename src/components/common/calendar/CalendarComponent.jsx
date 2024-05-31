import React, { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import CustomToolbar from "./CustomToolbar";
import "./CalendarComponent.css";
import ReactModal from "react-modal";

const localizer = momentLocalizer(moment);

const formats = {
  weekdayFormat: (date) => ["일", "월", "화", "수", "목", "금", "토"][date.getDay()],
  monthHeaderFormat: "YYYY년 MM월",
};

const eventStyleGetter = (event) => {
  let style = {
    borderRadius: "5px",
    opacity: 0.8,
    border: "0px",
    display: "block",
  };

  if (event.color) {
    style = {
      ...style,
      backgroundColor: event.color,
      color: "black",
    };
  } else if (event.type === "holiday") {
    style = {
      ...style,
      backgroundColor: "red",
      color: "white",
    };
  }

  return { style };
};

const CalendarComponent = ({
  events,
  holidays,
  handleSelectSlot,
  handleSelectEvent,
  handleNavigate,
  onEventDrop,
  onEventResize,
}) => {
  const [showMoreEvents, setShowMoreEvents] = useState(null);

  const handleShowMore = (events, date) => {
    setShowMoreEvents({ events, date });
  };

  const closeMoreEventsModal = () => {
    setShowMoreEvents(null);
  };

  const components = {
    month: {
      dateHeader: ({ date, label }) => {
        const day = date.getDay();
        const isHoliday = holidays.some((holiday) => moment(holiday.start).isSame(date, "day"));
        let style = {
          color: day === 0 || isHoliday ? "red" : "black",
        };
        if (day === 6) {
          style = {
            ...style,
            color: "blue",
          };
        }
        return <span style={style}>{label}</span>;
      },
    },
    toolbar: (toolbarProps) => <CustomToolbar {...toolbarProps} />,
  };

  return (
    <div style={{ height: "100%" }}>
      <Calendar
        localizer={localizer}
        views={["month"]}
        events={[...events]}
        startAccessor="start"
        endAccessor="end"
        selectable
        formats={formats}
        onSelectSlot={handleSelectSlot}
        onSelectEvent={handleSelectEvent}
        style={{ height: 700 }}
        onNavigate={handleNavigate}
        eventPropGetter={eventStyleGetter}
        components={components}
        onEventDrop={onEventDrop}
        resizable
        onEventResize={onEventResize}
        onShowMore={handleShowMore}
      />

      {showMoreEvents && (
        <ReactModal
          isOpen={!!showMoreEvents}
          onRequestClose={closeMoreEventsModal}
          contentLabel="More Events"
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
          <h2>{moment(showMoreEvents.date).format("YYYY년 MM월 DD일")}</h2>
          <ul>
            {showMoreEvents.events.map((event, index) => (
              <li key={index}>
                <strong>{event.title}</strong>: {event.content}
              </li>
            ))}
          </ul>
          <button onClick={closeMoreEventsModal}>닫기</button>
        </ReactModal>
      )}
    </div>
  );
};

export default CalendarComponent;
