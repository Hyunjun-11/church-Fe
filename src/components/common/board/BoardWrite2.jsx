import React, { useState, useRef, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import Quill styles
import styled from 'styled-components';
import BodyTitle from '../BodyTitle';
import { useNavigate } from 'react-router-dom';

// Styled-components for styling
const Container = styled.div`
  padding: 10px;
  border-radius: 10px;
  font-family: 'Arial, sans-serif';
`;

const FormSection = styled.div`
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
`;

const InputField = styled.input`
  padding: 20px;
  margin-bottom: 10px;
  border: none;
  background-color: #fff;
  font-size: 24px;
  font-weight: bold;
  box-sizing: border-box;
  border-bottom: solid 1px;
  width: 20px

  &:focus {
    outline: none;
    border: 1px solid #007bff;
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
    border-bottom: 1px solid #ddd;
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
  const [author, setAuthor] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const quillRef = useRef(null);
  
  const handleContentChange = (content) => {
    setContent(content);
    };
  const nav=useNavigate()
const handleGoBack = () => {
   nav(-1)
  };
  const handleSubmit = () => {
    console.log('Author:', author);
    console.log('Title:', title);
    console.log('Content:', content);
    alert('Content submitted!');
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
