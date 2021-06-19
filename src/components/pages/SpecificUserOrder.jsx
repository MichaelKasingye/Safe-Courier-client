import React, { useEffect, useState } from "react";
import {  baseUrl } from "../../global/config";
import { useStateValue } from "../ContextAPI/StateProvider";
import { useHistory, Link } from "react-router-dom";


import "./AllOrders.css";
import axios from "axios";

function SpecificOrder() {
  // const [name, setName] = useState("");
  // const [question, setQuestion] = useState("");
  const [orders, setOrders] = useState("");
  const [id, setId] = useState("");
  const history = useHistory();
  const [{ user }] = useStateValue();

// console.log(ID);

const urlId = id.toString();
const redirect=()=>{
  if (!user) {
   history.push("/");
 } 
}
  // const data = {
  //   name: name,
  //   question: question,
  //   answer: answer,
  // };
  const config = {
    headers:{
      Authorization: localStorage.getItem('token')
      // Authorization: localStorage.getItem('token')
    }
}

  useEffect(() => {
    redirect()

    axios
          .get(baseUrl + "/api/v1/parcel", config )
          // .get("http://localhost:4000/api/v1/parcel")
          // .then((response) => response.json())
          .then((response) => {
            response.data
            .filter((filterData) => filterData.user.name === user)
            .map(person =>{
              console.log(person.user._id);
              setId(person.user._id)
              const theURL = person.user._id;

              axios
              .get(baseUrl + `/api/v1/users/${theURL}/parcels`, config )
              // .get("http://localhost:4000/api/v1/parcel")
              // .then((response) => response.json())
              .then((response) => {
                  setOrders(response.data)
              })
              .catch((error) => {
                console.log(error);
              });
            })

          })
          .catch((error) => {
            console.log(error);
          });
  }, []);

  useEffect(() => {
    // axios
    //       .get(baseUrl + `/api/v1/users/${urlId}/parcels`, config )
    //       // .get("http://localhost:4000/api/v1/parcel")
    //       // .then((response) => response.json())
    //       .then((response) => {
    // console.log(response);
    //           setOrders(response.data)
    //         // setOrders(response);
    //       })
    //       .catch((error) => {
    //         console.log(error);
    //       });
  }, []);

  function submitHandler(e) {
    e.preventDefault();

    // axios
    //   .post("https://codechallengeserver.herokuapp.com/api/v1/numbers")
      
    //   .catch((error) => {
    //     console.log(error);
    //   });
    // setQuestion("");
  }
const info = orders;
// const info2 = orders.user;

console.log(id.toString());


  return (
    <div className="main-section">
      <div className="main">.</div>
      <div className="title">
        <h1>Your Orders</h1>
      </div>

      {/* <div className="">
      {[...info].map(item =>(
        <div className="" key={item._id}>
          <p>name: {item.parcelName}</p>
          <p>pickUp: {item.pickUp}</p>
          <p>destination: {item.destination}</p>
          <p>status: {item.status}</p>
          <p>Order Cancelled: {!item.isCancelled?"No":"Yes"}</p>
        </div>
      ))}
      </div> */}
       <div className="">
      {[...info].map(item =>(
        <div className="" key={item._id}>
          <Link to={`/viewOrder/${item._id}`}>
          <p>name: {item.parcelName}</p>
          <p>pickUp: {item.pickUp}</p>
          <p>destination: {item.destination}</p>
          <p>status: {item.status}</p>
          <p>Order Cancelled: {!item.isCancelled?"No":"Yes"}</p>
          <p>view order</p>
          </Link>
          
        </div>
      ))}
      </div>
        {/* {!question ? "" : <button type="submit" onClick={submitHandler}>Reset</button>} */}
      <h3>Press the reset button to restart the calculation</h3>

      <div className="page-results">
      </div>
    </div>
  );
}

export default SpecificOrder
