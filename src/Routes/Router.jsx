import { Route, Routes } from "react-router-dom";
import Home from "../Pages/Home";
import ChurchGuide from "../components/bodyTemp/churchInfo/ChurchGuide";
import ChurchInfo from "../components/bodyTemp/churchInfo/ChurchInfo";
import ChurchOrganization from "../components/bodyTemp/churchInfo/ChurchOrganization";
import DirectionsParking from "../components/bodyTemp/churchInfo/DirectionsParking";
import Greeting from "../components/bodyTemp/churchInfo/Greeting";
import NewMembers from "../components/bodyTemp/churchInfo/NewMembers";
import Footer from "../components/footer/Footer";
import Header from "../components/header/Header";
import Layout from "../components/bodyTemp/layout/Layout";
import CommunityList from "../components/bodyTemp/community/CommunityList";
import InfoList from "../components/bodyTemp/churchInfo/InfoList";
import BibleReading from "../components/bodyTemp/community/BibleReading";
import Dailybible from "../components/bodyTemp/community/Dailybible";
import BibleRecitation from "../components/bodyTemp/community/BibleRecitation";
import VideoResource from "../components/bodyTemp/community/VideoResource";
import ImageResource from "../components/bodyTemp/community/ImageResource";
import ChurchNews from "../components/bodyTemp/community/ChurchNews";
import WorshipInfoList from "../components/bodyTemp/worshipInfo/WorshipInfoList";
import Vision from "../components/bodyTemp/worshipInfo/Vision";
import Slogan from "../components/bodyTemp/worshipInfo/Slogan";
import AnnualPlan from "../components/bodyTemp/worshipInfo/AnnualPlan";
import Bulletin from "../components/bodyTemp/worshipInfo/Bulletin";
import EducationEvangelismList from "../components/bodyTemp/education-evangelism/EducationEvangelismList";
import Samuel from "../components/bodyTemp/education-evangelism/Samuel";
import Daniel from "../components/bodyTemp/education-evangelism/Daniel";
import Youth from "../components/bodyTemp/education-evangelism/Youth";
import Esther from "../components/bodyTemp/education-evangelism/Esther";
import Women from "../components/bodyTemp/education-evangelism/Women";
import Men1 from "../components/bodyTemp/education-evangelism/Men1";
import Men2 from "../components/bodyTemp/education-evangelism/Men2";
import GospelResourcesList from "../components/bodyTemp/gospelResources/GospelResourcesList";
import Materials from "../components/bodyTemp/gospelResources/Materials";
import EvangelismMaterials from "../components/bodyTemp/gospelResources/EvangelismMaterials";
import MissionMaterials from "../components/bodyTemp/gospelResources/MissionMaterials";
import About from "../components/bodyTemp/gospelResources/About";
import PrayerSermonList from "../components/bodyTemp/prayer-sermon/PrayerSermonList";
import Prayer from "../components/bodyTemp/prayer-sermon/Prayer";
import PastorMaterials from "../components/bodyTemp/prayer-sermon/PastorMaterials";
import PraiseDaniel from "../components/bodyTemp/prayer-sermon/PraiseDaniel";
import PraiseSamuel from "../components/bodyTemp/prayer-sermon/PraiseSamuel";
import PraiseYouth from "../components/bodyTemp/prayer-sermon/PraiseYouth";
import SpecialWorship from "../components/bodyTemp/prayer-sermon/SpecialWorship";
import SundaySchoolWorship from "../components/bodyTemp/prayer-sermon/SundaySchoolWorship";
import WednesdayWorship from "../components/bodyTemp/prayer-sermon/WednesdayWorship";
import SundayWorship from "../components/bodyTemp/prayer-sermon/SundayWorship";
import TestList from "../components/bodyTemp/TestList";
import TestComponent from "../components/bodyTemp/TestComponent";

const Router = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        {/* churchInfo */}
        <Route path="info" element={<Layout ListComponent={InfoList} />}>
          <Route path="intro" element={<ChurchInfo />}></Route>
          <Route path="organization" element={<ChurchOrganization />}></Route>
          <Route path="parking" element={<DirectionsParking />}></Route>
          <Route path="greeting" element={<Greeting />}></Route>
          <Route path="newMember" element={<NewMembers />}></Route>
          <Route path="guide" element={<ChurchGuide />}></Route>
        </Route>
        {/* Community */}
        <Route path="community" element={<Layout ListComponent={CommunityList} />}>
          <Route path="news" element={<ChurchNews />}></Route>
          <Route path="gallery" element={<ImageResource />}></Route>
          <Route path="videos" element={<VideoResource />}></Route>
          <Route path="bibleRecitation" element={<BibleRecitation />}></Route>
          <Route path="bibleReading" element={<BibleReading />}></Route>
          <Route path="dailybible" element={<Dailybible />}></Route>
        </Route>
        {/* worship */}
        <Route path="worship" element={<Layout ListComponent={WorshipInfoList} />}>
          <Route path="vision" element={<Vision />} />
          <Route path="slogan" element={<Slogan />} />
          <Route path="annual-plan" element={<AnnualPlan />} />
          <Route path="bulletin" element={<Bulletin />} />
        </Route>
        {/*  education evangelism  */}
        <Route path="education-evangelism" element={<Layout ListComponent={EducationEvangelismList} />}>
          <Route path="samuel" element={<Samuel />} />
          <Route path="daniel" element={<Daniel />} />
          <Route path="youth" element={<Youth />} />
          <Route path="esther" element={<Esther />} />
          <Route path="women" element={<Women />} />
          <Route path="men1" element={<Men1 />} />
          <Route path="men2" element={<Men2 />} />
        </Route>
        {/* gospel resources */}
        <Route path="gospel-resources" element={<Layout ListComponent={GospelResourcesList} />}>
          <Route path="about" element={<About />} />
          <Route path="materials" element={<Materials />} />
          <Route path="evangelism-materials" element={<EvangelismMaterials />} />
          <Route path="mission-materials" element={<MissionMaterials />} />
        </Route>
        {/*prayerSermonList */}
        <Route path="prayerSermonList" element={<Layout ListComponent={PrayerSermonList} />}>
          <Route path="sunday-worship" element={<SundayWorship />} />
          <Route path="wednesday-worship" element={<WednesdayWorship />} />
          <Route path="sunday-school-worship" element={<SundaySchoolWorship />} />
          <Route path="special-worship" element={<SpecialWorship />} />
          <Route path="praise" element={<PraiseYouth />} />
          <Route path="praise/youth" element={<PraiseYouth />} />
          <Route path="praise/daniel" element={<PraiseDaniel />} />
          <Route path="praise/samuel" element={<PraiseSamuel />} />
          <Route path="prayer" element={<Prayer />} />
          <Route path="pastor-materials" element={<PastorMaterials />} />
        </Route>
        {/*prayerSermonList */}
        <Route path="test" element={<Layout ListComponent={TestList} />}>
          <Route path="1" element={<div>테스트1</div>} />
          <Route path="2" element={<div>테스트2</div>} />
          <Route path="3" element={<TestComponent />} />

          <Route path="test" element={<div>테스트</div>} />
          <Route path="test/1" element={<div>하위 테스트1</div>} />
          <Route path="test/2" element={<div>하위 테스트2</div>} />
          <Route path="test/3" element={<div>하위 테스트3</div>} />
        </Route>
      </Routes>
      <Footer />
    </>
  );
};

export default Router;
