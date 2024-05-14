import React, { useEffect, useState } from "react";
import axios from "axios";

import "./App.css";

const App = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios({
      method: "GET",
      url: "http://localhost:8080/api/member/readAAll",
    }).then((response) => setPosts(response.data));
  }, []); // 빈 배열 추가

  return <div>{posts}</div>;
};

export default App;
