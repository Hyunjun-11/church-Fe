// AdminLayout.js

import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import styled from "styled-components";
import BodyTitle from "../../components/common/BodyTitle";

const AdminLayout = () => {
  const navigate = useNavigate();
  const handleClick = (path) => {
    navigate(`${path}`);
  };

  return (
    <Container>
      <Sidebar>
        <Logo>Admin</Logo>
        <Nav>
          <NavList>
            <NavItem onClick={() => handleClick("dashboard")}>대시보드</NavItem>
            <NavItem onClick={() => handleClick("posts")}>게시물 관리</NavItem>
            <NavItem onClick={() => handleClick("users")}>유저 관리</NavItem>
            <NavItem onClick={() => handleClick("banner")}>배너 관리</NavItem>
            <NavItem onClick={() => handleClick("schedule")}>일정 관리</NavItem>
            <NavItem onClick={() => handleClick("bibleRecitation")}>
              말씀 암송 관리
            </NavItem>
            <NavItem onClick={() => handleClick("/")}>유저페이지</NavItem>
          </NavList>
        </Nav>
      </Sidebar>
      <Main>
        <Content>
          <Outlet />
        </Content>
        <Footer>© 2024 Admin Dashboard</Footer>
      </Main>
    </Container>
  );
};

export default AdminLayout;

const Container = styled.div`
  display: flex;
  min-height: 100vh;
  background: #f0f2f5;
`;

const Sidebar = styled.aside`
  // width: 250px;
  min-width: fit-content;
  background: #ffffff;
  border-right: 1px solid #ddd;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

const Logo = styled.div`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
  color: #333;
`;

const Nav = styled.nav`
  width: 100%;
`;

const NavList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: fit-content;
`;

const NavItem = styled.li`
  min-width: fit-content;
  padding: 15px;
  text-align: center;
  cursor: pointer;
  border-radius: 4px;
  transition: background 0.3s ease, text-shadow 0.3s ease;
  color: #333;
  margin-bottom: 10px;

  &:hover {
    background: #e3e6ea;
    text-shadow: 0px 0px 1px rgba(0, 0, 0);
  }
`;

const Main = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const Header = styled.header`
  background: #ffffff;
  padding: 20px;
  border-bottom: 1px solid #ddd;
`;

const Title = styled.h1`
  margin: 0;
  font-size: 24px;
  color: #333;
`;

const Content = styled.div`
  flex: 1;
  padding: 20px;
  background: #fff;
  border-radius: 8px;
  margin: 20px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
`;

const Footer = styled.footer`
  background: #ffffff;
  color: #333;
  text-align: center;
  padding: 10px 0;
  border-top: 1px solid #ddd;
`;
