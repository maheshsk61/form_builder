import React, { useState } from "react";
import { strings } from "../constant";
import { Card } from "react-bootstrap";
import Required from "../svg/required";
import Description from "../svg/description";
import Hash from "../svg/hash";
import Window from "../svg/window";
import Linktwo from "../svg/link-two";
import Sync from "../svg/sync";
import Duplicate from "../svg/duplicate";
import Delete from "../svg/delete";
import styled from "styled-components";

export const List = styled.li`
  padding: 0 8px;
  &:hover {
    border-radius: 8px;
     ${({ isDelete }) =>
       isDelete
         ? `
      background: red;
    `
         : `
      background: #f3f3f3;
    `}
  }
  }
`;
const QuestionOptions = ({ setToBeDeleted }) => {
  const [clickedIndex, setClickedIndex] = useState(null);
  const listItems = [
    { icon: <Required />, label: strings.required },
    { icon: <Description />, label: strings.description },
    { icon: <Hash />, label: strings.maxSelection },
    { icon: <hr /> },
    { icon: <Window />, label: strings.questionType },
    { icon: <Linktwo />, label: strings.viewLinkedAttribute },
    { icon: <Sync />, label: strings.syncWithAttributeName },
    { icon: <hr /> },
    { icon: <Duplicate />, label: strings.duplicateQuestion },
    { icon: <Delete />, label: strings.deleteQuestion },
  ];

  return (
    <Card
      className="question-options"
      style={{
        listStyle: "none",
        borderRadius: "8px",
        padding: "8px",
        width: "296px",
        height: "auto",
        transform: "translate(600px, -290px)",
        cursor: "pointer",
        marginBottom: "-300px",
      }}
    >
      <p
        style={{
          color: "#000000",
          fontSize: "16px",
          fontWeight: 400,
          lineHeight: "20px",
          padding: "8px",
          width: "264px",
          height: "20px",
        }}
      >
        {strings.questionOptions}
      </p>
      {listItems.map((element, index) => {
        return (
          <div key={index}>
            <List
              isDelete={element.label === strings.deleteQuestion}
              onClick={() => {
                setClickedIndex(index);
                if (element.label === strings.deleteQuestion) {
                  setToBeDeleted(true);
                }
              }}
              style={{
                color:
                  element.label === strings.deleteQuestion
                    ? "#C0362D"
                    : clickedIndex === index
                    ? "#1B1B1B"
                    : "#B6B6B6",
              }}
            >
              {element.icon} {element.label}
            </List>
          </div>
        );
      })}
    </Card>
  );
};

export default QuestionOptions;
