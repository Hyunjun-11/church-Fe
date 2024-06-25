import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import api from "../../../api/api";

const MAX_FILES = 2;
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const FileUpload = () => {
  const [files, setFiles] = useState([]);
  const fileInputRef = useRef(null);
  const [totalFileSize, setTotalFileSize] = useState(0);

  const handleFileChange = async (event) => {
    const newFiles = Array.from(event.target.files);
    let newTotalFileSize = totalFileSize;

    for (let file of newFiles) {
      newTotalFileSize += file.size;
      if (newTotalFileSize > MAX_FILE_SIZE) {
        alert("전체 파일 크기는 5MB를 초과할 수 없습니다.");
        return;
      }
    }

    if (files.length + newFiles.length > MAX_FILES) {
      alert("파일은 최대 2개까지만 업로드할 수 있습니다.");
      return;
    }

    let successfullyUploadedFiles = [];

    for (let file of newFiles) {
      const formData = new FormData();
      formData.append("file", file);

      try {
        const response = await api.post("upload/", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        console.log(response.data);
        successfullyUploadedFiles.push({ file, url: response.data }); // 성공적으로 업로드된 파일 추가
      } catch (error) {
        console.error("파일 업로드 중 오류가 발생했습니다.", error);
        alert("파일 업로드 중 오류가 발생했습니다.");
      }
    }

    // 성공적으로 업로드된 파일만 상태 업데이트
    if (successfullyUploadedFiles.length > 0) {
      setFiles((prevFiles) => [...prevFiles, ...successfullyUploadedFiles]);
      setTotalFileSize(newTotalFileSize);
    }
  };

  const handleFileRemove = async (index) => {
    const fileToRemove = files[index];
    try {
      const response = await api.delete("upload/", {
        params: { fileUrl: fileToRemove.url },
      });
      console.log(response.data);
      setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
      setTotalFileSize((prevSize) => prevSize - fileToRemove.file.size);
    } catch (error) {
      console.error("파일 삭제 중 오류가 발생했습니다.", error);
      alert("파일 삭제 중 오류가 발생했습니다.");
    }
  };

  return (
    <Container>
      <HiddenFileInput
        type="file"
        multiple
        ref={fileInputRef}
        onChange={handleFileChange}
      />
      <FileUploadButton onClick={() => fileInputRef.current.click()}>
        파일 업로드
      </FileUploadButton>
      <FileList>
        {files.map((fileObj, index) => (
          <FileListItem key={index}>
            {fileObj.file.name} ({(fileObj.file.size / 1024).toFixed(2)} KB)
            <RemoveButton onClick={() => handleFileRemove(index)}>
              x
            </RemoveButton>
          </FileListItem>
        ))}
      </FileList>
      <FileSizeInfo>
        총 파일 크기: {(totalFileSize / 1024 / 1024).toFixed(2)} MB / 5 MB
      </FileSizeInfo>
    </Container>
  );
};

export default FileUpload;
const Container = styled.div`
  background: #fff;
  border-radius: 10px;
  margin-bottom: 0.7rem;
`;

const HiddenFileInput = styled.input`
  display: none;
`;

const FileUploadButton = styled.button`
  padding: 10px 20px;
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

const FileList = styled.ul`
  margin-top: 10px;
  list-style: none;
  padding: 0;
`;

const FileListItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 16px;
  margin-bottom: 5px;
  padding: 5px 10px;
  background: #f4f4f4;
  border-radius: 5px;
`;
const FileSizeInfo = styled.div`
  margin-top: 10px;
  font-size: 14px;
  color: #666;
`;

const RemoveButton = styled.button`
  background: none;
  border: none;
  color: red;
  cursor: pointer;
  font-size: 16px;
`;
