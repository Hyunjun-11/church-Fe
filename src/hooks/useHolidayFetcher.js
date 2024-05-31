import { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";

const useHolidayFetcher = (initialDate) => {
  const [date, setDate] = useState(initialDate);
  const [currentYear, setCurrentYear] = useState(moment(initialDate).format("YYYY"));
  const [currentMonth, setCurrentMonth] = useState(moment(initialDate).format("MM"));
  const [holidays, setHolidays] = useState([]);

  const handleNavigate = (newDate) => {
    const momentDate = moment(newDate);
    setCurrentYear(momentDate.format("YYYY"));
    setCurrentMonth(momentDate.format("MM"));

    setDate(newDate);
  };

  const fetchHolidays = async (year, month) => {
    try {
      const response = await axios.get(
        `https://apis.data.go.kr/B090041/openapi/service/SpcdeInfoService/getRestDeInfo?serviceKey=rioVHmZcE42QApn4%2FZZLSxawfsbDYgqJrVUW7WfF2YkrlbFvR943S9g4%2F8B%2FnW%2FfU3Lg6CmfXylobjmJqfQvAA%3D%3D&solYear=${year}&solMonth=${month}&numOfRows=20`
      );
      const items = response.data.response.body.items.item;

      if (!items) {
        setHolidays([]);
        return;
      }

      const formattedItems = Array.isArray(items) ? items : [items];

      const formattedHolidays = formattedItems.map((item) => ({
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
        type: "holiday",
      }));

      setHolidays(formattedHolidays);
    } catch (error) {
      console.error("Error:", error);
      setHolidays([]);
    }
  };

  useEffect(() => {
    fetchHolidays(currentYear, currentMonth);
  }, [currentYear, currentMonth]);

  return { date, currentYear, currentMonth, holidays, handleNavigate };
};

export default useHolidayFetcher;
