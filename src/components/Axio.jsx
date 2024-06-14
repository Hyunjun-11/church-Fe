import axios from "axios";
import { useEffect, useState } from "react";

const Axio = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios({
      method: "GET",
      url: "http://localhost:8080 member/readAAll",
    }).then((response) => setPosts(response.data));
  }, []); // 빈 배열 추가

  return (
    <>
      <div>{posts}</div>
    </>
  );
};

export default Axio;
