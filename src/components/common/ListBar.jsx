import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled, { css } from "styled-components";
import "./NavBarList.css";

const Container = styled.div`
  display: inline-block;
  position: relative;
  width: 100%;
  text-align: center;
  color: white;
`;

const Title = styled.div`
  cursor: pointer;
  padding: 1rem 0px;
  background-color: ${({ theme }) => theme.primaryColor};
  font-weight: 500;
  transition: background-color 0.3s ease;
`;

const Dropdown = styled.div.attrs(({ isHighlighted, isOpen }) => ({
  "data-highlighted": isHighlighted,
  "data-open": isOpen,
}))`
  position: absolute;
  font-size: 1.2rem;
  background-color: #26a1e4;
  z-index: 1000;
  width: 100%;
  height: 320px;
  overflow-y: auto;
  transition: opacity 0.3s ease, transform 0.3s ease;
  opacity: ${({ isOpen }) => (isOpen ? "1" : "0")};
  transform: ${({ isOpen }) =>
    isOpen ? "translateY(0)" : "translateY(-20px)"};
  ${({ "data-highlighted": isHighlighted }) =>
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

const ListBar = ({ title, list, isOpen, onItemClick = () => {}, type }) => {
  const navigate = useNavigate();
  const [isHighlighted, setIsHighlighted] = useState(false);

  const handleItemClick = (navi) => {
    navigate(navi);
    if (onItemClick) {
      onItemClick();
    }
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
                  key={item.id} // 고유한 key 속성 추가
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
              <div key={item.navi} onClick={() => handleItemClick(item.navi)}>
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
