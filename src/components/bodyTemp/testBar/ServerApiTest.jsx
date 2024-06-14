// Apitest.jsx
import React from "react";
import axios from "axios";

export const Apitest = () => {
  const handleSubmit = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_REACT_APP_API_URL}board/`);

      if (response.status === 200) {
        console.log(response);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <button onClick={handleSubmit}>테스트</button>
    </div>
  );
};
