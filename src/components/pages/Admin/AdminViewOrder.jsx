import React, { useEffect, useState } from "react";
import {  baseUrl } from "../../../global/config";
import { useStateValue } from "../../ContextAPI/StateProvider";
import { useHistory, Link, useParams } from "react-router-dom";

import "./../AllOrders.css";
import axios from "axios";


function AdminViewOrder() {
    // const [name, setName] = useState("");
  // const [question, setQuestion] = useState("");
  const [orders, setOrders] = useState("");
  const [pickUp, setPickUp] = useState("");
  const [status, setStatus] = useState("");

  const history = useHistory();

  const [{ user }] = useStateValue();

  const { Id } = useParams();
  const [clicked, setClicked] = useState(false);
  const [clickDestination, setClickedDestination] = useState(false);

  
  
  
  console.log(Id);
  
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
  
  const OrderDataStatus = {
    status: status,
}
const OrderDataPresentLocation = {
  pickUp: pickUp,
}
  const config = {
    headers:{
      Authorization: localStorage.getItem('token')
      // Authorization: localStorage.getItem('token')
    }
}

  useEffect(() => {
    redirect()

    axios
    .get(baseUrl + `/api/v1/parcel/${Id}`, config )
    // .get("http://localhost:4000/api/v1/parcel")
    // .then((response) => response.json())
    .then((response) => {
        setOrders(response.data)
    })
    .catch((error) => {
      console.log(error);
    });
    
  }, [clicked, clickDestination]);
  
  function pickUPHandler(e) {
    e.preventDefault();
    setClickedDestination(false)

    axios
    .put(baseUrl + `/api/v1/parcel/${Id}/presentLocation`, OrderDataPresentLocation, config )
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  
  function statusHandler(e) {
      e.preventDefault();
      setClickedDestination(false)
      axios
      .put(baseUrl + `/api/v1/parcel/${Id}/status`, OrderDataStatus, config )
      .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
            console.log(error);
        });
    }
    const info = orders;
    


    console.log(status,pickUp);
    return (
        <div className="main-section">
      <div className="main">.</div>
      <div className="title">
        <h1>Users your Order</h1>
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
          <p>name: {item.parcelName}</p>
          <p>pickUp: {item.pickUp}</p>
          <p>destination: {item.destination}</p>
          <p>status: {item.status}</p>
          <p>Order Cancelled: {!item.isCancelled?"No":"Yes"}</p>
        </div>
      ))}
      </div>

      <div className="">
        {!info ? "" : <button type="submit" onClick={()=>setClickedDestination(true)}>Change Status</button>}
        {!info ? "" : <button type="submit" onClick={()=>setClickedDestination(true)}>Change Present Location</button>}

       {clickDestination?(
       <form action="">
        
         <div className="">
        <input type="text"
                placeholder="Change status"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                />
        <button type="submit" onClick={statusHandler}>Change </button>

         </div>
         <div className="">
           <input type="text"
        placeholder="Change Present Location"
        value={pickUp}
        onChange={(e) => setPickUp(e.target.value)}
         />
        <button type="submit" onClick={pickUPHandler}>Change  </button>
         </div>

         
        </form>):""} 
      </div>

      <h3>Press the reset button to restart the calculation</h3>

      <div className="page-results">
      </div>
    </div>
  );
}

export default AdminViewOrder
