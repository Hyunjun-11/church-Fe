import React, { useEffect, useState } from "react";
// import "./AdminDashboard.css";

const AdminDashboard = () => {
  const [visitorCount, setVisitorCount] = useState(0);
  const [totalVisitorCount, setTotalVisitorCount] = useState(0);

  useEffect(() => {
    // 서버에서 방문자 수 데이터를 가져오는 함수
    const fetchVisitorData = async () => {
      try {
        // API를 호출하여 방문자 수 데이터를 가져옴
        const response = await fetch("/api/visitor-data");
        const data = await response.json();
        setVisitorCount(data.visitorCount);
        setTotalVisitorCount(data.totalVisitorCount);
      } catch (error) {
        console.error("Error fetching visitor data:", error);
      }
    };

    fetchVisitorData(); // 함수 호출
  }, []); // 컴포넌트가 처음 렌더링될 때 한 번만 호출

  return (
    <div className="AdminDashboard">
      <div className="visitor-stats">
        <div className="stat">
          <h2>오늘의 방문자 수</h2>
          <p>{visitorCount}</p>
        </div>
        <div className="stat">
          <h2>총 방문자 수</h2>
          <p>{totalVisitorCount}</p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
