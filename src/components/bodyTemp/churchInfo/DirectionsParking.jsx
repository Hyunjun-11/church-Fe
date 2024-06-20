import React from "react";
import BodyTitle from "../../common/BodyTitle";
import styled from "styled-components";

const Container = styled.div`
  // padding: 20px;
  max-width: 800px;
  font-family: Arial, sans-serif;
`;

const SectionTitle = styled.h2`
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 10px;
  color: #333;
`;

const InfoText = styled.p`
  font-size: 16px;
  line-height: 1.5;
  margin-bottom: 20px;
  color: #666;
`;

const BusInfo = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

const BusLabel = styled.div`
  font-size: 18px;
  font-weight: 700;
  margin-right: 5px;
`;

const MapContainer = styled.div`
  margin-top: 20px;
`;

const StyledIframe = styled.iframe`
  width: 100%;
  height: 450px;
  border: 2px solid #ccc;
  border-radius: 5px;
`;

const DirectionsParking = () => {
  return (
    <Container>
      <BodyTitle title={"오시는길"} />
      <div>
        <SectionTitle>주소</SectionTitle>
        <InfoText>전라북도 전주시 완산구 백제대로 115번지</InfoText>

        <SectionTitle>주차 정보</SectionTitle>
        <InfoText>아직 정보 없음.</InfoText>

        <SectionTitle>지도</SectionTitle>
        <MapContainer>
          <StyledIframe
            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d4488.948808916745!2d127.12466572166002!3d35.803023038410956!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x35703b34e8b12ef3%3A0x5a2abc669e241ba5!2z7ZWo6ruYIOyErOq4sOuKlCDqtZDtmow!5e0!3m2!1sko!2skr!4v1718351816387!5m2!1sko!2skr"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"></StyledIframe>
        </MapContainer>
      </div>
    </Container>
  );
};

export default DirectionsParking;
