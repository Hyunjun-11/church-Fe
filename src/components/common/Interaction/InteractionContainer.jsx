import React, { useState, useEffect } from "react";
import api from "../../../api/api";
import InteractionButton from "./InteractionButton";
import styled from "styled-components";

const InteractionContainer = ({ boardId }) => {
  const [likes, setLikes] = useState(0);
  const [hearts, setHearts] = useState(0);
  const [amens, setAmens] = useState(0);
  const [liked, setLiked] = useState(false);
  const [hearted, setHearted] = useState(false);
  const [prayed, setPrayed] = useState(false);

  const fetchDetail = async () => {
    try {
      const response = await api.get(`board/${boardId}/interactions`);
      const data = response.data;
      setLikes(data.likeCount);
      setHearts(data.heartCount);
      setAmens(data.prayCount);
      // Assuming the backend returns whether the current user has liked, hearted, or prayed
      setLiked(data.likedByCurrentUser || false);
      setHearted(data.heartedByCurrentUser || false);
      setPrayed(data.prayedByCurrentUser || false);
    } catch (error) {
      console.error("Error fetching detail:", error);
    }
  };

  useEffect(() => {
    fetchDetail();
  }, [boardId]);

  const handleInteractionClick = async (type) => {
    let endpoint = "";
    let isCurrentlyActive = false;

    if (type === "like") {
      endpoint = `board/${boardId}/like`;
      isCurrentlyActive = liked;
    } else if (type === "heart") {
      endpoint = `board/${boardId}/heart`;
      isCurrentlyActive = hearted;
    } else if (type === "pray") {
      endpoint = `board/${boardId}/pray`;
      isCurrentlyActive = prayed;
    }

    try {
      if (isCurrentlyActive) {
        await api.delete(endpoint);
        if (type === "like") {
          setLikes(likes - 1);
          setLiked(false);
        } else if (type === "heart") {
          setHearts(hearts - 1);
          setHearted(false);
        } else if (type === "pray") {
          setAmens(amens - 1);
          setPrayed(false);
        }
      } else {
        await api.post(endpoint);
        if (type === "like") {
          setLikes(likes + 1);
          setLiked(true);
        } else if (type === "heart") {
          setHearts(hearts + 1);
          setHearted(true);
        } else if (type === "pray") {
          setAmens(amens + 1);
          setPrayed(true);
        }
      }
    } catch (error) {
      if (error.response && error.response.status === 409) {
        console.error(`Conflict error interacting with post: ${type}`, error);
      } else {
        console.error(`Error interacting with post: ${type}`, error);
      }
    }
  };

  return (
    <Interaction>
      <InteractionButton
        type="like"
        count={likes}
        active={liked}
        onClick={handleInteractionClick}
      />
      <InteractionButton
        type="heart"
        count={hearts}
        active={hearted}
        onClick={handleInteractionClick}
      />
      <InteractionButton
        type="pray"
        count={amens}
        active={prayed}
        onClick={handleInteractionClick}
      />
    </Interaction>
  );
};

export default InteractionContainer;

const Interaction = styled.div`
  display: flex;
  justify-content: flex-start;
  gap: 10px;
`;
