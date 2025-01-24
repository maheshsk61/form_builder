import React from "react";
import Leftarrow from "../svg/left-arrow";
import Exitarrow from "../svg/exit-arrow";
import Preview from "../svg/exit-arrow";
import Edit from "../svg/edit";
import Threedot from "../svg/three-dot";
import { strings } from "../constant";

const Header = () => {
  return (
    <div
      className="d-flex justify-content-between"
      style={{
        fontSize: "18px",
        lineHeight: "24px",
        fontWeight: 400,
        cursor: "pointer",
        marginTop:'10px'
      }}
    >
      <ul className="list-unstyled d-flex align-items-center">
        <li className="ms-4">
          <Leftarrow />
          {strings.participantRegistrationForm}
        </li>
      </ul>
      <div>
        <ul className="list-unstyled d-flex align-items-center">
          <li className="me-3">
            <Edit />
            <span className="ms-2">{strings.customiseForm}</span>
          </li>
          <li className="me-3">
            <Preview />
            <span className="ms-2">{strings.preview}</span>
          </li>
          <li
            className="me-3"
            style={{
              background: "#E7E7E7",
              borderRadius: "8px",
              padding: "10px 16px 10px 16px",
            }}
          >
            <Exitarrow />
            <span className="ms-2">{strings.viewResponses}</span>
          </li>
          <li style={{ marginRight: "30px" }}>
            <Threedot />
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
