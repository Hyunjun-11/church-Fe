import { useNavigate } from "react-router-dom";
import "./FilterBar.css";
import InfoList from "../Body/churchInfo/InfoList";

const FilterBar = () => {
  const navigate = useNavigate();

  return (
    <div className="FilterBar">
      <InfoList type={"NAV"} />
      <div>
        예배안내
        <div>
          <div>교회비전</div>
          <div>교회표어</div>
          <div>연간행사계획</div>
          <div>함섬 주보</div>
        </div>
      </div>
      <div>
        말씀 기도
        <div>
          <div>주일예배</div>
          <div>수요예배</div>
          <div>주일학교예배</div>
          <div>특별에배자료실</div>
          <div>
            찬양
            <div>청년부 찬양</div>
            <div>다니엘 찬양</div>
            <div>사무엘 찬양</div>
          </div>
          <div>기도</div>
          <div>목회자 자료실</div>
        </div>
      </div>
      <div>
        교육 전도
        <div>
          <div>사무엘 부서</div>
          <div>다니엘 부서</div>
          <div>청년부 부서</div>
          <div>에스더 부서</div>
          <div>여전도회 부서</div>
          <div>남전도회 부서 I</div>
          <div>남전도회 부서 II</div>
        </div>
      </div>
      <div>
        복음자료실
        <div>
          <div>복음에 대하여</div>
          <div>복음 자료실</div>
          <div>전도 자료실</div>
          <div>선교 자료실</div>
        </div>
      </div>
      <div>
        커뮤니티
        <div>
          <div>교회소식</div>
          <div>함섬갤러리</div>
          <div>함섬영상자료실</div>
          <div>암송말씀 자료실</div>
          <div>매일성경</div>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
