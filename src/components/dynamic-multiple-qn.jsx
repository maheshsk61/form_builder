import React, { useState } from "react";
import { strings } from "../constant";
import styled from "styled-components";
import { Division } from "./main";
import Plus from "../svg/plus";
import QuestionOptions from "./questionOptions";
import { ThreedotViolet } from "../svg/three-dot";
import Trash from "../svg/trash";

const Input = styled.input`
  border: 0;
  &:focus {
    outline: none;
  }
  input[type="text"] {
    color: #b6b6b6; 
    &:focus {
      color: black; 
    } 
`;
const CheckboxWrapper = styled.div`
  display: flex;
  padding: 6px;
  font-size: 14px;
  line-height: 24px;
  font-weight: 400px;
  &:hover {
    background: #f8f8f8;
    width: 552px;
    height: 36px;
  }
  input[type="text"] {
    color: #b6b6b6;
    &:focus {
      color: black;
    }
  }
`;
const Span = styled.span`
  &:hover svg path {
    stroke: #c0362d;
  }
`;

const DynamicQn = ({
  multipleChoiceQn,
  setMultipleChoiceQn,
  questionOptionsOpen,
}) => {
  const [toBeDeleted, setToBeDeleted] = useState(false);

  const handleQuestionDragStart = (e, index) => {
    e.dataTransfer.setData("draggedQuestion", JSON.stringify({ index }));
  };

  const handleQuestionDrop = (e, targetIndex) => {
    const draggedQuestion = JSON.parse(
      e.dataTransfer.getData("draggedQuestion")
    );
    const draggedQuestionIndex = draggedQuestion.index;
    if (draggedQuestionIndex !== targetIndex) {
      const updatedQuestions = [...multipleChoiceQn];
      const draggedQuestionValue = updatedQuestions[draggedQuestionIndex];
      updatedQuestions.splice(draggedQuestionIndex, 1);
      updatedQuestions.splice(targetIndex, 0, draggedQuestionValue);
      setMultipleChoiceQn(updatedQuestions);
    }
  };

  const handleOptionDragStart = (e, questionIndex, optionIndex) => {
    e.dataTransfer.setData(
      "draggedOption",
      JSON.stringify({ questionIndex, optionIndex })
    );
  };

  const handleOptionDrop = (e, questionIndex, targetOptionIndex) => {
    const draggedOption = JSON.parse(e.dataTransfer.getData("draggedOption"));
    const draggedQuestionIndex = draggedOption.questionIndex;
    const draggedOptionIndex = draggedOption.optionIndex;
    if (
      draggedQuestionIndex === questionIndex &&
      draggedOptionIndex !== targetOptionIndex
    ) {
      const updatedQuestions = [...multipleChoiceQn];
      const draggedOptionValue =
        updatedQuestions[draggedQuestionIndex].options[draggedOptionIndex];
      // Remove the dragged option
      updatedQuestions[draggedQuestionIndex].options.splice(
        draggedOptionIndex,
        1
      );
      // Insert the dragged option at the new position
      updatedQuestions[questionIndex].options.splice(
        targetOptionIndex,
        0,
        draggedOptionValue
      );
      setMultipleChoiceQn(updatedQuestions);
    }
  };
  const deleteQuestion = (index) => {
    const deletedQuestion = [...multipleChoiceQn];
    deletedQuestion.splice(index, 1);
    setMultipleChoiceQn(deletedQuestion);
    setToBeDeleted(false);
  };

  return (
    <div>
      {multipleChoiceQn.map((question, index) => (
        <Division
          key={index}
          draggable
          onDragStart={(e) => handleQuestionDragStart(e, index)}
          onDrop={(e) => handleQuestionDrop(e, index)}
          onDragOver={(e) => e.preventDefault()}
        >
          {toBeDeleted && deleteQuestion(index)}
          <div className="d-flex flex-column">
            <span
              className="d-flex justify-content-between"
              style={{ position: "relative" }}
            >
              <Input
                type="text"
                placeholder={strings.addAQuestion}
                style={{
                  fontSize: "24px",
                  fontWeight: 400,
                  lineHeight: "32px",
                }}
                value={question.qn}
                onChange={(e) => {
                  const updatedQuestions = [...multipleChoiceQn];
                  updatedQuestions[index].qn = e.target.value;
                  setMultipleChoiceQn(updatedQuestions);
                }}
              />
              <span style={{ position: "absolute", left: "500px" }}>
                <ThreedotViolet />
              </span>
            </span>
            <Input
              type="text"
              placeholder={strings.addQuestionDescription}
              style={{
                fontSize: "16px",
                fontWeight: 400,
                lineHeight: "24px",
              }}
              value={question.description}
              onChange={(e) => {
                const updatedQuestions = [...multipleChoiceQn];
                updatedQuestions[index].description = e.target.value;
                setMultipleChoiceQn(updatedQuestions);
              }}
            />
            <span
              style={{
                fontSize: "14px",
                fontWeight: 400,
                lineHeight: "20px",
                color: "#B6B6B6",
              }}
            >
              {strings.respondant}
            </span>
            {question.options.map((option, optIndex) => (
              <div
                key={optIndex}
                draggable
                onDragStart={(e) => handleOptionDragStart(e, index, optIndex)}
                onDrop={(e) => handleOptionDrop(e, index, optIndex)}
                onDragOver={(e) => e.preventDefault()}
              >
                <CheckboxWrapper>
                  <Input type="checkbox" />
                  <span style={{ marginLeft: "5px", position: "relative" }}>
                    <input
                      className="input"
                      placeholder={`${strings.option} ${optIndex + 1}`}
                      type="text"
                      style={{ background: "none" }}
                      onChange={(e) => {
                        const updatedQuestions = [...multipleChoiceQn];
                        updatedQuestions[index].options[optIndex] =
                          e.target.value;
                        setMultipleChoiceQn(updatedQuestions);
                      }}
                      value={option}
                    />
                    <Span
                      style={{
                        position: "absolute",
                        left: "500px",
                        cursor: "pointer",
                      }}
                      onClick={() => {
                        const updatedQuestions = [...multipleChoiceQn];
                        updatedQuestions[index].options[optIndex] = "";
                        setMultipleChoiceQn(updatedQuestions);
                      }}
                    >
                      <Trash />
                    </Span>
                  </span>
                </CheckboxWrapper>
              </div>
            ))}
            <p
              style={{
                fontSize: "14px",
                lineHeight: "24px",
                fontWeight: 400,
                paddingTop: "16px",
                marginLeft: "6px",
                color: "#505050",
              }}
            >
              <Plus />
              <span
                style={{ marginLeft: "10px", cursor: "pointer" }}
                onClick={() => {
                  const updatedQuestions = [...multipleChoiceQn];
                  updatedQuestions[index].options.push("");
                  setMultipleChoiceQn(updatedQuestions);
                }}
              >
                {strings.addOption}
              </span>
            </p>
          </div>
        </Division>
      ))}
      {questionOptionsOpen && (
        <QuestionOptions setToBeDeleted={setToBeDeleted} />
      )}
    </div>
  );
};

export default DynamicQn;
