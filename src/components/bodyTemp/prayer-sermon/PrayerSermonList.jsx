import ListBar from "../../common/ListBar";

const PrayerSermonList = ({ isOpen, onItemClick, type }) => {
  const list = [
    {
      name: "주일예배",
      navi: "/prayerSermonList/sunday-worship",
    },
    {
      name: "수요예배",
      navi: "/prayerSermonList/wednesday-worship",
    },
    {
      name: "주일학교",
      navi: "/prayerSermonList/sunday-school-worship",
    },
    {
      name: "특별예배",
      navi: "/prayerSermonList/special-worship",
    },
    {
      name: "찬양",
      navi: "/prayerSermonList/praise",
      subItems: [
        {
          name: "청년부 찬양",
          navi: "/prayerSermonList/praise/youth",
        },
        {
          name: "다니엘 찬양",
          navi: "/prayerSermonList/praise/daniel",
        },
        {
          name: "사무엘 찬양",
          navi: "/prayerSermonList/praise/samuel",
        },
      ],
    },
    {
      name: "기도",
      navi: "/prayerSermonList/prayer",
    },
    {
      name: "목회자자료",
      navi: "/prayerSermonList/pastor-materials",
    },
  ];

  return (
    <ListBar
      title="말씀 · 기도"
      list={list}
      isOpen={isOpen}
      onItemClick={onItemClick}
      type={type}
    />
  );
};

export default PrayerSermonList;
