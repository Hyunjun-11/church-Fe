import TestBar from "../common/TestBar";

const TestList = ({ type }) => {
  const list = [
    {
      name: "테스트1",
      navi: "/test/1",
    },
    {
      name: "테스트2",
      navi: "/test/2",
    },
    {
      name: "게시판",
      navi: "/test/3",
    },
    {
      name: "테스트",
      navi: "/test/test/1",
      subItems: [
        {
          name: "하위테스트1",
          navi: "/test/test/1",
        },
        {
          name: "하위테스트2",
          navi: "/test/test/2",
        },
        {
          name: "하위테스트3",
          navi: "/test/test/3",
        },
      ],
    },
  ];

  return <TestBar title="테스트" list={list} type={type} />;
};
export default TestList;
