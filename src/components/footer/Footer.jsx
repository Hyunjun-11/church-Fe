import styled from "styled-components";
import logo from "../../assets/PCK_Logo.png";

const Footer = () => {
  return (
    <FooterContainer>
      <FooterText>
        <Section>
          <div>Home</div>
          <div>약도 / 주차안내</div>
          <div>이용안내</div>
          <div>개인정보취급방침</div>
          <div>게시판운영원칙</div>
        </Section>
        <Section>
          <div>전화번호 : 063-237-3927 </div>
          <div>전화번호 : 063-237-3927 </div>
          <div>FAX : 063-237-3927 </div>
        </Section>
        <Section>
          <div>주소 : 전라북도 전주시 완산구 백제대로 115번지</div>
        </Section>
      </FooterText>
      <FooterLink>
        <Logo src={logo} alt="PCK Logo" />
      </FooterLink>
    </FooterContainer>
  );
};

export default Footer;

const FooterContainer = styled.div`
  background-color: #f8f9fa;
  padding: 20px;
  font-size: 14px;
  color: #333;
  border-top: 1px solid #dee2e6;
  display: flex;
  justify-content: space-between;
`;

const FooterText = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const Section = styled.div`
  display: flex;
  padding: 0 20px;
  // border-right: 1px solid #dee2e6;

  &:last-child {
    border-right: none;
  }

  div {
    position: relative;
    margin-bottom: 5px;
    // padding-left: 10px;

    &:before {
      content: "";
      display: inline-block;
      width: 1px;
      height: 12px;
      background-color: #d3d5d7;
      margin: 0 10px;
      vertical-align: -1px;
    }

    &:first-child:before {
      content: none;
    }
  }
`;

const FooterLink = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
`;

const Logo = styled.img`
  width: 50px; /* 원하는 너비로 조정 */
  height: auto; /* 높이는 자동으로 조정 */
`;
