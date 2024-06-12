import React, { useState } from "react";
import moment from "moment";

import { Navigate } from "react-big-calendar";

const CustomToolbar = ({ date, view, views, label, onView, onNavigate, localizer }) => {
  const [selectedYear, setSelectedYear] = useState(moment(date).year());
  const [selectedMonth, setSelectedMonth] = useState(moment(date).month());

  const handleNext = () => {
    onNavigate("NEXT");
  };

  const handleBack = () => {
    onNavigate("PREV");
  };

  const handleToday = () => {
    onNavigate("TODAY");
    setSelectedYear(moment().year());
    setSelectedMonth(moment().month());
  };

  const handleYearChange = (event) => {
    const newYear = parseInt(event.target.value, 10);
    setSelectedYear(newYear);
    const newDate = moment(date).year(newYear).toDate();
    onNavigate(Navigate.DATE, newDate);
  };

  const handleMonthChange = (event) => {
    const newMonth = parseInt(event.target.value, 10);
    setSelectedMonth(newMonth);
    const newDate = moment(date).month(newMonth).toDate();
    onNavigate(Navigate.DATE, newDate);
  };

  const years = [];
  for (let i = 2010; i <= 2030; i++) {
    years.push(i);
  }

  const months = ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"];

  return (
    <div className="rbc-toolbar">
      <span className="rbc-btn-group">
        <button type="button" onClick={handleBack} className="rbc-btn">
          이전 달
        </button>
        <button type="button" onClick={handleToday} className="rbc-btn">
          오늘
        </button>
        <button type="button" onClick={handleNext} className="rbc-btn">
          다음 달
        </button>
      </span>
      <span className="rbc-toolbar-label">{label}</span>
      <span className="rbc-toolbar-datepicker">
        <select value={selectedYear} onChange={handleYearChange} className="rbc-select">
          {years.map((year) => (
            <option key={year} value={year}>
              {year}년
            </option>
          ))}
        </select>
        <select value={selectedMonth} onChange={handleMonthChange} className="rbc-select">
          {months.map((month, index) => (
            <option key={month} value={index}>
              {month}
            </option>
          ))}
        </select>
      </span>
    </div>
  );
};

export default CustomToolbar;
