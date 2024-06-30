// AdminUsers.js
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import api from "../../api/api";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const fetchUser = async () => {
    try {
      const response = await api.get(`member/readAll`);
      console.log(response.data.data);
      setUsers(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);
  return (
    <UserLayoutContainer>
      <Board>
        <BoardHeader>
          <BoardColumn className="number">번호</BoardColumn>
          <BoardColumn className="id">아이디</BoardColumn>
          <BoardColumn className="name">이름</BoardColumn>
          <BoardColumn className="birth">생년월일</BoardColumn>
          <BoardColumn className="state">상태</BoardColumn>
        </BoardHeader>
        {users.map((item, index) => (
          <BoardBody key={item.id}>
            <BoardColumn className="number">{index + 1}</BoardColumn>
            <BoardColumn className="id">{item.memberId}</BoardColumn>
            <BoardColumn className="name">{item.name}</BoardColumn>
            <BoardColumn className="birth">
              {`${new Date(item.birth).getFullYear()}-${String(
                new Date(item.birth).getMonth() + 1
              ).padStart(2, "0")}-${String(
                new Date(item.birth).getDate()
              ).padStart(2, "0")}`}
            </BoardColumn>

            <BoardColumn className="state">
              <StateButton>승인</StateButton>
            </BoardColumn>
          </BoardBody>
        ))}
      </Board>
    </UserLayoutContainer>
  );
};

export default AdminUsers;

const UserLayoutContainer = styled.div`
  display: grid;
  gap: 20px;
  border-radius: 8px;
`;

const Board = styled.div`
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
`;

const BoardHeader = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  background-color: #007bff;
  color: white;
  font-weight: bold;
  font-size: 16px;
`;

const BoardBody = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  cursor: pointer;
  border-bottom: 1px solid #eee;
  transition: background-color 0.2s;

  &:hover {
    background-color: #f1f1f1;
  }
`;

const BoardColumn = styled.div`
  text-align: center;

  &.number {
    width: 10%;
  }

  &.id {
    width: 15%;
    text-align: left;
  }
  &.name {
    width: 30%;
  }

  &.birth {
    width: 25%;
  }
  &.state {
    width: 7%;
  }
`;

const StateButton = styled.div`
  // display: flex;
  // justify-items: center;
  cursor: pointer;
  padding: 4px 8px;
  border: solid 1px #90ff92;
  border-radius: 1rem;
  background-color: #e8faea;
  // width: fit-content;
  user-select: none;
`;
