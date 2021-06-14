import React from "react";
import "./Calculate.css";

function Calculate(props) {
  return (
    <div className="calculate">
      <p>
        <span>Calculation Type:</span>
        <span>{props.name}</span>
      </p>
      <p>
        <span>Asked number:</span>
        <span>{props.question}</span>
      </p>
      <p>
        <span>Answer:</span>
        <span>{props.answer}</span>
      </p>
    </div>
  );
}

export default Calculate;
