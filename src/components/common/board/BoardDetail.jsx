import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import api from "../../../api/api";
import useCheckMyBoard from "../../../hooks/useCheckUser";
import InteractionContainer from "../Interaction/InteractionContainer";

const BoardDetail = () => {
  const { id, category } = useParams();
  const navigate = useNavigate();
  const [selectedItem, setSelectedItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [fileListOpen, setFileListOpen] = useState(false);
  const user = useSelector((state) => state.user);
  const checkMyBoard = useCheckMyBoard(selectedItem?.memberId);
  const [likes, setLikes] = useState(0);
  const [hearts, setHearts] = useState(0);
  const [amens, setAmens] = useState(0);
  const [comments, setComments] = useState([]);
  const [commentContent, setCommentContent] = useState("");

  const fetchBoardDetail = async () => {
    try {
      const response = await api.get(`/board/${id}`);
      const data = response.data.data;
      setSelectedItem(data);
      setLikes(data.likes || 0);
      setHearts(data.hearts || 0);
      setAmens(data.prays || 0);
    } catch (error) {
      setError("게시글을 불러오는데 실패했습니다.");
      console.error("board detail! error", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchComments = async () => {
    try {
      const response = await api.get(`boards/${id}/comments`);
      const data = response.data.data;
      setComments(data);
    } catch (error) {
      console.error("Failed to fetch comments", error);
    }
  };

  useEffect(() => {
    fetchBoardDetail();
    fetchComments();
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
        navigate(-1);
      } catch (error) {
        console.error("There was an error deleting the board!", error);
        alert("게시글 삭제에 실패했습니다.");
      }
    } else {
      alert("작성자만 삭제할 수 있습니다.");
    }
  };

  const handleBackClick = () => {
    navigate(-1);
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
        link.setAttribute("download", formatFileName(fileName));
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
    setFileListOpen(!fileListOpen);
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      alert("로그인한 회원만 댓글을 작성할 수 있습니다.");
      return;
    }

    try {
      await api.post(`boards/${id}/comments`, { content: commentContent });
      setCommentContent("");
      fetchComments();
    } catch (error) {
      console.error("Failed to post comment", error);
    }
  };

  const handleInputChange = (e) => {
    const input = e.target.value;
    if (input.length <= 120) {
      setCommentContent(input);
    }
  };

  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>{error}</div>;

  const formatDate = (dateString) => {
    const date = new window.Date(dateString);
    return date.toLocaleString();
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
              {selectedItem.files.map((fileUrl, index) => {
                const fileName = fileUrl.fileName;
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
      <InteractionContainer
        boardId={id}
        likes={likes}
        hearts={hearts}
        amens={amens}
        fetchDetail={fetchBoardDetail}
      />
      <CommentContainer>
        <FormContainer onSubmit={handleCommentSubmit}>
          <TextAreaContainer>
            <TextArea
              value={commentContent}
              onChange={handleInputChange}
              placeholder="댓글을 입력하세요"
              required
            />
            <CharCounter>{commentContent.length}/120</CharCounter>
          </TextAreaContainer>
          <SubmitButton type="submit">댓글 작성</SubmitButton>
        </FormContainer>
        <CommentListContainer>
          {comments.map((comment) => (
            <CommentItem key={comment.id}>
              <CommentHeader>
                <CommentAuthor>{comment.author}</CommentAuthor>
                <CommentDate>{formatDate(comment.createAt)}</CommentDate>
              </CommentHeader>
              <CommentContent>{comment.content}</CommentContent>
            </CommentItem>
          ))}
        </CommentListContainer>
      </CommentContainer>
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
  display: flex;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.02);
  flex-direction: column;
  gap: 1rem;
`;

const Title = styled.div`
  font-weight: bold;
  font-size: 32px;
  margin-bottom: 20px;
  color: #333;
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  align-items: end;
  font-size: 14px;
  color: #777;
  margin-bottom: 40px;
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
  border-top: 2px solid #ddd;
  min-height: 10rem;
  margin-bottom: 20px;
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

const CommentContainer = styled.div`
  width: 100%;
  margin-top: 20px;
`;

const TextAreaContainer = styled.div`
  position: relative;
  width: 100%;
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 16px;
  resize: none; /* 크기 조절 비활성화 */
  min-height: 100px;
  box-sizing: border-box;
`;

const CharCounter = styled.div`
  font-size: 12px;
  color: #777;
  position: absolute;
  bottom: 10px;
  right: 10px;
`;

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 20px;
`;

const SubmitButton = styled.button`
  align-self: flex-end;
  background-color: #007bff;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.5s ease;

  &:hover {
    background-color: #0056b3;
  }
`;

const CommentListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const CommentItem = styled.div`
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background: #f9f9f9;
`;
const CommentHeader = styled.div`
  display: flex;
  // justify-content: space-between;
  align-items: center;
  gap: 1rem;
  margin-bottom: 5px;
`;

const CommentAuthor = styled.div`
  font-weight: bold;
`;

const CommentDate = styled.div`
  font-size: 12px;
  color: #777;
`;

const CommentContent = styled.div`
  margin-bottom: 5px;
  line-height: 1.4;
`;
