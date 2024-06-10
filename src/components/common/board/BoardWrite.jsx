import React, { useState, useRef, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import Quill styles
import styled from 'styled-components';
import BodyTitle from '../BodyTitle';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

// Styled-components for styling
const Container = styled.div`
  padding: 20px;
  background: #fff;
  border-radius: 10px;
  font-family: 'Georgia, serif';
`;

const FormSection = styled.div`
  margin-bottom: 20px;
`;

const InputField = styled.input`
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
    border-bottom: 2px solid #007bff;
  }
`;

const EditorContainer = styled.div`
  .ql-container {
    height: 400px; // Approx. 20 rows height
    border: none;
    background: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  .ql-editor {
    font-size: 18px; // 글꼴 크기를 18px로 설정
    line-height: 1.6;
  }

  .ql-toolbar.ql-snow {
    border: none;
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

const BoardWrite = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // URL 파라미터에서 id 가져오기
  const [author, setAuthor] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const titleRef = useRef(null);
  const quillRef = useRef(null);
  const [isEditing, setIsEditing] = useState(false); // 수정 모드인지 여부를 판단하는 상태

  useEffect(() => {
    if (id) {
      // 수정 모드일 경우 기존 데이터를 불러오기
      const fetchBoardDetail = async () => {
        try {
          const response = await axios.get(`${import.meta.env.VITE_REACT_APP_API_URL}/board/${id}`);
          const { author, title, content } = response.data.data;
          setAuthor(author);
          setTitle(title);
          setContent(content);
          setIsEditing(true);
        } catch (error) {
          console.error('There was an error fetching the board detail!', error);
        }
      };

      fetchBoardDetail();
    }
  }, [id]);

  const handleContentChange = (content) => {
    setContent(content);
  };

  const handleSubmit = async () => {
    if (title.trim() === '') {
      alert('제목을 입력해주세요.');
      titleRef.current.focus();
      return;
    }
    if (quillRef.current.getEditor().getText().trim() === '') {
      alert('내용을 입력해주세요.');
      quillRef.current.getEditor().focus();
      return;
    }

    try {
      if (isEditing) {
        // 수정 모드일 경우 PUT 요청
        await axios.put(`${import.meta.env.VITE_REACT_APP_API_URL}/board/${id}`, {
          title,
          author,
          content
        });
        alert('게시글이 수정되었습니다.');
      } else {
        // 새 글 작성 모드일 경우 POST 요청
        await axios.post(`${import.meta.env.VITE_REACT_APP_API_URL}/board/`, {
          title,
          author,
          content
        });
        alert('게시글이 작성되었습니다.');
      }
      navigate('/test/board');
    } catch (error) {
      console.error('There was an error submitting the form!', error);
      alert('Failed to submit content');
    }
  };

  const handleImageUpload = () => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();

    input.onchange = async () => {
      const file = input.files[0];
      if (file) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          const quill = quillRef.current.getEditor();
          const range = quill.getSelection();
          if (range) {
            quill.insertEmbed(range.index, 'image', reader.result);
            quill.setSelection(range.index + 2); // 이미지 삽입 후 커서 위치 조정
          }
          setContent(quill.root.innerHTML); // State 업데이트
        };
      }
    };
  };

  useEffect(() => {
    const toolbar = quillRef.current.getEditor().getModule('toolbar');
    toolbar.addHandler('image', handleImageUpload);
  }, []);

  const handleBackClick = () => {
    navigate('/test/board'); // 게시판 목록 페이지로 이동
  };

  const modules = {
    toolbar: {
      container: [
        [{ size: [] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
        ['link', 'image'],
      ]
    }
  };

  return (
    <Container>
      <BodyTitle title={isEditing ? '글 수정' : '글 작성'} />
      <FormSection>
        <InputField 
          type="text" 
          placeholder="제목을 입력하세요" 
          value={title}
          ref={titleRef}
          onChange={(e) => setTitle(e.target.value)}
        />
        <InputField 
          type="text" 
          placeholder="작성자" 
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
      </FormSection>
      <EditorContainer>
        <ReactQuill 
          ref={quillRef}
          theme="snow" 
          value={content} 
          onChange={handleContentChange} 
          modules={modules}
        />
      </EditorContainer>
      <ButtonContainer>
        <BackButton onClick={handleBackClick}>목록으로</BackButton>
        <SubmitButton onClick={handleSubmit}>{isEditing ? '수정' : '제출'}</SubmitButton>
      </ButtonContainer>
    </Container>
  );
};

export default BoardWrite;
