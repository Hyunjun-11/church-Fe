import { useEffect, useState } from "react";
import styled from "styled-components";
import api from "../../api/api";
import MiniCalendar from "../common/calendar/MiniCalendar";
import { useNavigate } from "react-router-dom";
const categoryRoutes = {
  SAMUEL: "/education-evangelism/samuel",
  DANIEL: "/education-evangelism/daniel",
  YOUTH: "/education-evangelism/youth",
  ESTHER: "/education-evangelism/esther",
  WOMEN: "/education-evangelism/women",
  MEN1: "/education-evangelism/men1",
  MEN2: "/education-evangelism/men2",
  DEVELOP: "/test/develop",
  GOWITH: "community/gowith",
};
const MainPage = () => {
  const [boards, setBoards] = useState([]);
  const [goWithBoards, setGoWithBoards] = useState([]);
  const navi = useNavigate();
  console.log(boards);
  useEffect(() => {
    const fetchCategoryBoard = async () => {
      try {
        const response = await api.get("board/");
        const sortedList = response.data.data.sort(
          (a, b) => new Date(b.createAt) - new Date(a.createAt)
        );
        const filteredBoards = sortedList.filter(
          (board) => board.category !== "GOWITH"
        );
        const filterdGoWithBoards = sortedList.filter(
          (board) => board.category === "GOWITH"
        );
        setBoards(filteredBoards);
        setGoWithBoards(filterdGoWithBoards);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchCategoryBoard();
  }, []);
  const handleNavigate = (category) => {
    const route = categoryRoutes[category.toUpperCase()];

    if (route) {
      navi(`${route}`);
    } else {
      console.error(`No route defined for category: ${category}`);
    }
  };

  return (
    <Container>
      <Slogan>
        <Image
          src="https://storage.googleapis.com/church_image_demo_11/vison.jpg"
          alt=""
        />
      </Slogan>
      <Schedule>
        <Title>예배일정</Title>
        <ScheduleContent>
          <StyledList>
            <StyledListItem>
              <span style={{ letterSpacing: "0.45rem" }}>주일 예배:</span>
              오전 11:00
            </StyledListItem>
            <StyledListItem>주일 합심 기도 : 오후 12:30</StyledListItem>
            <StyledListItem>주일 중보 기도 : 오전 10:30</StyledListItem>
            <StyledListItem>주일 영성 모임 : 오후 12:20</StyledListItem>
            <StyledListItem>수요 주제 강해 : 오후 8:20</StyledListItem>
            <StyledListItem>수요 중보 모임 : 오전 10:30</StyledListItem>
          </StyledList>
          <StyledList>
            <StyledListItem>사무엘 (주일) : 오전 11:00</StyledListItem>
            <StyledListItem>다니엘 (주일) : 오전 09:00</StyledListItem>
            <StyledListItem>청년부 (주일) : 오전 09:00</StyledListItem>
            <StyledListItem>
              <span style={{ letterSpacing: "1.9px" }}>금요 기도회 : </span>
              오후 09:00
            </StyledListItem>
            <StyledListItem>
              <span style={{ letterSpacing: "3.1px" }}>새벽기도회 : </span>
              오전 06:00
            </StyledListItem>
            <StyledListItem>일 대 일 양 육 : 상황에 맞게</StyledListItem>
          </StyledList>
        </ScheduleContent>
      </Schedule>
      <NewBoards>
        <Box2>
          <Title>
            최근 게시물
            <SeeMore
              onClick={() => {
                navi("/education-evangelism/samuel");
              }}>
              더보기
            </SeeMore>
          </Title>
          {boards.slice(0, 7).map((item) => (
            <BoardBody key={item.boardId}>
              <BoardColumn
                onClick={() => handleNavigate(item.category)}
                className="title">
                {item.title}
              </BoardColumn>
            </BoardBody>
          ))}
        </Box2>

        <Box2>
          <Title>
            동행일기
            <SeeMore
              onClick={() => {
                navi("/community/gowith");
              }}>
              더보기
            </SeeMore>
          </Title>
          {goWithBoards.slice(0, 7).map((item) => (
            <BoardBody key={item.boardId}>
              <BoardColumn
                onClick={() => handleNavigate(item.category)}
                className="title">
                {item.title}
              </BoardColumn>
            </BoardBody>
          ))}
        </Box2>
      </NewBoards>
      <BibleRecitation>
        <Title>이번주 말씀 암송</Title>
        <div></div>
      </BibleRecitation>
      <Calendar>
        <MiniCalendar />
      </Calendar>

      <Vision>
        <Image
          src="https://storage.googleapis.com/church_image_demo_11/vision2.jpg"
          alt=""
        />
      </Vision>
      <ImgaeBoard>
        <Title>이미지</Title>
      </ImgaeBoard>
    </Container>
  );
};

export default MainPage;
const Container = styled.div`
  min-height: 80vh;
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(6, 1fr);
  grid-template-rows: repeat(4, 0.5fr);
  user-select: none;
`;
const Section = styled.div`
  padding: 0.5rem;
  background-color: white;
  // border: 1px solid #ccc;
  border-radius: 4px;
`;
const Title = styled.div`
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 1.2rem;
  // color: #0697e6;
  border-bottom: 1px solid rgb(139 137 137 / 50%);
  padding-bottom: 0.5rem;
  margin-bottom: 1rem;
`;
//더보기
const SeeMore = styled.div`
  cursor: pointer;
  font-size: 0.8rem;
  border: solid 1px #d6d1d1;
  padding: 6px 12px;
  border-radius: 24px;
  &:hover {
    background-color: #e8f1fa;
  }
`;

const Slogan = styled.div`
  background-color: #f2f2f2;
  padding: 2rem;
  text-align: center;
  border-radius: 4px;
  grid-column: 1 / 5;
  border: 1px solid #ccc;
  grid-row: 1 / 2;
  position: relative;
  overflow: hidden;
`;
const Vision = styled(Section)`
  grid-column: 1 / 3;
  grid-row: 2 / 4;
  position: relative;
  overflow: hidden;
`;
const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: fill; /* 이미지를 부모 요소에 맞게 비율 무시하고 꽉 차게 함 */
  position: absolute;
  top: 0;
  left: 0;
`;

const Schedule = styled(Section)`
  grid-column: 5 / 7;
  grid-row: 1 / 2;
  user-select: none;
`;

const ScheduleContent = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 12px;
`;

const StyledList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
`;

const StyledListItem = styled.li`
  display: flex;
  justify-content: space-between;
  padding: 4px 0;
`;

const NewBoards = styled.div`
  grid-column: 5 / 7;
  grid-row: 2 / 4;
  grid-auto-rows: 1fr;
`;
const Box2 = styled(Section)``;

const BibleRecitation = styled(Section)`
  grid-column: 3 / 5;
  grid-row: 3 / 4;
`;

const Calendar = styled(Section)`
  padding: 0;
  grid-column: 3 / 5;
  grid-row: 2 / 3;
`;

const ImgaeBoard = styled(Section)`
  grid-column: 1 / 7;
  grid-row: 4 / 10;
`;

//board
const BoardBody = styled.div`
  display: flex;
  align-items: center;
  padding: 5.7px;
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
  }
`;
