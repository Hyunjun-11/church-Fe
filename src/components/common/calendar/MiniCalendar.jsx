import moment from "moment";
import styled from "styled-components";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css"; // css import
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import api from "../../../api/api";

const MiniCalendar = () => {
  const today = new Date();
  const [date, setDate] = useState(today);
  const [activeStartDate, setActiveStartDate] = useState(today);
  const nav = useNavigate();
  const [events, setEvents] = useState([]);
  const [eventDates, setEventDates] = useState({});
  console.log(events);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await api.get("calendar/");
        console.log(response.data.data);
        const fetchedEvents = response.data.data.map((event) => {
          const formattedStartTime = moment(event.startTime).format(
            "YYYY-MM-DD"
          );
          const formattedEndTime = moment(event.endTime).format("YYYY-MM-DD");
          return {
            ...event,
            startTime: formattedStartTime,
            endTime: formattedEndTime,
          };
        });

        const allEventDates = fetchedEvents.reduce((acc, event) => {
          const start = moment(event.startTime);
          const end = moment(event.endTime);
          while (start <= end) {
            const dateStr = start.format("YYYY-MM-DD");
            if (!acc[dateStr]) {
              acc[dateStr] = [];
            }
            acc[dateStr].push(event);
            start.add(1, "days");
          }
          return acc;
        }, {});

        setEvents(fetchedEvents);
        setEventDates(allEventDates);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };
    fetchEvents();
  }, []);

  const handleDateChange = (newDate) => {
    console.log(newDate);
    // window.confirm("상세일정으로 이동하시겠습니까?");
    nav("worship/church-schedule");
  };

  const handleTodayClick = () => {
    const today = new Date();
    setActiveStartDate(today);
    setDate(today);
  };

  return (
    <StyledCalendarWrapper>
      <StyledCalendar
        value={date}
        onChange={handleDateChange}
        formatDay={(locale, date) => moment(date).format("D")}
        formatYear={(locale, date) => moment(date).format("YYYY")}
        formatMonthYear={(locale, date) => moment(date).format("YYYY. MM")}
        calendarType="gregory"
        showNeighboringMonth={false}
        next2Label={null}
        prev2Label={null}
        minDetail="year"
        activeStartDate={activeStartDate}
        onActiveStartDateChange={({ activeStartDate }) =>
          setActiveStartDate(activeStartDate)
        }
        tileContent={({ date, view }) => {
          let html = [];
          const dateStr = moment(date).format("YYYY-MM-DD");

          if (
            view === "month" &&
            date.getMonth() === today.getMonth() &&
            date.getDate() === today.getDate()
          ) {
            html.push(<StyledToday key={"today"}>Today</StyledToday>);
          }

          const eventsForDate = eventDates[dateStr] || [];
          if (eventsForDate.length > 0) {
            eventsForDate.forEach((event, index) => {
              const isStart = dateStr === event.startTime;
              const isEnd = dateStr === event.endTime;
              const isMiddle = !isStart && !isEnd;

              if (isStart) {
                html.push(
                  <StyledDot
                    key={`dot-start-${index}`}
                    color={event.color}
                    isStart={true}
                  />
                );
              } else if (isMiddle) {
                html.push(
                  <StyledLine
                    key={`line-middle-${index}`}
                    color={event.color}
                  />
                );
              } else if (isEnd) {
                html.push(
                  <StyledDot
                    key={`dot-end-${index}`}
                    color={event.color}
                    isEnd={true}
                  />
                );
              }
            });
          }

          return <>{html}</>;
        }}
      />

      <StyledDate onClick={handleTodayClick}>Today</StyledDate>
      <GotoCalendar
        onClick={() => {
          nav("worship/church-schedule");
        }}>
        전체일정
      </GotoCalendar>
    </StyledCalendarWrapper>
  );
};

export default MiniCalendar;

