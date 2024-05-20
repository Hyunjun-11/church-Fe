import { Outlet } from "react-router-dom";
import "./InfoLayout.css";
const InfoLayout = () => {
  return (
    <div className="InfoLayout">
      <div className="Info">
        <div>
          <div>교회소개</div>
          <div>인삿말</div>
          <div>약도/주차안내</div>
          <div>새가족안내</div>
          <div>섬기는분들</div>
          <div>교회조직</div>
        </div>
        <div>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default InfoLayout;
