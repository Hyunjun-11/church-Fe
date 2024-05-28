import React, { useState } from "react";
import BodyTitle from "../../components/common/BodyTitle";
import Category from "../../components/common/Category";
import "./AdminBanner.css";
import Button from "../../components/common/Button";

const AdminBanner = () => {
  const categoryList = ["교회소개", "예배안내", "말씀·기도", "교육·전도", "복음자료실", "커뮤니티"];
  const [selectedCategory, setSelectedCategory] = useState(categoryList[0]);

  const handleCategoryChange = (category) => {
    console.log(category);
    setSelectedCategory(category);
  };

  const getImageSrc = (category) => {
    switch (category) {
      case "교회소개":
        return "https://storage.googleapis.com/church_image_demo_11/KakaoTalk_20240528_233928010_01.jpg";
      case "예배안내":
        return "https://storage.googleapis.com/church_image_demo_11/KakaoTalk_20240528_233928010_02.jpg";
      case "말씀·기도":
        return "https://storage.googleapis.com/church_image_demo_11/KakaoTalk_20240528_233928010_08.jpg";
      case "교육·전도":
        return "https://storage.googleapis.com/church_image_demo_11/KakaoTalk_20240528_233928010_04.jpg";
      case "복음자료실":
        return "https://storage.googleapis.com/church_image_demo_11/KakaoTalk_20240528_233928010_05.jpg";
      case "커뮤니티":
        return "https://storage.googleapis.com/church_image_demo_11/KakaoTalk_20240528_233928010_06.jpg";
      default:
        return "https://storage.googleapis.com/church_image_demo_11/KakaoTalk_20240528_233928010_07.jpg";
    }
  };

  return (
    <div className="AdminBanner">
      <BodyTitle title={"배너"} />
      <Category list={categoryList} onCategoryChange={handleCategoryChange} />
      <div className="BannerImg">
        <img className="AdminBannerInfo" src={getImageSrc(selectedCategory)} alt={selectedCategory} />
      </div>
      <div className="AdminButton">
        <Button title={"수정"} />
        <Button title={"삭제"} />
      </div>
    </div>
  );
};

export default AdminBanner;