const StyledCalendarWrapper = styled.div`
  width: 100%;
  height: 360px;
  display: flex;
  justify-content: center;
  position: relative;
  .react-calendar {
    width: 100%;
    border: none;
    border-radius: 0.5rem;
    padding: 3% 5%;
    background-color: white;
  }

  /* 전체 폰트 컬러 */
  .react-calendar__month-view {
    abbr {
      color: ${(props) => props.theme.gray_1};
    }
  }

  /* 네비게이션 가운데 정렬 */
  .react-calendar__navigation {
    justify-content: center;
  }

  /* 네비게이션 폰트 설정 */
  .react-calendar__navigation button {
    font-weight: 800;
    font-size: 1rem;
  }

  /* 네비게이션 버튼 컬러 */
  .react-calendar__navigation button:focus {
    background-color: white;
  }

  /* 네비게이션 비활성화 됐을때 스타일 */
  .react-calendar__navigation button:disabled {
    background-color: white;
    color: ${(props) => props.theme.darkBlack};
  }

  /* 년/월 상단 네비게이션 칸 크기 줄이기 */
  .react-calendar__navigation__label {
    flex-grow: 0 !important;
  }

  /* 요일 밑줄 제거 */
  .react-calendar__month-view__weekdays abbr {
    text-decoration: none;
    font-weight: 800;
  }

  /* 일요일에만 빨간 폰트 */
  .react-calendar__month-view__weekdays__weekday--weekend abbr[title="일요일"] {
    color: ${(props) => props.theme.red_1};
  }

  /* 오늘 날짜 폰트 컬러 */
  .react-calendar__tile--now {
    background: none;
    abbr {
      color: ${(props) => props.theme.darkBlack};
    }
  }

  /* 네비게이션 월 스타일 적용 */
  .react-calendar__year-view__months__month {
    border-radius: 0.8rem;
    background-color: ${(props) => props.theme.gray_5};
    padding: 0;
  }

  /* 네비게이션 현재 월 스타일 적용 */
  .react-calendar__tile--hasActive {
    background-color: ${(props) => props.theme.hover};
    abbr {
      color: white;
    }
  }

  /* 일 날짜 간격 */
  .react-calendar__tile {
    padding: 5px 0px 18px;
    position: relative;
  }

  /* 네비게이션 월 스타일 적용 */
  .react-calendar__year-view__months__month {
    flex: 0 0 calc(33.3333% - 10px) !important;
    margin-inline-start: 5px !important;
    margin-inline-end: 5px !important;
    margin-block-end: 10px;
    padding: 20px 6.6667px;
    font-size: 0.9rem;
    font-weight: 600;
    color: ${(props) => props.theme.gray_1};
  }

  /* 선택한 날짜 스타일 적용 */
  .react-calendar__tile:enabled:hover,
  .react-calendar__tile:enabled:focus,
  .react-calendar__tile--active {
    background-color: ${(props) => props.theme.hover};
    border-radius: 1.5rem;
    border
  }

  /* 그림자 제거 */
  .react-calendar {
    box-shadow: none;
  }
`;

export const StyledCalendar = styled(Calendar)``;

/* 오늘 버튼 스타일 */
const StyledDate = styled.div`
  position: absolute;
  left: 5%;
  top: 6%;
  background-color: ${(props) => props.theme.hover};
  color: black;
  width: 18%;
  min-width: fit-content;
  height: 1.5rem;
  text-align: center;
  margin: 0 auto;
  line-height: 1.6rem;
  border-radius: 15px;
  font-size: 0.8rem;
  font-weight: 800;
  cursor: pointer;
`;
const GotoCalendar = styled.div`
  position: absolute;
  right: 5%;
  top: 6%;
  background-color: ${(props) => props.theme.hover};
  color: black;
  width: 18%;
  min-width: fit-content;
  height: 1.5rem;
  text-align: center;
  margin: 0 auto;
  line-height: 1.6rem;
  border-radius: 15px;
  font-size: 0.8rem;
  font-weight: 800;
  cursor: pointer;
`;

/* 오늘 날짜에 텍스트 삽입 스타일 */
export const StyledToday = styled.div`
  font-size: x-small;
  color: ${(props) => props.theme.br_2};
  font-weight: 600;
  position: absolute;
  top: 60%;
  left: 50%;
  transform: translateX(-50%);
`;

export const StyledDot = styled.div`
  background-color: lightblue;
  width: 1rem;
  height: 0.1rem;
  position: absolute;
  top: 55%;
  left: ${(props) => (props.isStart || props.isEnd ? "50%" : "0")};
  transform: translateX(-50%);
`;

export const StyledLine = styled.div`
  background-color: lightblue;
  height: 0.1rem;
  position: absolute;
  top: 55%;
  width: 100%;
  left: 0;
`;
