import React, { useState, useRef, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import Quill styles
import styled from 'styled-components';
import BodyTitle from '../BodyTitle';
import { useNavigate } from 'react-router-dom';

// Styled-components for styling
const Container = styled.div`
   gap: 12px;
  display: flex;
  flex-direction: column;
  padding: 20px;
  background: #ffffff;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  font-family: 'Arial, sans-serif';
  max-width: 1000px;
`;

const FormSection = styled.div`
  margin-bottom: 20px;
`;

const InputField = styled.input`
  width: 100%;
  padding: 15px;
  margin-bottom: 10px;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  font-size: 20px;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border: 1px solid #1976d2;
  }
`;

const EditorContainer = styled.div`
  .ql-container {
    height: 500px; // Approx. 20 rows height
    border: 1px solid #e0e0e0;
    border-radius: 4px;
  }

  .ql-editor {
    font-size: 16px; // 글꼴 크기를 16px로 설정
    line-height: 1.6;
  }

  .ql-toolbar.ql-snow {
    border: 1px solid #e0e0e0;
    border-bottom: none;
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
  border-radius:12px;
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
  const nav = useNavigate();
  const [author, setAuthor] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const quillRef = useRef(null);

  const handleContentChange = (content) => {
    setContent(content);
  };

  const handleSubmit = () => {
    console.log('Author:', author);
    console.log('Title:', title);
    console.log('Content:', content);
    alert('Content submitted!');
  };

  const handleGoBack = () => {
   nav(-1)
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
      <BodyTitle title={"글작성"} />
      <FormSection>
        <InputField 
          type="text" 
          placeholder="제목을 입력하세요" 
          value={title}
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
        <BackButton onClick={handleGoBack}>목록으로</BackButton>
        <SubmitButton onClick={handleSubmit}>제출</SubmitButton>
      </ButtonContainer>
    </Container>
  );
};

export default BoardWrite;
