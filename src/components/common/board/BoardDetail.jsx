import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import api from "../../../api/api";
import useCheckMyBoard from "../../../hooks/useCheckUser";

const BoardDetail = () => {
  const { id, category } = useParams();
  const navigate = useNavigate();
  const [selectedItem, setSelectedItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [fileListOpen, setFileListOpen] = useState(false); // 파일 목록 토글 상태
  const user = useSelector((state) => state.user);
  const checkMyBoard = useCheckMyBoard(selectedItem?.memberId);

  useEffect(() => {
    const fetchBoardDetail = async () => {
      try {
        const response = await api.get(`/board/${id}`);
        setSelectedItem(response.data.data);
      } catch (error) {
        setError("게시글을 불러오는데 실패했습니다.");
        console.error("board detail! error", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBoardDetail();
  }, [id]);

  const handleEditClick = () => {
    if (selectedItem && user && selectedItem.memberId === user.id) {
      navigate(`/education-evangelism/${category}/write/${id}`);
    } else {
      alert("작성자만 수정할 수 있습니다.");
    }
  };

  const handleDeleteClick = async () => {
    if (selectedItem && user && selectedItem.memberId === user.id) {
      try {
        await api.delete(`board/${id}`);
        alert("게시글이 삭제되었습니다.");
        navigate(-1); // 삭제 후 게시판 목록으로 이동
      } catch (error) {
        console.error("There was an error deleting the board!", error);
        alert("게시글 삭제에 실패했습니다.");
      }
    } else {
      alert("작성자만 삭제할 수 있습니다.");
    }
  };

  const handleBackClick = () => {
    navigate(-1); // 게시판 목록 페이지로 이동
  };

  const handleDownload = async (fileName) => {
    if (!user) {
      alert("로그인한 회원만 다운로드 할 수 있습니다.");
    } else {
      try {
        const response = await api.get(
          `upload/downloadFile?fileName=${fileName}`,
          {
            responseType: "blob",
          }
        );
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", formatFileName(fileName)); // download 속성을 설정하여 파일로 다운로드
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } catch (error) {
        console.error("Error fetching file", error);
        alert("파일 다운로드에 실패했습니다.");
      }
    }
  };

  const handleToggleFileList = () => {
    setFileListOpen(!fileListOpen); // 파일 목록 토글
  };

  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>{error}</div>;

  const formatDate = (dateString) => {
    const date = new window.Date(dateString); // 명시적으로 window 객체에서 Date 생성
    return date.toLocaleString(); // 날짜와 시간을 로컬 형식으로 변환
  };
  const formatFileName = (fileName) => {
    const uuidLength = 47;

    return fileName.substring(uuidLength);
  };

  return (
    <BoardDetailContainer>
      <Title>{selectedItem.title}</Title>
      <Info>
        <Author>작성자: {selectedItem.author}</Author>
        <DateStyled>{formatDate(selectedItem.createAt)}</DateStyled>
      </Info>
      {selectedItem.files.length > 0 && (
        <FileSection>
          <FileSectionHeader onClick={handleToggleFileList}>
            첨부파일 모아보기 {fileListOpen ? "▲" : "▼"}
          </FileSectionHeader>
          {fileListOpen && (
            <FileList>
              {/* <FileListHeader>
                <DownloadAllButton onClick={handleDownloadAll}>
                  전체 다운로드
                </DownloadAllButton>
              </FileListHeader> */}
              {selectedItem.files.map((fileUrl, index) => {
                const fileName = fileUrl.fileName; // URL에서 파일 이름 추출
                return (
                  <FileItem key={index}>
                    {formatFileName(fileName)}
                    <DownloadButton onClick={() => handleDownload(fileName)}>
                      다운로드
                    </DownloadButton>
                  </FileItem>
                );
              })}
            </FileList>
          )}
        </FileSection>
      )}
      <Content
        dangerouslySetInnerHTML={{ __html: selectedItem.content }}></Content>
      <ButtonContainer>
        <LeftButtonContainer>
          <BackButton onClick={handleBackClick}>목록으로</BackButton>
        </LeftButtonContainer>
        {checkMyBoard && (
          <RightButtonContainer>
            <Button onClick={handleEditClick}>수정</Button>
            <Button onClick={handleDeleteClick}>삭제</Button>
          </RightButtonContainer>
        )}
      </ButtonContainer>
    </BoardDetailContainer>
  );
};
export default BoardDetail;

const BoardDetailContainer = styled.div`
  position: relative;
  padding: 20px;
  height: 100%;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.02);
`;

const Title = styled.div`
  font-weight: bold;
  font-size: 32px;
  margin-bottom: 20px;
  color: #333;
`;

const Info = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
  color: #777;
  margin-bottom: 40px; /* 제목과 작성자 사이의 간격을 늘리기 위해 변경 */
`;

const Author = styled.div`
  padding-top: 20px;
  font-weight: bold;
`;

const DateStyled = styled.div`
  font-size: 14px;
  color: #777;
`;

const Content = styled.div`
  font-size: 18px;
  line-height: 1.6;
  color: #444;
  padding: 20px 0;
  border-top: 1px solid #ddd;
  // border-bottom: 1px solid #ddd;
  min-height: 10rem;
  margin-bottom: 20px; /* 추가하여 아래 경계선이 맨 아래까지 나오도록 조정 */
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
`;

const LeftButtonContainer = styled.div`
  display: flex;
  gap: 10px;
`;

const RightButtonContainer = styled.div`
  display: flex;
  gap: 10px;
`;

const Button = styled.button`
  background-color: #007bff;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
`;
const BackButton = styled.button`
  padding: 12px 20px;
  background-color: transparent;
  border: solid 1px;
  border-radius: 8px;
  color: #1976d2;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #f0f0f0;
  }
`;
//파일 다운로드
const FileSection = styled.div`
  position: relative;
  margin-top: 20px;
  padding-top: 10px;
`;

const FileSectionHeader = styled.div`
  display: flex;
  margin-bottom: 1rem;
  justify-content: flex-end;
  font-size: 16px;
  cursor: pointer;
  color: #007bff;
  &:hover {
    text-decoration: underline;
  }
`;

const FileList = styled.ul`
  position: absolute;
  top: 35px;
  right: 0;
  display: flex;
  flex-direction: column;
  justify-content: end;
  align-items: end;
  list-style: none;
  padding: 0;
  margin: 0;
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-top: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  z-index: 10;
`;

const FileItem = styled.li`
  display: flex;
  gap: 1rem;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  &:last-child {
    border-bottom: none;
  }
`;

const FileLink = styled.a`
  color: #007bff;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

const DownloadButton = styled.button`
  background-color: #007bff;
  color: white;
  padding: 6px 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
`;

const DownloadAllButton = styled.button`
  background-color: #007bff;
  color: white;
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
`;

const FileListHeader = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 10px;
  padding: 10px;
  background-color: #f9f9f9;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
`;
