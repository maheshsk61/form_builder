import React, { useEffect, useState } from "react";
import bg from "/images/bg.jpeg";
import { strings } from "../constant";
import QuestionType from "./questionType";
import styled from "styled-components";
import DynamicQn from "./dynamic-multiple-qn";

export const Division = styled.div`
  width: 588px;
  height: auto;
  border-radius: 16px;
  padding: 30px;
  border: 0.5px solid #894d9e;
  margin-bottom: 20px;
  color: #1b1b1b;
  line-height: 32px;
  font-weight: 400;
  font-size: 24px;
  display: flex;
  align-items: center;
  &:focus {
    outline: none;
  }
  &:hover {
    border: 2px solid #894d9e;
  }
`;
const Button = styled.button`
  width: 588px;
  height: 52px;
  border-radius: 16px;
  padding: 16px;
  border: none;
  color: #868686;
  background-color: #f8f8f8;
  line-height: 20px;
  font-weight: 400;
  font-size: 16px;
  margin-top:50px;
  margin-bottom:50px;
  &:hover {
    background-color: #f3f3f3;
    border-radius: 8px;
  }
  &:focus {
    ${({ questionTypeOpen }) =>
      questionTypeOpen
        ? `
        border: 0;
    `
        : `
    border: 3px solid #894d9e;
    padding: 16px;
    background: #ffffff;`}
`;

const Main = () => {
  const [questionTypeOpen, setquestionTypeOpen] = useState(false);
  const [questionOptionsOpen, setquestionOptionsOpen] = useState(true);
  const [boxOpen, setBoxOpen] = useState(false);
  const [multipleChoiceQn, setMultipleChoiceQn] = useState([
    {
      qn: "",
      description: "",
      options: ["", ""],
    },
  ]);
  const [isActiveFormHeader, setIsActiveFormHeader] = useState(false);
  const [isActiveFormDescription, setIsActiveFormDescription] = useState(false);
  const addNewQuestion = () => {
    if (!boxOpen) {
      setBoxOpen(true);
      setquestionTypeOpen(true);
    } else {
      setMultipleChoiceQn([
        ...multipleChoiceQn,
        { qn: "", description: "", options: ["", ""] },
      ]);
    }
    setquestionTypeOpen(false);
  };
  useEffect(() => {
    if (multipleChoiceQn.length === 0) {
      setquestionOptionsOpen(false);
    } else {
      setquestionOptionsOpen(true);
    }
  }, [multipleChoiceQn]);

  return (
    <div className="main">
      <div className="image">
        <img
          src={bg}
          style={{
            borderRadius: "16px",
            width: "1216px",
            height: "203px",
            margin: "0 auto",
            display: "block",
          }}
        />
      </div>
      <div
        className="form"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h1
          style={{
            color: "#1B1B1B",
            linHeight: "44px",
            fontWeight: 400,
            fontSize: "36px",
            padding: "4px 8px 4px 8px",
            marginTop: 20,
            marginBottom: 0,
            width: "588px",
          }}
          className="h1"
          onClick={() => {
            setIsActiveFormHeader(!isActiveFormHeader);
          }}
        >
          {strings.participantRegistrationForm}
          {isActiveFormHeader && " |"}
        </h1>
        <input
          onClick={() => {
            setIsActiveFormDescription(!isActiveFormDescription);
          }}
          className="input"
          type="text"
          placeholder={
            isActiveFormDescription
              ? `|${strings.startWritingDescriptionAboutYoutForm}`
              : strings.startWritingDescriptionAboutYoutForm
          }
          style={{
            linHeight: "24px",
            fontWeight: 400,
            fontSize: "16px",
            marginTop: 0,
            marginBottom: 40,
            padding: "4px 8px 4px 8px",
            width: "588px",
          }}
        />
        <Division>{strings.selectYourSkills}</Division>
        <Division>{strings.selectTheLanguagesYouSpeak}</Division>
        {boxOpen && (
          <DynamicQn
            multipleChoiceQn={multipleChoiceQn}
            setMultipleChoiceQn={setMultipleChoiceQn}
            questionOptionsOpen={questionOptionsOpen}
          />
        )}
        <Button
          boxOpen={boxOpen}
          onClick={() => {
            setquestionTypeOpen(true);
          }}
        >
          {!questionTypeOpen && strings.newQuestion}
        </Button>
        {questionTypeOpen && <QuestionType addNewQuestion={addNewQuestion} />}
      </div>
    </div>
  );
};

export default Main;
