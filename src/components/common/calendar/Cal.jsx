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
  const [holidays, setHolidays] = useState([]);
  const [userEvents, setUserEvents] = useState([]);

  const fetchHolidays = async (year) => {
    try {
      const response = await axios.get(
        `https://apis.data.go.kr/B090041/openapi/service/SpcdeInfoService/getRestDeInfo?serviceKey=rioVHmZcE42QApn4%2FZZLSxawfsbDYgqJrVUW7WfF2YkrlbFvR943S9g4%2F8B%2FnW%2FfU3Lg6CmfXylobjmJqfQvAA%3D%3D&solYear=${year}&numOfRows=50`
      );

      const items = response.data.response.body.items.item;
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

      setHolidays(formattedHolidays);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    fetchHolidays(currentYear);
  }, [currentYear]);

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
        let style = {
          color: isWeekend || isHoliday ? "red" : "black",
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
    toolbar: Toolbar,
    event: ({ event }) => (
      <span>
        <strong>{event.title}</strong>
      </span>
    ),
  };

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

  const handleDateClick = (event) => {
    const title = window.prompt("일정의 제목을 입력하세요:");
    if (title) {
      const newEvent = {
        title,
        start: event.start,
        end: event.end,
        type: "event",
      };
      setUserEvents([...userEvents, newEvent]);
    }
  };

  return (
    <div className="Cal">
      <h1>일정표</h1>
      <Calendar
        localizer={localizer}
        events={[...holidays, ...userEvents]} // 휴일과 사용자 이벤트를 합침
        startAccessor="start"
        endAccessor="end"
        views={["month"]}
        style={{ height: "700px", margin: "20px" }}
        formats={formats}
        components={components}
        eventPropGetter={eventStyleGetter}
        selectable={true} // 날짜 선택 가능하도록 설정
        onSelectSlot={handleDateClick} // 날짜를 클릭할 때 이벤트 핸들러 호출
      />
    </div>
  );
};

export default Cal;
