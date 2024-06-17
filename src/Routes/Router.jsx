import { Route, Routes, useLocation } from "react-router-dom";
import SignUpSuccess from "../Pages/user/login/SignUpSuccess";
import ChurchGuide from "../components/bodyTemp/churchInfo/ChurchGuide";
import ChurchInfo from "../components/bodyTemp/churchInfo/ChurchInfo";
import ChurchOrganization from "../components/bodyTemp/churchInfo/ChurchOrganization";
import DirectionsParking from "../components/bodyTemp/churchInfo/DirectionsParking";
import Greeting from "../components/bodyTemp/churchInfo/Greeting";
import InfoList from "../components/bodyTemp/churchInfo/InfoList";
import NewMembers from "../components/bodyTemp/churchInfo/NewMembers";
import BibleReading from "../components/bodyTemp/community/BibleReading";
import BibleRecitation from "../components/bodyTemp/community/BibleRecitation";
import ChurchNews from "../components/bodyTemp/community/ChurchNews";
import CommunityList from "../components/bodyTemp/community/CommunityList";
import Dailybible from "../components/bodyTemp/community/Dailybible";
import ImageResource from "../components/bodyTemp/community/ImageResource";
import VideoResource from "../components/bodyTemp/community/VideoResource";
import Daniel from "../components/bodyTemp/education-evangelism/Daniel";
import EducationEvangelismList from "../components/bodyTemp/education-evangelism/EducationEvangelismList";
import Esther from "../components/bodyTemp/education-evangelism/Esther";
import Men1 from "../components/bodyTemp/education-evangelism/Men1";
import Men2 from "../components/bodyTemp/education-evangelism/Men2";
import Samuel from "../components/bodyTemp/education-evangelism/Samuel";
import Women from "../components/bodyTemp/education-evangelism/Women";
import Youth from "../components/bodyTemp/education-evangelism/Youth";
import About from "../components/bodyTemp/gospelResources/About";
import EvangelismMaterials from "../components/bodyTemp/gospelResources/EvangelismMaterials";
import GospelResourcesList from "../components/bodyTemp/gospelResources/GospelResourcesList";
import Materials from "../components/bodyTemp/gospelResources/Materials";
import MissionMaterials from "../components/bodyTemp/gospelResources/MissionMaterials";
import Layout from "../components/bodyTemp/layout/Layout";
import PastorMaterials from "../components/bodyTemp/prayer-sermon/PastorMaterials";
import PraiseDaniel from "../components/bodyTemp/prayer-sermon/PraiseDaniel";
import PraiseSamuel from "../components/bodyTemp/prayer-sermon/PraiseSamuel";
import PraiseYouth from "../components/bodyTemp/prayer-sermon/PraiseYouth";
import Prayer from "../components/bodyTemp/prayer-sermon/Prayer";
import PrayerSermonList from "../components/bodyTemp/prayer-sermon/PrayerSermonList";
import SpecialWorship from "../components/bodyTemp/prayer-sermon/SpecialWorship";
import SundaySchoolWorship from "../components/bodyTemp/prayer-sermon/SundaySchoolWorship";
import SundayWorship from "../components/bodyTemp/prayer-sermon/SundayWorship";
import WednesdayWorship from "../components/bodyTemp/prayer-sermon/WednesdayWorship";
import BoardTest from "../components/bodyTemp/testBar/BoardTest";
import CalTest from "../components/bodyTemp/testBar/CalTest";
import ImageBoardTest from "../components/bodyTemp/testBar/ImageBoardTest";
import TestList from "../components/bodyTemp/testBar/TestList";
import Bulletin from "../components/bodyTemp/worshipInfo/Bulletin";
import ChurchSchedule from "../components/bodyTemp/worshipInfo/ChurchSchedule";
import EventAlbum from "../components/bodyTemp/worshipInfo/EventAlbum";
import Slogan from "../components/bodyTemp/worshipInfo/Slogan";
import Vision from "../components/bodyTemp/worshipInfo/Vision";
import WorshipInfoList from "../components/bodyTemp/worshipInfo/WorshipInfoList";
import BoardDetail from "../components/common/board/BoardDetail";
import BoardWrite from "../components/common/board/BoardWrite";
import ImageBoardDetail from "../components/common/imageBoard/ImageBoardDetail";
import Footer from "../components/footer/Footer";
import Header from "../components/header/Header";

