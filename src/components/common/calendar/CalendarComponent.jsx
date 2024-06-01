import React, { useState } from "react";
import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import CustomToolbar from "./CustomToolbar";
import "./CalendarComponent.css";
import ReactModal from "react-modal";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";

const localizer = momentLocalizer(moment);
const DragAndDropCalendar = withDragAndDrop(Calendar);
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
      <DragAndDropCalendar
        localizer={localizer}
        defaultView={Views.MONTH}
        events={events}
        selectable
        formats={formats}
        onSelectSlot={handleSelectSlot}
        onSelectEvent={handleSelectEvent}
        style={{ height: 700 }}
        onNavigate={handleNavigate}
        eventPropGetter={eventStyleGetter}
        components={components}
        onEventDrop={onEventDrop}
        onEventResize={onEventResize}
        resizable
        onShowMore={handleShowMore}
        draggableAccessor={(event) => true}
      />
    </div>
  );
};

export default CalendarComponent;
