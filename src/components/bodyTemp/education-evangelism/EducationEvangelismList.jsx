import NavBarList from "../../common/NavBarList";

const EducationEvangelismList = ({ type }) => {
  const list = [
    {
      name: "사무엘 부서",
      navi: "/education-evangelism/samuel",
    },
    {
      name: "다니엘 부서",
      navi: "/education-evangelism/daniel",
    },
    {
      name: "에스더 부서",
      navi: "/education-evangelism/esther",
    },
    {
      name: "청년부 부서",
      navi: "/education-evangelism/youth",
    },
    {
      name: "여전도회 부서",
      navi: "/education-evangelism/women",
    },
    {
      name: "남전도회 부서 I",
      navi: "/education-evangelism/men1",
    },
    {
      name: "남전도회 부서 Ⅱ",
      navi: "/education-evangelism/men1",
    },
  ];

  return <NavBarList title="교육·전도" list={list} type={type} />;
};
export default EducationEvangelismList;
