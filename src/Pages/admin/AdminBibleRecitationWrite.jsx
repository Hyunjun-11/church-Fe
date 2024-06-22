import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import ReactModal from "react-modal";
import api from "../../api/api";

const bibleMapping = {
  1: "창세기",
  2: "출애굽기",
  3: "레위기",
  4: "민수기",
  5: "신명기",
  6: "여호수아",
  7: "사사기",
  8: "룻기",
  9: "사무엘상",
  10: "사무엘하",
  11: "열왕기상",
  12: "열왕기하",
  13: "역대상",
  14: "역대하",
  15: "에스라",
  16: "느헤미야",
  17: "에스더",
  18: "욥기",
  19: "시편",
  20: "잠언",
  21: "전도서",
  22: "아가",
  23: "이사야",
  24: "예레미야",
  25: "예레미야애가",
  26: "에스겔",
  27: "다니엘",
  28: "호세아",
  29: "요엘",
  30: "아모스",
  31: "오바댜",
  32: "요나",
  33: "미가",
  34: "나훔",
  35: "하박국",
  36: "스바냐",
  37: "학개",
  38: "스가랴",
  39: "말라기",
  40: "마태복음",
  41: "마가복음",
  42: "누가복음",
  43: "요한복음",
  44: "사도행전",
  45: "로마서",
  46: "고린도전서",
  47: "고린도후서",
  48: "갈라디아서",
  49: "에베소서",
  50: "빌립보서",
  51: "골로새서",
  52: "데살로니가전서",
  53: "데살로니가후서",
  54: "디모데전서",
  55: "디모데후서",
  56: "디도서",
  57: "빌레몬서",
  58: "히브리서",
  59: "야고보서",
  60: "베드로전서",
  61: "베드로후서",
  62: "요한일서",
  63: "요한이서",
  64: "요한삼서",
  65: "유다서",
  66: "요한계시록",
};

const bibleBooks = Object.values(bibleMapping);

