import styled from "styled-components";
import "./Footer.css";
import logo from "../../assets/PCK_Logo.png";
const Footer = () => {
  return (
    <div className="Footer">
      <div className="Footer_text">
        <div className="inquiry">
          <div>Home</div>
          <div>약도 / 주차안내</div>
          <div>이용안내</div>
          <div>개인정보취급방침</div>
          <div>게시판운영원칙</div>
        </div>
        <div className="info">
          <div>전화번호 : 063-237-3927 </div>
          <div>FAX : 063-237-3927 </div>
          <div>주소 : 전라북도 전주시 완산구 백제대로 115번지</div>
        </div>
      </div>
      <div className="link">
        <Logo src={logo} alt="PCK Logo" />
        <div>링크2</div>
      </div>
    </div>
  );
};

export default Footer;
const Logo = styled.img`
  width: 50px; /* 원하는 너비로 조정 */
  height: auto; /* 높이는 자동으로 조정 */
`;
