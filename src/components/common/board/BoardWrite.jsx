import React, { useEffect, useRef, useState } from "react";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import api from "../../../api/api";
import BodyTitle from "../BodyTitle";
import FileUpload from "../fileUpload/FileUpload";
import QuillEditor from "../quillEditor/QuillEditor";

const BoardWrite = () => {
  const navigate = useNavigate();
  const { id, category } = useParams();
  const upperCategory = category.toUpperCase();
  const [formData, setFormData] = useState({
    author: "",
    title: "",
    content: "",
    isEditing: false,
    files: [],
  });
  const titleRef = useRef(null);
  const user = useSelector((state) => state.user);

  useEffect(() => {
    const fetchBoardDetail = async () => {
      if (id) {
        try {
          const response = await api.get(`board/${id}`);
          const { author, title, content, files } = response.data.data;
          setFormData({ author, title, content, isEditing: true, files });
        } catch (error) {
          console.error(error);
        }
      } else if (user) {
        setFormData((prevData) => ({ ...prevData, author: user.name }));
      }
    };

    fetchBoardDetail();
  }, [id, user]);

  const handleContentChange = (content) => {
    setFormData((prevData) => ({ ...prevData, content }));
  };

  const handleSubmit = async () => {
    const { title, author, content, isEditing, files } = formData;

    if (title.trim() === "") {
      alert("제목을 입력해주세요.");
      titleRef.current.focus();
      return;
    }

    try {
      const payload = {
        title,
        author,
        content,
        category: upperCategory,
        files,
      };

      if (isEditing) {
        await api.put(`board/${id}`, payload);
        alert("게시글이 수정되었습니다.");
      } else {
        await api.post(`board/`, payload);
        alert("게시글이 작성되었습니다.");
      }
      navigate(-1);
    } catch (error) {
      console.error("There was an error submitting the form!", error);
      alert("Failed to submit content");
    }
  };

  const handleFilesChange = (newFiles) => {
    setFormData((prevData) => ({
      ...prevData,
      files: newFiles,
    }));
  };

  const handleBackClick = () => {
    navigate("/education-evangelism");
  };

  return (
    <Container>
      <BodyTitle title={formData.isEditing ? "글 수정" : "글 작성"} />
      <FormSection>
        <TitleInputField
          type="text"
          placeholder="제목을 입력하세요"
          value={formData.title}
          ref={titleRef}
          onChange={(e) =>
            setFormData((prevData) => ({ ...prevData, title: e.target.value }))
          }
        />
        <AuthorInputField
          type="text"
          placeholder="작성자"
          value={`작성자: ${formData.author}`}
          readOnly
        />
      </FormSection>
      <FileUpload
        onFilesChange={handleFilesChange}
        maxFiles={2}
        maxSize={10}
        initialFiles={formData.files}
      />
      <EditorContainer>
        <QuillEditor value={formData.content} onChange={handleContentChange} />
      </EditorContainer>
      <ButtonContainer>
        <BackButton onClick={handleBackClick}>목록으로</BackButton>
        <SubmitButton onClick={handleSubmit}>
          {formData.isEditing ? "수정" : "제출"}
        </SubmitButton>
      </ButtonContainer>
    </Container>
  );
};

export default BoardWrite;
// Styled-components for styling
const Container = styled.div`
  padding: 20px;
  background: #fff;
  // background: #353535;
  border-radius: 10px;
`;

const FormSection = styled.div`
  margin-bottom: 20px;
`;

const TitleInputField = styled.input`
  width: 100%;
  padding: 15px;
  margin-bottom: 10px;
  border: none;
  border-bottom: 1px solid #ddd;
  font-size: 18px;
  font-weight: bold;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-bottom: 1px solid #007bff;
  }
`;
const AuthorInputField = styled.input`
  width: 100%;
  padding: 15px;
  margin-bottom: 10px;
  border: none;
  border-bottom: 1px solid #ddd;
  font-size: 18px;
  font-weight: bold;
  box-sizing: border-box;
  &:focus {
    outline: none;
  }
`;

const EditorContainer = styled.div`
  .ql-container {
    height: 400px; // Approx. 20 rows height
    border: solid 1px #ddd;
    background: #fff;
  }

  .ql-editor {
    font-size: 18px; // 글꼴 크기를 18px로 설정
    line-height: 1.6;
  }

  .ql-toolbar.ql-snow {
    border: solid 1px #ddd;
    border-bottom: solid 1px #ddd;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`;

const BackButton = styled.button`
  padding: 12px 20px;
  background-color: transparent;
  border: solid 1px;
  border-radius: 12px;
  color: #1976d2;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #f0f0f0;
  }
`;

const SubmitButton = styled.button`
  padding: 12px 20px;
  background-color: #1976d2;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #155a9a;
  }
`;
