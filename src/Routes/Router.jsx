import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../Pages/Home";
import Main from "../components/Main/Main";
import ChurchInfo from "../components/Body/churchInfo/ChurchInfo";
import ChurchOrganization from "../components/Body/churchInfo/ChurchOrganization";
import DirectionsParking from "../components/Body/churchInfo/DirectionsParking";
import Greeting from "../components/Body/churchInfo/Greeting";
import NewMembers from "../components/Body/churchInfo/NewMembers";
import ChurchGuide from "../components/Body/churchInfo/ChurchGuide";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import InfoLayout from "../components/Body/layout/InfoLayout";

const Router = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />}></Route>
      </Routes>
      {/* churchInfo */}
      <Routes>
        <Route path="info" element={<InfoLayout />}>
          <Route path="intro" element={<ChurchInfo />}></Route>
          <Route path="organization" element={<ChurchOrganization />}></Route>
          <Route path="parking" element={<DirectionsParking />}></Route>
          <Route path="greeting" element={<Greeting />}></Route>
          <Route path="newMember" element={<NewMembers />}></Route>
          <Route path="guide" element={<ChurchGuide />}></Route>
        </Route>
      </Routes>
      <Footer />
    </>
  );
};

export default Router;
