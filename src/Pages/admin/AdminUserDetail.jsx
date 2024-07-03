import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import api from "../../api/api";
import ReactPaginate from "react-paginate";

const AdminUserDetail = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [logs, setLogs] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const logsPerPage = 10;

  const fetchAdminUserDetail = async () => {
    try {
      const response = await api.get(`member/${id}`);
      setUser(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchUserLogs = async () => {
    const mockLogs = Array.from({ length: 30 }, (_, index) => ({
      date: `2024-07-${String(index + 1).padStart(2, "0")}`,
      message: `로그 메시지 ${index + 1}`,
    }));
    setLogs(mockLogs);
  };

  useEffect(() => {
    fetchAdminUserDetail();
    fetchUserLogs();
  }, [id]);

  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
  };

  const offset = currentPage * logsPerPage;
  const currentLogs = logs.slice(offset, offset + logsPerPage);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      <UserInfo>
        <h2>사용자 정보</h2>
        <UserInfoTable>
          <tbody>
            <tr>
              <th>아이디</th>
              <td>{user.memberId}</td>
            </tr>
            <tr>
              <th>이름</th>
              <td>{user.name}</td>
            </tr>
            <tr>
              <th>생년월일</th>
              <td>{user.birth}</td>
            </tr>
            <tr>
              <th>가입 날짜</th>
              <td>{user.joinDate}</td>
            </tr>
            <tr>
              <th>상태</th>
              <td>{user.isApproval ? "승인됨" : "미승인"}</td>
            </tr>
          </tbody>
        </UserInfoTable>
      </UserInfo>
      <UserLogs>
        <h2>유저 로그</h2>
        {currentLogs.length > 0 ? (
          <LogList>
            {currentLogs.map((log, index) => (
              <LogItem key={index}>
                <LogDate>{log.date}</LogDate>
                <LogMessage>{log.message}</LogMessage>
              </LogItem>
            ))}
          </LogList>
        ) : (
          <p>로그가 없습니다.</p>
        )}
        <PaginationContainer>
          <ReactPaginate
            previousLabel={"이전"}
            nextLabel={"다음"}
            breakLabel={"..."}
            breakClassName={"break-me"}
            pageCount={Math.ceil(logs.length / logsPerPage)}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={handlePageClick}
            containerClassName={"pagination"}
            activeClassName={"active"}
          />
        </PaginationContainer>
      </UserLogs>
    </Container>
  );
};

export default AdminUserDetail;

const Container = styled.div`
  margin: 0 auto;
  background-color: #f9f9f9;
  border-radius: 10px;
`;

const UserInfo = styled.div`
  background: white;
  border-radius: 10px;
  margin-bottom: 20px;

  h2 {
    margin-bottom: 20px;
    font-size: 24px;
    color: #333;
  }
`;

const UserInfoTable = styled.table`
  width: 100%;
  border-collapse: collapse;

  th,
  td {
    padding: 12px;
    border: 1px solid #ddd;
  }

  th {
    background-color: #f4f4f4;
    text-align: left;
    width: 150px;
  }
`;

const UserLogs = styled.div`
  padding: 20px;
  background: white;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  h2 {
    margin-bottom: 20px;
    font-size: 24px;
    color: #333;
  }
`;

const LogList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const LogItem = styled.li`
  display: flex;
  justify-content: space-between;
  padding: 10px;
  border-bottom: 2px solid #ddd;
  margin-bottom: 10px;
  background-color: #fff;
  //   box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

const LogDate = styled.span`
  font-weight: bold;
  color: #555;
`;

const LogMessage = styled.span`
  flex-grow: 1;
  margin-left: 10px;
  color: #777;
`;

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;

  .pagination {
    display: flex;
    list-style: none;
    padding: 0;

    li {
      margin: 0 5px;

      a {
        padding: 8px 12px;
        border: 1px solid #ddd;
        cursor: pointer;
        text-decoration: none;
        color: #007bff;
        border-radius: 5px;
        background-color: white;

        &:hover {
          background-color: #eee;
        }
      }

      &.active a {
        background-color: #007bff;
        color: white;
      }

      &.break-me {
        cursor: default;
      }
    }
  }
`;
