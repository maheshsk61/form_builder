import React, { useState } from "react";
import { strings } from "../constant";
import { Card } from "react-bootstrap";
import Text from "../svg/text";
import Number from "../svg/number"; // Corrected import
import Multiplechoice from "../svg/multiple-choice";
import Date from "../svg/date";
import Person from "../svg/person";
import FilesAndMedia from "../svg/files-media";
import Checkbox from "../svg/checkbox";
import LinkIcon from "../svg/link";
import Email from "../svg/email";
import Mobile from "../svg/mobile-number";
import Search from "../svg/search";
import styled from "styled-components";
import { List } from "./questionOptions";

const SearchBox = styled.input`
  background: #ffffff;
  border: 0;
  &:hover {
    background: #ffffff;
    border: 0;
  }
  &:focus {
    outline: none;
  }
`;

const QuestionType = ({ addNewQuestion }) => {
  const [clickedIndex, setClickedIndex] = useState(null);

  const listItems = [
    { icon: <Text />, label: strings.text },
    { icon: <Number />, label: strings.number },
    { icon: <Multiplechoice />, label: strings.multipleChoice },
    { icon: <Date />, label: strings.date },
    { icon: <Person />, label: strings.person },
    { icon: <FilesAndMedia />, label: strings.filesAndMedia },
    { icon: <Checkbox />, label: strings.checkbox },
    { icon: <LinkIcon />, label: strings.link },
    { icon: <Email />, label: strings.email },
    { icon: <Mobile />, label: strings.mobileNumber },
  ];

  return (
    <Card
      className="question-type"
      style={{
        listStyle: "none",
        borderRadius: "8px",
        padding: "8px",
        width: "296px",
        height: "auto",
        transform: "translate(450px, -100px)",
        cursor: "pointer",
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
          // marginLeft: "-10px",
        }}
      >
        {strings.questionType}
      </p>
      <span
        style={{
          border: "2px solid #17101B",
          borderRadius: "8px",
          padding: "8px",
        }}
      >
        <Search />
        <SearchBox type="text" placeholder={strings.searchForAQuestionType} />
      </span>
      <p
        style={{
          color: "#b6b6b6",
          fontSize: "12px",
          fontWeight: 400,
          lineHeight: "16px",
          padding: "8px",
          width: "264px",
          height: "16px",
          // marginLeft: "-10px",
        }}
      >
        {strings.type}
      </p>
      {listItems.map((element, index) => {
        return (
          <div key={index}>
            <List
              onClick={() => {
                setClickedIndex(index);
                addNewQuestion();
              }}
              style={{
                color: clickedIndex === index ? "#1B1B1B" : "#B6B6B6",
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

export default QuestionType;
