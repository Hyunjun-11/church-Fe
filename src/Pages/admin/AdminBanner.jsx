import React, { useState, useRef, useEffect } from "react";
import BodyTitle from "../../components/common/BodyTitle";
import Category from "../../components/common/Category";
import "./AdminBanner.css";
import Button from "../../components/common/Button";
import axios from "axios";

const AdminBanner = () => {
  const categoryList = ["교회소개", "예배안내", "말씀·기도", "교육·전도", "복음자료실", "커뮤니티"];
  const [selectedCategory, setSelectedCategory] = useState(categoryList[0]);
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);
  const [bannerUrl, setBannerUrl] = useState({
    url: "",
    id: ""
  });

  useEffect(() => {
    const fetchCategoryBanner = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_REACT_APP_API_URL}/api/banner/${selectedCategory}`);
        setBannerUrl({ url: response.data.data.url, id: response.data.data.id });
      } catch (error) {
        console.error('Error fetching banner:', error);
      }
    };

    fetchCategoryBanner();
  }, [selectedCategory]);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);

    const userConfirmed = window.confirm(`'${file.name}' 파일을 업로드하시겠습니까?`);
    if (userConfirmed) {
      uploadFile(file);
    } else {
      setSelectedFile(null);
    }
  };

  const handleModifyClick = () => {
    const userConfirmed = window.confirm("수정하시겠습니까?");
    if (userConfirmed) {
      fileInputRef.current.click();
    }
  };

  const uploadFile = async (file) => {
    const formData = new FormData();
    formData.append("categoryName", selectedCategory);
    formData.append("imageFile", file);

    try {
      const response = await axios.put(`${import.meta.env.VITE_REACT_APP_API_URL}/api/banner/${bannerUrl.id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setBannerUrl({ ...bannerUrl, url: response.data.data.url });
      console.log("파일 업로드 성공", response.data);
    } catch (error) {
      console.error("파일 업로드 중 오류 발생", error);
    }
  };

  return (
    <div className="AdminBanner">
      <BodyTitle title={"배너관리"} />
      <Category list={categoryList} onCategoryChange={handleCategoryChange} />
      <div className="BannerImg">
        <img className="AdminBannerInfo" src={bannerUrl.url} alt={selectedCategory} />
      </div>
      <div className="AdminButton">
        <Button title={"수정"} onClick={handleModifyClick} />
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={handleFileChange}
        />
        <Button title={"삭제"} />
      </div>
    </div>
  );
};

export default AdminBanner;
