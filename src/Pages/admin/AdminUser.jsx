import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import api from "../../api/api";
import { useNavigate } from "react-router-dom";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const nav = useNavigate();
  const handleUserDetail = (id) => {
    nav(`${id}`);
  };

  const fetchUser = async () => {
    try {
      const response = await api.get(`member/readAll`);
      setUsers(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleApprove = async (id) => {
    try {
      await api.patch(`member/approval/${id}`);
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === id ? { ...user, isApproval: true } : user
        )
      );
    } catch (error) {
      console.error(error);
    }
  };

  const handleRevoke = async (id) => {
    try {
      await api.put(`member/revoke/${id}`);
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === id ? { ...user, isApproval: false } : user
        )
      );
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
          <BoardBody key={item.id} onClick={() => handleUserDetail(item.id)}>
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
              {item.isApproval ? (
                <ApprovedButton onClick={() => handleRevoke(item.id)}>
                  승인됨
                </ApprovedButton>
              ) : (
                <UnapprovedButton onClick={() => handleApprove(item.id)}>
                  미승인
                </UnapprovedButton>
              )}
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

const buttonStyles = css`
  cursor: pointer;
  padding: 4px 8px;
  border-radius: 1rem;
  user-select: none;
  transition: background-color 0.2s, transform 0.1s;

  &:active {
    transform: scale(0.95);
  }
`;

const ApprovedButton = styled.div`
  ${buttonStyles}
  border: solid 1px #90ff92;
  background-color: #e8faea;

  &:hover {
    background-color: #c7f7d4;
  }
`;

const UnapprovedButton = styled.div`
  ${buttonStyles}
  border: solid 1px #ff9292;
  background-color: #fae8e8;

  &:hover {
    background-color: #f7c7c7;
  }
`;
