// BodyTitle.jsx
import React from "react";
import styled from "styled-components";

const BodyTitleContainer = styled.div`
  font-size: 24px;
  font-weight: 700;
  display: flex;
  gap: 12px;
  padding-bottom: 20px;
`;

const Line = styled.span`
  padding: 2px;
  background-color: ${({ theme }) => theme.primaryColor};
`;

const BodyTitle = ({ title }) => {
  return (
    <BodyTitleContainer>
      <Line />
      <div>{title}</div>
    </BodyTitleContainer>
  );
};

export default BodyTitle;
