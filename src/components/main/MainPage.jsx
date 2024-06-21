import { useEffect, useState } from "react";
import styled from "styled-components";
import api from "../../api/api";

const MainPage = () => {
  const [boards, setBoards] = useState([]);
  useEffect(() => {
    const fetchCategoryBoard = async () => {
      try {
        const response = await api.get("board/");
        const sortedList = response.data.data.sort(
          (a, b) => new Date(b.createAt) - new Date(a.createAt)
        );
        setBoards(sortedList);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchCategoryBoard();
  }, []);

  return (
    <Container>
      <Banner>
        <div>2024표어</div>
        <div>믿음의 주요 온전하게 하시는 이인 예수님을 바라보는 교회</div>
      </Banner>
      <Schedule>
        <Title>예배일정</Title>
        <ScheduleContent>
          <StyledList>
            <StyledListItem>
              <span style={{ letterSpacing: "6.5px" }}>주일 예배:</span>
              오전 11:00
            </StyledListItem>
            <StyledListItem>주일 합심 기도: 오후 12:30</StyledListItem>
            <StyledListItem>주일 중보 기도: 오전 10:30</StyledListItem>
            <StyledListItem>주일 영성 모임: 오후 12:20</StyledListItem>
            <StyledListItem>수요 주제 강해: 오후 8:20</StyledListItem>
            <StyledListItem>수요 중보 모임: 오전 10:30</StyledListItem>
          </StyledList>
          <StyledList>
            <StyledListItem>사무엘 (주일): 오전 11:00</StyledListItem>
            <StyledListItem>다니엘 (주일): 오전 09:00</StyledListItem>
            <StyledListItem>청년부 (주일): 오전 09:00</StyledListItem>
            <StyledListItem>
              <span style={{ letterSpacing: "1.9px" }}>금요 기도회:</span>
              오후 09:00
            </StyledListItem>
            <StyledListItem>
              <span style={{ letterSpacing: "3.1px" }}>새벽기도회:</span>
              오전 06:00
            </StyledListItem>
            <StyledListItem>일 대 일 양 육: 상황에 맞게</StyledListItem>
          </StyledList>
        </ScheduleContent>
      </Schedule>
      <NewBoards>
        <Title>최근 게시물</Title>
        {boards.slice(0, 10).map((item) => (
          <BoardBody key={item.boardId}>
            <BoardColumn className="title">{item.title}</BoardColumn>
          </BoardBody>
        ))}
      </NewBoards>
      <BibleRecitation>
        <Title>이번주 말씀 암송</Title>
        <div>
          그러므로 너희가 그리스도와 함께 다시 살리심을 받았으면 위엣 것을
          찾으라 거기는 그리스도께서 하나님 우편에 앉아 계시느니라 위엣 것을
          생각하고 땅엣 것을 생각지 말라 이는 너희가 죽었고 너희 생명이
          그리스도와 함께 하나님 안에 감취었음이니라 우리 생명이신 그리스도께서
          나타나실 그 때에 너희도 그와 함께 영광 중에 나타나리라(골3:1~4절)
        </div>
      </BibleRecitation>
      <Calendar>
        <Title>달력</Title>
      </Calendar>

      <Vision>
        <Title>함께섬기는 교회 비전(vision)</Title>
      </Vision>
      <Imgae>
        <Title>이미지</Title>
      </Imgae>
      <Imgae>
        <Title>이미지</Title>
      </Imgae>
    </Container>
  );
};

export default MainPage;
const Container = styled.div`
  min-height: 80vh;
  display: grid;
  gap: 1rem;
  // padding: 1.5rem;
  // background-color: #f0f0f0;
  grid-template-columns: repeat(6, 1fr);
  grid-template-rows: repeat(4, 1fr);
`;

const Title = styled.div`
  font-size: 1.5rem;
  // color: #0697e6;
  border-bottom: 1px solid rgb(139 137 137 / 50%);
  padding-bottom: 0.5rem;
  margin-bottom: 1rem;
`;

const Banner = styled.div`
  background-color: #f2f2f2;
  padding: 2rem;
  text-align: center;
  border-radius: 4px;
  grid-column: 1 / 5;
  border: 1px solid #ccc;
  grid-row: 1 / 2;
`;

const Section = styled.div`
  padding: 1rem;
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Schedule = styled(Section)`
  grid-column: 5 / 7;
  grid-row: 1 / 2;
`;

const ScheduleContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
`;

const StyledList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
`;

const StyledListItem = styled.li`
  padding: 4px 0;
`;

const NewBoards = styled(Section)`
  grid-column: 5 / 7;
  grid-row: 2 / 4;
`;

const BibleRecitation = styled(Section)`
  grid-column: 3 / 5;
  grid-row: 3 / 4;
`;

const Vision = styled(Section)`
  grid-column: 1 / 3;
  grid-row: 2 / 4;
`;

const Calendar = styled(Section)`
  grid-column: 3 / 5;
  grid-row: 2 / 3;
`;

const Imgae = styled(Section)`
  grid-column: 1 / 7;
  grid-row: 4 / 5;
`;

//board
const BoardBody = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #eee;
  transition: background-color 0.2s;

  &:hover {
    background-color: #e8f1fa;
  }
`;

const BoardColumn = styled.div`
  &.title {
    width: 100%;
    cursor: pointer;
    text-align: left;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 250px; /* 최대 너비 설정 */
  }
`;
