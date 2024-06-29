import React from "react";
import styled from "styled-components";
import BodyTitle from "../../common/BodyTitle";

const ChurchInfo = () => {
  return (
    <Container>
      <BodyTitle title={"인사말"} />

      <Section>
        <Text>
          함께 섬기는 교회는 그리스도 안에서 완전한 자로 세움을 받아 함께
          하나님을 사랑하고, 함께 이웃을 섬기고, 함께 제자되는 교회가 되는데
          사명을 가지고 2010년 4월 11일에 창립예배를 드렸습니다. 이후
          여름성경학교와 수련회를 통하여 교회학교를 세워나갔으며, 현재는
          주일학교 사무엘반 중고등 부 다니엘반 대학부 및 장년부에 이르기까지
          전교인이 큐티를 생활화함으로써 말씀을 가까이 하고 사랑하여 말씀에
          기초를 두는 사역을 하고 있습니다.
        </Text>
        <List>
          <ListItem>
            함께 섬기는 교회는 평신도 사역을 세우며, 사람을 세우는 일에
            집중한다.
          </ListItem>
          <ListItem>
            함께 섬기는 교회는 말씀에 충실한 건강한 교회로 성장해 가는 것에
            역점을 둔다.
          </ListItem>
          <ListItem>함께 섬기는 교회는 믿음의 공동체를 추구한다.</ListItem>
          <ListItem>함께 섬기는 교회는 선교지향적이다.</ListItem>
        </List>
      </Section>
    </Container>
  );
};

export default ChurchInfo;
const Container = styled.div`
  // background-color: #f9f9f9;
  border-radius: 10px;
  // box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin: 0 auto;
`;

const Section = styled.div`
  padding: 12px;
  margin-top: 20px;
`;

const Text = styled.p`
  font-size: 16px;
  line-height: 1.6;
  color: #333;
`;

const List = styled.div`
  margin-top: 20px;
  padding-left: 20px;
`;

const ListItem = styled.div`
  margin-bottom: 10px;
  font-size: 16px;
  color: #555;
  &:before {
    content: "•";
    color: #007bff;
    font-weight: bold;
    display: inline-block;
    width: 1em;
    margin-left: -1em;
  }
`;
