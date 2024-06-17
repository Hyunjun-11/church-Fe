import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled, { css } from "styled-components";
import "./NavBarList.css";
const Container = styled.div`
  display: inline-block;
  position: relative;
  width: 100%; /* 원하는 타이틀의 너비로 설정 */
  text-align: center;
  color: white;
`;

const Title = styled.div`
  cursor: pointer;
  padding: 1rem 0px;
  background-color: #0697e6;
  font-weight: 500;
  transition: background-color 0.3s ease;
`;

const Dropdown = styled.div`
  position: absolute;
  font-size: 1.2rem;
  background-color: #26a1e4;
  z-index: 1000;
  width: 100%;
  height: 320px; /* 고정된 높이 설정 */
  overflow-y: auto; /* 내용이 높이를 넘길 경우 스크롤바 표시 */

  transition: opacity 0.3s ease, transform 0.3s ease;
  opacity: ${({ isOpen }) => (isOpen ? "1" : "0")};
  transform: ${({ isOpen }) =>
    isOpen ? "translateY(0)" : "translateY(-20px)"};

  ${({ isHighlighted }) =>
    isHighlighted &&
    css`
      background-color: #0697e6;
    `}
`;

const DropdownItem = styled.div`
  padding: 10px;
  cursor: pointer;
  font-weight: 200;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #1287c5;
    font-weight: 500;
  }
`;

const ListBar = ({ title, list, isOpen, onItemClick, type }) => {
  const navigate = useNavigate();
  const [isHighlighted, setIsHighlighted] = useState(false);

  const handleItemClick = (navi) => {
    navigate(navi);
    onItemClick();
  };

  const handleMouseEnter = () => {
    setIsHighlighted(true);
  };

  const handleMouseLeave = () => {
    setIsHighlighted(false);
  };

  return (
    <>
      {type === "NAV" ? (
        <Container
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}>
          <Title>{title}</Title>
          {isOpen && list && (
            <Dropdown isHighlighted={isHighlighted} isOpen={isOpen}>
              {list.map((item) => (
                <DropdownItem
                  key={item.navi}
                  onClick={() => handleItemClick(item.navi)}>
                  {item.name}
                </DropdownItem>
              ))}
            </Dropdown>
          )}
        </Container>
      ) : (
        <div className="listbar">
          <div className="list_title">{title}</div>
          <div className="list_list">
            {list.map((item) => (
              <div key={item.id} onClick={() => handleItemClick(item.navi)}>
                {item.name}
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default ListBar;
