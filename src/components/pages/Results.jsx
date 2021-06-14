import React, { useEffect, useState } from "react";
import "./results.css";

function Results() {
  const [roots, setRoots] = useState("");

  useEffect(() => {
    fetch("https://codechallengeserver.herokuapp.com/api/v1/numbers")
      .then((response) => response.json())
      .then((response) => {
        setRoots(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  const data = roots;
  return (
    <div className="Results">
      {console.log(data)}
      <div>.</div>
      <div className="title">
        <h1>Results</h1>
      </div>
      <table>
        <thead>
          <tr>
            <th>Type of Calculation</th>
            <th>Question</th>
            <th>Answer</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {typeof data != "undefined" ? (
            [...data].map((info) => (
              <tr key={info._id}>
                <td>{info.name}</td>
                <td>{info.question}</td>
                <td>{info.answer}</td>
                <td>{info.date}</td>
              </tr>
            ))
          ) : (
            <h2>Loading..</h2>
          )}
        </tbody>
      </table>
      {!data?<h1>Loading...</h1>:""}
      
      
    </div>
  );
}

export default Results;
