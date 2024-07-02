import styled from "styled-components";
import BoardLayout from "../../common/board/BoardLayout";

const BoardTest = () => {
  return (
    <div>
      <BoardLayout title={"개발 과정"} category={"DEVELOP"} />
      <EditorInput type="text" placeholder="Type something here..." />
    </div>
  );
};

export default BoardTest;

const EditorInput = styled.input`
  width: 10ch; /* 초기 너비 설정 */
  min-width: 10ch; /* 최소 너비 설정 */
  max-width: 100%; /* 최대 너비 설정 */
  box-sizing: content-box;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  display: inline-block;
  overflow: hidden;
  white-space: nowrap;
`;