const AdminBibleRecitationWrite = ({ isOpen, onRequestClose }) => {
  const [state, setState] = useState({
    search: "",
    chapter: "",
    verseStart: "",
    verseEnd: "",
    error: "",
    suggestions: [],
    selectedIndex: -1,
    suggestionIsOpen: true,
  });

  const {
    search,
    chapter,
    verseStart,
    verseEnd,
    error,
    suggestions,
    selectedIndex,
    suggestionIsOpen,
  } = state;

  const inputRef = useRef(null);
  const suggestionsRef = useRef([]);
  const [bible, setBible] = useState([]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      inputRef.current?.focus();
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  useEffect(() => {
    if (search) {
      const filteredSuggestions = bibleBooks.filter((book) =>
        book.includes(search)
      );
      setState((prevState) => ({
        ...prevState,
        suggestions: filteredSuggestions,
        selectedIndex: -1,
      }));
    } else {
      setState((prevState) => ({
        ...prevState,
        suggestions: [],
        suggestionIsOpen: true,
      }));
    }
  }, [search]);

  useEffect(() => {
    if (selectedIndex >= 0 && selectedIndex < suggestions.length) {
      suggestionsRef.current[selectedIndex]?.scrollIntoView({
        block: "nearest",
        behavior: "smooth",
      });
    }
  }, [selectedIndex, suggestions.length]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
      suggestionIsOpen: name === "search" ? true : prevState.suggestionIsOpen,
    }));
  };

  const handleKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      setState((prevState) => ({
        ...prevState,
        selectedIndex:
          prevState.selectedIndex < suggestions.length - 1
            ? prevState.selectedIndex + 1
            : prevState.selectedIndex,
      }));
    } else if (e.key === "ArrowUp") {
      setState((prevState) => ({
        ...prevState,
        selectedIndex:
          prevState.selectedIndex > 0
            ? prevState.selectedIndex - 1
            : prevState.selectedIndex,
      }));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (selectedIndex >= 0 && selectedIndex < suggestions.length) {
        setState((prevState) => ({
          ...prevState,
          search: suggestions[selectedIndex],
          suggestions: [],
          selectedIndex: -1,
          suggestionIsOpen: false,
        }));
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setState((prevState) => ({ ...prevState, error: "" }));

    try {
      const book = parseInt(
        Object.keys(bibleMapping).find((key) => bibleMapping[key] === search),
        10
      );

      const response = await api.post("/bible/", {
        book,
        chapter: parseInt(chapter, 10),
        verseStart: parseInt(verseStart, 10),
        verseEnd: parseInt(verseEnd, 10),
      });

      if (response.status === 200) {
        alert("등록 성공");
        setBible(response.data.data);
        // onRequestClose();
      } else {
        setState((prevState) => ({
          ...prevState,
          error: alert("등록 중 오류가 발생했습니다. 다시 시도해주세요."),
        }));
      }
    } catch (error) {
      setState((prevState) => ({
        ...prevState,
        error: alert("등록 중 오류가 발생했습니다. 다시 시도해주세요."),
      }));
    }
  };

  const handleModalClose = () => {
    onRequestClose();
    setState({
      search: "",
      chapter: "",
      verseFrom: "",
      verseTo: "",
      error: "",
      suggestions: [],
      selectedIndex: -1,
      suggestionIsOpen: true,
    });
  };

  const handleSuggestionClick = (suggestion) => {
    setState((prevState) => ({
      ...prevState,
      search: suggestion,
      suggestions: [],
      selectedIndex: -1,
      suggestionIsOpen: false,
      error: "",
    }));
  };

  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={handleModalClose}
      style={modalStyles}>
      <FormContainer>
        <Form onSubmit={handleSubmit}>
          <Title>말씀 암송 등록</Title>
          {error && <ErrorMessage>{error}</ErrorMessage>}
          <Input
            ref={inputRef}
            type="text"
            placeholder="성경말씀"
            name="search"
            value={search}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            required
          />
          {suggestionIsOpen && suggestions.length > 0 && (
            <SuggestionsContainer>
              <SuggestionsList>
                {suggestions.map((suggestion, index) => (
                  <SuggestionItem
                    key={index}
                    onClick={() => handleSuggestionClick(suggestion)}
                    className={index === selectedIndex ? "selected" : ""}
                    ref={(el) => (suggestionsRef.current[index] = el)}>
                    {suggestion}
                  </SuggestionItem>
                ))}
              </SuggestionsList>
            </SuggestionsContainer>
          )}
          <InputContainer>
            <Input
              type="number"
              placeholder="장"
              name="chapter"
              value={chapter}
              onChange={handleChange}
              min="0"
              required
            />
            <Input
              type="number"
              placeholder="절 (시작)"
              name="verseStart"
              value={verseStart}
              onChange={handleChange}
              min="0"
              required
            />
            <Input
              type="number"
              placeholder="절 (끝)"
              name="verseEnd"
              value={verseEnd}
              onChange={handleChange}
              min="0"
              required
            />
          </InputContainer>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "12px",
            }}>
            {bible.map((verse, index) => (
              <div key={index}>
                <div
                  style={{
                    display: "flex",
                    gap: "12px",
                    alignItems: "center",
                  }}>
                  <div
                    style={{
                      fontSize: "18px",
                      fontWeight: "600",
                      minWidth: "fit-content",
                    }}>
                    {bibleMapping[verse.book]} {verse.chapter}장 {verse.verse}절
                  </div>
                  {verse.content}
                </div>
              </div>
            ))}
          </div>
          <ButtonContainer>
            <Button type="submit">등록하기</Button>
          </ButtonContainer>
        </Form>
      </FormContainer>
    </ReactModal>
  );
};

export default AdminBibleRecitationWrite;

const modalStyles = {
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: 10,
  },
  content: {
    top: "50%",
    left: "50%",
    // right: "auto",
    // bottom: "auto",
    // marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "50rem",
    height: "35rem",
    padding: "0",
    border: "none",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
};

const FormContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 90%;
  border-radius: 8px;
`;

const Form = styled.form`
  padding: 40px;
  background: white;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const Input = styled.input`
  margin-bottom: 20px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  transition: border-color 0.3s;

  &:focus {
    border-color: #007bff;
    outline: none;
  }
`;

const InputContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 10px;
  margin-bottom: 20px;
`;

const ButtonContainer = styled.div`
  margin-top: auto;
`;
const Button = styled.button`
  background: #007bff;
  color: white;
  border: none;
  padding: 10px;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  transition: background 0.3s;
  width: 100%;

  &:hover {
    background: #0056b3;
  }
`;

const Title = styled.h2`
  margin-bottom: 20px;
  text-align: center;
  color: #333;
  font-size: 24px;
  font-weight: 700;
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 14px;
  margin-bottom: 20px;
  text-align: center;
`;

const SuggestionsContainer = styled.div`
  position: relative;
`;

const SuggestionsList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
  border: 1px solid #ccc;
  border-radius: 4px;
  max-height: 150px;
  overflow-y: auto;
  position: absolute;
  width: 100%;
  background: white;
  z-index: 1;
`;

const SuggestionItem = styled.li`
  padding: 10px;
  cursor: pointer;

  &.selected {
    background-color: #e8f1fa;
  }

  &:hover {
    background-color: #f0f0f0;
  }
`;
