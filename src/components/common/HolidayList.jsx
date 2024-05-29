// import axios from "axios";
// import { useEffect, useState } from "react";

// const HolidayList = () => {
//   const [currentYear, setCurrentYear] = useState(""); // 현재 연도를 저장할 상태
//   const [holidays, setHolidays] = useState([]); // 공휴일 정보를 담을 상태

//   useEffect(() => {
//     const year = new Date().getFullYear();
//     setCurrentYear(year);
//   }, []);

//   const fetchHolidays = async (year) => {
//     try {
//       const response = await axios.get(
//         `https://apis.data.go.kr/B090041/openapi/service/SpcdeInfoService/getRestDeInfo?serviceKey=rioVHmZcE42QApn4%2FZZLSxawfsbDYgqJrVUW7WfF2YkrlbFvR943S9g4%2F8B%2FnW%2FfU3Lg6CmfXylobjmJqfQvAA%3D%3D&solYear=${year}&numOfRows=50`
//       );

//       const items = response.data.response.body.items.item;

//       // 휴일 정보 가공
//       const formattedHolidays = items.map((item) => ({
//         title: item.dateName, // 휴일 이름을 제목으로 설정
//         day: new Date( // 날짜를 Date 객체로 변환
//           item.locdate.toString().substring(0, 4), // locdate에서 연도 부분 추출
//           parseInt(item.locdate.toString().substring(4, 6)) - 1, // locdate에서 월 부분 추출 (월은 0부터 시작하므로 -1)
//           item.locdate.toString().substring(6, 8) // locdate에서 일 부분 추출
//         ),
//       }));

//       setHolidays(formattedHolidays);
//     } catch (error) {
//       console.error("Error:", error);
//     }
//   };

//   useEffect(() => {
//     fetchHolidays(currentYear);
//   }, [currentYear]);

// };

// export default HolidayList;
