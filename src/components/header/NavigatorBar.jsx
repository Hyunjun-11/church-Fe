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
  const [isOpen, setIsOpen] = useState(false);

  const handleMouseEnter = () => {
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    setIsOpen(false);
  };

  const handleItemClick = () => {
    setIsOpen(false);
  };

  return (
    <div
      className="NavigatorBar"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}>
      <TestList isOpen={isOpen} onItemClick={handleItemClick} type={"NAV"} />
      <InfoList isOpen={isOpen} onItemClick={handleItemClick} type={"NAV"} />
      <WorshipInfoList
        isOpen={isOpen}
        onItemClick={handleItemClick}
        type={"NAV"}
      />
      <PrayerSermonList
        isOpen={isOpen}
        onItemClick={handleItemClick}
        type={"NAV"}
      />
      <EducationEvangelismList
        isOpen={isOpen}
        onItemClick={handleItemClick}
        type={"NAV"}
      />
      <GospelResourcesList
        isOpen={isOpen}
        onItemClick={handleItemClick}
        type={"NAV"}
      />
      <CommunityList
        isOpen={isOpen}
        onItemClick={handleItemClick}
        type={"NAV"}
      />
    </div>
  );
};

export default NavigatorBar;
