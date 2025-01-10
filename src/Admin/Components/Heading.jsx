import React from "react";
import "./Heading.css";
const Heading = (props) => {
  return (
    <p className="HeadingComponent">
      <b>{props.head}</b>
    </p>
  );
};

export default Heading;
