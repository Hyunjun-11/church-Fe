import axios from "axios";
import moment from "moment";
import "moment/locale/ko";
import React, { useEffect, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./Cal.css";
import Toolbar from "./Toolbar";

moment.locale("ko");

const Cal = () => {
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth() + 1);
  const [events, setEvents] = useState([]);
  const [holidays, setHolidays] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);

  const mock = [
    {
      date: "2024-05-04",
      title: "첫번째 일정",
    },
    {
      date: "2024-05-09",
      title: "두번째 일정",
    },
    {
      date: "2024-05-14",
      title: "세번째 일정",
    },
    {
      date: "2024-05-28",
      title: "네번째 일정",
    },
  ];

  const fetchHolidays = async (year) => {
    try {
      const response = await axios.get(
        `https://apis.data.go.kr/B090041/openapi/service/SpcdeInfoService/getRestDeInfo?serviceKey=rioVHmZcE42QApn4%2FZZLSxawfsbDYgqJrVUW7WfF2YkrlbFvR943S9g4%2F8B%2FnW%2FfU3Lg6CmfXylobjmJqfQvAA%3D%3D&solYear=${year}&numOfRows=50`
      );

      const items = response.data.response.body.items.item;
      console.log(items);
      const formattedHolidays = items.map((item) => ({
        title: item.dateName,
        start: new Date(
          item.locdate.toString().substring(0, 4),
          parseInt(item.locdate.toString().substring(4, 6)) - 1,
          item.locdate.toString().substring(6, 8)
        ),
        end: new Date(
          item.locdate.toString().substring(0, 4),
          parseInt(item.locdate.toString().substring(4, 6)) - 1,
          item.locdate.toString().substring(6, 8)
        ),
        type: "holiday", // 휴일 이벤트에 type 속성 추가
      }));
      const eventsFromMock = mock.map((item) => ({
        title: item.title,
        start: new Date(item.date),
        end: new Date(item.date),
        type: "event", // 일반 이벤트에 type 속성 추가
      }));

      setEvents(eventsFromMock);
      setHolidays(formattedHolidays);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    fetchHolidays(currentYear);
  }, [currentYear]);

  useEffect(() => {
    const filteredEvents = events.filter((item) => {
      const startDate = moment(item.start);
      return startDate.month() === currentMonth - 1; // currentMonth가 1부터 시작하므로 1을 뺍니다.
    });
    setFilteredEvents(filteredEvents);
  }, [currentMonth, events]);

  const localizer = momentLocalizer(moment);

  const formats = {
    weekdayFormat: (date) => ["일", "월", "화", "수", "목", "금", "토"][date.getDay()],
    monthHeaderFormat: "YYYY년 MM월",
  };

  const components = {
    month: {
      dateHeader: ({ date, label }) => {
        const day = date.getDay();
        const isWeekend = day === 0 || day === 6;
        const isHoliday = holidays.some((holiday) => moment(holiday.start).isSame(date, "day"));
        const style = { color: isWeekend || isHoliday ? "red" : "black" };
        return <span style={style}>{label}</span>;
      },
    },
    toolbar: Toolbar,
    event: ({ event }) => (
      <span>
        <strong>{event.title}</strong>
      </span>
    ),
  };

  // eventStyleGetter 함수에서 type 속성을 기반으로 각각 다른 스타일을 적용
  const eventStyleGetter = (event) => {
    let style = {
      borderRadius: "5px",
      opacity: 0.8,
      border: "0px",
      display: "block",
    };

    if (event.type === "event") {
      style = {
        ...style,
        backgroundColor: "lightblue",
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

  return (
    <div className="Cal">
      <h1>일정표</h1>
      <Calendar
        localizer={localizer}
        events={[...events, ...holidays]}
        startAccessor="start"
        endAccessor="end"
        views={["month"]}
        style={{ height: "700px", margin: "20px" }}
        formats={formats}
        components={components}
        eventPropGetter={eventStyleGetter}
      />
      <ul>
        {filteredEvents.map((item, index) => {
          const startDate = moment(item.start);
          return (
            <li key={index}>
              {startDate.format("YYYY-MM-DD")} - {item.title}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Cal;