const Router = () => {
  const location = useLocation();
  const authPages = [];
  const isAuthPage = authPages.includes(location.pathname);
  return (
    <>
      {!isAuthPage && <Header />}
      <Routes>
        <Route
          path="/"
          element={
            <Layout name={"교회소개"} ListComponent={TestList} />
          }></Route>
        <Route path="/">
          {/* <Route path="login" element={<Login />}></Route> */}
          {/* <Route path="signup" element={<Signup />}></Route> */}
          <Route path="signup-success" element={<SignUpSuccess />} />
        </Route>

        {/* churchInfo */}
        <Route
          path="info"
          element={<Layout name={"교회소개"} ListComponent={InfoList} />}>
          <Route path="intro" element={<ChurchInfo />}></Route>
          <Route path="organization" element={<ChurchOrganization />}></Route>
          <Route path="parking" element={<DirectionsParking />}></Route>
          <Route path="greeting" element={<Greeting />}></Route>
          <Route path="newMember" element={<NewMembers />}></Route>
          <Route path="guide" element={<ChurchGuide />}></Route>
        </Route>
        {/* Community */}
        <Route
          path="community"
          element={<Layout name={"커뮤니티"} ListComponent={CommunityList} />}>
          <Route path="news" element={<ChurchNews />}></Route>
          <Route path="gallery" element={<ImageResource />}></Route>
          <Route path="videos" element={<VideoResource />}></Route>
          <Route path="bibleRecitation" element={<BibleRecitation />}></Route>
          <Route path="bibleReading" element={<BibleReading />}></Route>
          <Route path="dailybible" element={<Dailybible />}></Route>
        </Route>
        {/* worship */}
        <Route
          path="worship"
          element={
            <Layout name={"예배안내"} ListComponent={WorshipInfoList} />
          }>
          <Route path="vision" element={<Vision />} />
          <Route path="slogan" element={<Slogan />} />
          <Route path="event-album" element={<EventAlbum />} />
          <Route path="Church-schedule" element={<ChurchSchedule />} />
          <Route path="bulletin" element={<Bulletin />} />
        </Route>
        {/*  education evangelism  */}
        <Route
          path="education-evangelism"
          element={
            <Layout
              name={"교육·전도"}
              ListComponent={EducationEvangelismList}
            />
          }>
          <Route path="samuel" element={<Samuel />} />
          <Route path="daniel" element={<Daniel />} />
          <Route path="youth" element={<Youth />} />
          <Route path="esther" element={<Esther />} />
          <Route path="women" element={<Women />} />
          <Route path="men1" element={<Men1 />} />
          <Route path="men2" element={<Men2 />} />
        </Route>
        {/* gospel resources */}
        <Route
          path="gospel-resources"
          element={
            <Layout name={"복음자료실"} ListComponent={GospelResourcesList} />
          }>
          <Route path="about" element={<About />} />
          <Route path="materials" element={<Materials />} />
          <Route
            path="evangelism-materials"
            element={<EvangelismMaterials />}
          />
          <Route path="mission-materials" element={<MissionMaterials />} />
        </Route>
        {/*prayerSermonList */}
        <Route
          path="prayerSermonList"
          element={
            <Layout name={"말씀·기도"} ListComponent={PrayerSermonList} />
          }>
          <Route path="sunday-worship" element={<SundayWorship />} />
          <Route path="wednesday-worship" element={<WednesdayWorship />} />
          <Route
            path="sunday-school-worship"
            element={<SundaySchoolWorship />}
          />
          <Route path="special-worship" element={<SpecialWorship />} />
          <Route path="praise" element={<PraiseYouth />} />
          <Route path="praise/youth" element={<PraiseYouth />} />
          <Route path="praise/daniel" element={<PraiseDaniel />} />
          <Route path="praise/samuel" element={<PraiseSamuel />} />
          <Route path="prayer" element={<Prayer />} />
          <Route path="pastor-materials" element={<PastorMaterials />} />
        </Route>
        {/*test */}
        <Route
          path="test"
          element={<Layout name={"교회소개"} ListComponent={TestList} />}>
          <Route path="board" element={<BoardTest />} />
          <Route path="board/:id" element={<BoardDetail />} />
          <Route path="board/write" element={<BoardWrite />} />
          <Route path="board/edit/:id" element={<BoardWrite />} />
          <Route path="imageboard" element={<ImageBoardTest />} />
          <Route path="imageboard/:id" element={<ImageBoardDetail />} />
          <Route path="cal" element={<CalTest />} />
        </Route>
      </Routes>
      {!isAuthPage && <Footer />}
    </>
  );
};

export default Router;
