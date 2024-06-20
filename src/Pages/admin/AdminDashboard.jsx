import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Line, Bar } from "react-chartjs-2";
import BodyTitle from "../../components/common/BodyTitle";

const AdminDashboard = () => {
  const navigate = useNavigate();

  const handleActivityClick = () => {
    navigate("/admin/users");
  };

  const handlePostsClick = () => {
    navigate("/admin/posts");
  };

  const userData = {
    labels: [
      "Week 1",
      "Week 2",
      "Week 3",
      "Week 4",
      "Week 5",
      "Week 6",
      "Week 7",
    ],
    datasets: [
      {
        label: "User Growth",
        data: [12, 19, 3, 5, 2, 3, 7],
        fill: false,
        backgroundColor: "rgb(75, 192, 192)",
        borderColor: "rgba(75, 192, 192, 0.2)",
      },
    ],
  };

  const postData = {
    labels: [
      "Week 1",
      "Week 2",
      "Week 3",
      "Week 4",
      "Week 5",
      "Week 6",
      "Week 7",
    ],
    datasets: [
      {
        label: "New Posts",
        data: [5, 10, 8, 12, 6, 4, 9],
        backgroundColor: "rgba(153, 102, 255, 0.6)",
        borderColor: "rgba(153, 102, 255, 1)",
        borderWidth: 1,
      },
    ],
  };

  const visitorData = {
    labels: [
      "Week 1",
      "Week 2",
      "Week 3",
      "Week 4",
      "Week 5",
      "Week 6",
      "Week 7",
    ],
    datasets: [
      {
        label: "Visitors",
        data: [200, 300, 250, 280, 350, 320, 400],
        backgroundColor: "rgba(255, 99, 132, 0.6)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
      },
    ],
  };

  return (
    <Container>
      <BodyTitle title={"대시보드"} />
      <Section>
        <ChartRow>
          <ChartCard>
            <ChartInfo>총 유저 수: 1,234명 / 신규 유저: 56명</ChartInfo>
            <Line data={userData} options={{ maintainAspectRatio: false }} />
          </ChartCard>
          <ChartCard>
            <ChartInfo>이번 주 게시글: 42개 증가</ChartInfo>
            <Bar data={postData} options={{ maintainAspectRatio: false }} />
          </ChartCard>
          <ChartCard>
            <ChartInfo>총 방문자: 1,234명 / 오늘 방문자: 123명</ChartInfo>
            <Bar data={visitorData} options={{ maintainAspectRatio: false }} />
          </ChartCard>
        </ChartRow>
      </Section>
      <Section>
        <ClickableSection onClick={handleActivityClick}>
          <ActivityTitle>최근 활동 로그</ActivityTitle>
          <ActivityLog>
            <LogItem>유저 John이 새로운 게시물을 작성했습니다.</LogItem>
            <LogItem>유저 Alice이 댓글을 남겼습니다.</LogItem>
            <LogItem>유저 Bob이 가입했습니다.</LogItem>
          </ActivityLog>
        </ClickableSection>
        <ClickableSection onClick={handlePostsClick}>
          <PostsTitle>새로운 글</PostsTitle>
          <PostsLog>
            <PostItem>새로운 글 1</PostItem>
            <PostItem>새로운 글 2</PostItem>
            <PostItem>새로운 글 3</PostItem>
          </PostsLog>
        </ClickableSection>
      </Section>
    </Container>
  );
};

export default AdminDashboard;

const Container = styled.div`
  padding: 20px;
`;

const Section = styled.div`
  margin-bottom: 20px;
`;

const ChartRow = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ChartCard = styled.div`
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  flex: 1;
  margin: 0 10px;
  height: 300px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const ChartInfo = styled.div`
  font-size: 14px;
  color: #333;
  text-align: center;
  margin-bottom: 10px;
`;

const ClickableSection = styled.div`
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: background-color 0.3s;
  &:hover {
    background-color: #f0f0f0;
  }
`;

const ActivityTitle = styled.h2`
  font-size: 18px;
  color: #333;
`;

const ActivityLog = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const LogItem = styled.li`
  font-size: 14px;
  color: #333;
  padding: 10px 0;
  border-bottom: 1px solid #eee;
`;

const PostsTitle = styled.h2`
  font-size: 18px;
  color: #333;
`;

const PostsLog = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const PostItem = styled.li`
  font-size: 14px;
  color: #333;
  padding: 10px 0;
  border-bottom: 1px solid #eee;
`;
