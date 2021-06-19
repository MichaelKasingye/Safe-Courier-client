import React, { useEffect, useState } from "react";
import {  baseUrl } from "../../global/config";
import {  Link } from "react-router-dom";

import "./AllOrders.css";
import axios from "axios";

function AllOrders() {
  const [orders, setOrders] = useState("");

  const config = {
    headers:{
      Authorization: localStorage.getItem('token')
    }
}
  useEffect(() => {
    axios
          .get(baseUrl + "/api/v1/parcel", config )
          .then((response) => {
              setOrders(response.data)
          })
          .catch((error) => {
            console.log(error);
          });
  }, []);

  function submitHandler(e) {
    e.preventDefault();

    axios
      .post("https://codechallengeserver.herokuapp.com/api/v1/numbers")
      
      .catch((error) => {
        console.log(error);
      });
  }
const info = orders;
console.log(info);


  return (
    <div className="main-section">
      <div className="main">.</div>
      <div className="title">
        <h1>All Orders</h1>
      </div>

      <div className="">
      {[...info].map(item =>(
        <div className="" key={item._id}>
           <Link to={`/adminviewOrder/${item._id}`}>
          <p>name: {item.parcelName}</p>
          <p>pickUp: {item.pickUp}</p>
          <p>destination: {item.destination}</p>
          <p>status: {item.status}</p>
          <p>Order Cancelled: {!item.isCancelled?"No":"Yes"}</p>
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

export default AllOrders;
