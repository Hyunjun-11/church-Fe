import { useState } from "react";
import InfoList from "../bodyTemp/churchInfo/InfoList";
import CommunityList from "../bodyTemp/community/CommunityList";
import EducationEvangelismList from "../bodyTemp/education-evangelism/EducationEvangelismList";
import GospelResourcesList from "../bodyTemp/gospelResources/GospelResourcesList";
import PrayerSermonList from "../bodyTemp/prayer-sermon/PrayerSermonList";
import TestList from "../bodyTemp/testBar/TestList";
import WorshipInfoList from "../bodyTemp/worshipInfo/WorshipInfoList";
import "./NavigatorBar.css";

const NavigatorBar = () => {
  return (
    <div className="NavigatorBar">
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
export default NavigatorBar;
