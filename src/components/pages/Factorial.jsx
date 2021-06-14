import React, { useEffect, useState } from 'react'
import './squareroot.css';
import axios from "axios";
import Calculate from "../Calculate"
function Factorial() {
    const [name, setName] = useState("");
    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");


    const data = {
        name: name,
        question: question,
        answer: answer
    }
    const calculationType = "Factorial";


    useEffect(() => {

        setName(calculationType);
        // function factorial(question) {
        //     if (question < 0) return;
        //     if (question < 2) return 1;
        //     return question * factorial(question - 1);
        // }

        function factorial(question){
            let answer = 1;
            if (question === 0 || question === 1){
              return answer;
            }else{
              for(var i = question; i >= 1; i--){
                answer = answer * i;
              }
              return answer;
            }  
          }
        setAnswer(factorial(question));


    }, [question])

    function submitHandler(e) {
        e.preventDefault();

        // Factorial();
        console.log(data);
        axios.post('https://codechallengeserver.herokuapp.com/api/v1/numbers', data)
            .then(response => {
                console.log(response)
            })
            .catch(error => {
                console.log(error);
            })
        setQuestion("");
    }
    return (
        <div className="main-section">
            <div className="main">.</div>
            <div className="title">
                <h1>Factorial</h1>
            </div>

            <form onSubmit={submitHandler}>
                <input
                    type="number"
                    placeholder="Enter number to calculate"
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                />
                {!question ? "" : <button type="submit">Reset</button>}
            </form>
                <h3>Press the reset button to restart the calculation</h3>
            <div className="page-results">
                <Calculate
                    name={name}
                    question={question}
                    answer={answer}
                />
            </div>

        </div>
    )
}

export default Factorial
