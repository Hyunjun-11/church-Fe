import TestList from "../bodyTemp/TestList";
import InfoList from "../bodyTemp/churchInfo/InfoList";
import CommunityList from "../bodyTemp/community/CommunityList";
import EducationEvangelismList from "../bodyTemp/education-evangelism/EducationEvangelismList";
import GospelResourcesList from "../bodyTemp/gospelResources/GospelResourcesList";
import PrayerSermonList from "../bodyTemp/prayer-sermon/PrayerSermonList";
import WorshipInfoList from "../bodyTemp/worshipInfo/WorshipInfoList";
import "./FilterBar.css";

const FilterBar = () => {
  return (
    <div className="FilterBar">
      <TestList type={"NAV"} />
      <InfoList type={"NAV"} />
      <WorshipInfoList type={"NAV"} />
      <PrayerSermonList type={"NAV"} />
      <EducationEvangelismList type={"NAV"} />
      <GospelResourcesList type={"NAV"} />
      <CommunityList type={"NAV"} />
    </div>
  );
};

export default FilterBar;
