import NavBarList from "../../common/NavBarList";

const PrayerSermonList = ({ type }) => {
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
      name: "주일학교예배",
      navi: "/prayerSermonList/sunday-school-worship",
    },
    {
      name: "특별예배자료실",
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
      name: "목회자 자료실",
      navi: "/prayerSermonList/pastor-materials",
    },
  ];

  return <NavBarList title="말씀 · 기도" list={list} type={type} />;
};

export default PrayerSermonList;
