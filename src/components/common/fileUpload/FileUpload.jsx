import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import api from "../../../api/api";

const FileUpload = ({ onFilesChange, maxFiles, maxSize, initialFiles }) => {
  const fileInputRef = useRef(null);
  const [totalFileSize, setTotalFileSize] = useState(0);
  const [files, setFiles] = useState([]);

  useEffect(() => {
    const fetchFileSizes = () => {
      if (initialFiles && initialFiles.length > 0) {
        setFiles(
          initialFiles.map((fileObj) => ({
            fileName: fileObj.fileName,
            fileSize: fileObj.fileSize,
          }))
        );
        const initialTotalSize = initialFiles.reduce(
          (acc, fileObj) => acc + fileObj.fileSize,
          0
        );
        setTotalFileSize(initialTotalSize);
      }
    };
    fetchFileSizes();
  }, [initialFiles]);

  const handleFileChange = async (event) => {
    const newFiles = Array.from(event.target.files);
    let newTotalFileSize = totalFileSize;

    for (let file of newFiles) {
      newTotalFileSize += file.size;
      if (newTotalFileSize > maxSize * 1024 * 1024) {
        alert(
          `전체 파일 크기는 ${maxSize / 1024 / 1024}MB를 초과할 수 없습니다.`
        );
        return;
      }
    }

    if (files.length + newFiles.length > maxFiles) {
      alert(`파일은 최대 ${maxFiles}개까지만 업로드할 수 있습니다.`);
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

        successfullyUploadedFiles.push({
          fileName: response.data,
          fileSize: file.size,
        });
      } catch (error) {
        console.error("파일 업로드 중 오류가 발생했습니다.", error);
        alert("파일 업로드 중 오류가 발생했습니다.");
      }
    }

    if (successfullyUploadedFiles.length > 0) {
      const newFileList = [...files, ...successfullyUploadedFiles];
      setFiles(newFileList);
      onFilesChange(newFileList);
      setTotalFileSize(
        newFileList.reduce((acc, fileObj) => acc + fileObj.fileSize, 0)
      );
    }
  };

  const handleFileRemove = async (index) => {
    const fileToRemove = files[index];
    try {
      const response = await api.delete("upload/", {
        params: { fileUrl: fileToRemove.fileName },
      });

      const newFiles = files.filter((_, i) => i !== index);
      setFiles(newFiles);
      setTotalFileSize(
        newFiles.reduce((acc, fileObj) => acc + fileObj.fileSize, 0)
      );
      onFilesChange(newFiles);
    } catch (error) {
      console.error("파일 삭제 중 오류가 발생했습니다.", error);
      alert("파일 삭제 중 오류가 발생했습니다.");
    }
  };

  const formatFileName = (fileName) => {
    const uuidLength = 47;
    return fileName.substring(uuidLength);
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
            {formatFileName(fileObj.fileName)} (
            {(fileObj.fileSize / 1024).toFixed(2)} KB)
            <RemoveButton onClick={() => handleFileRemove(index)}>
              x
            </RemoveButton>
          </FileListItem>
        ))}
      </FileList>
      <FileSizeInfo>
        <div>
          {files.length}/{maxFiles}
        </div>
        총 파일 크기: {(totalFileSize / 1024 / 1024).toFixed(2)} MB / {maxSize}{" "}
        MB
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
  display: flex;
  gap: 1rem;
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
