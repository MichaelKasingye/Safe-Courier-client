import React, { useEffect, useState } from 'react'
import './AllOrders.css';
import { useHistory } from "react-router-dom";
import { useStateValue } from "../ContextAPI/StateProvider";
import {  baseUrl } from "../../global/config";

import axios from "axios";

function PostOrders() {
    const [parcelName, setParcelName] = useState("");
    const [pickUp, setPickUp] = useState("");
    const [destination, setDestination] = useState("");
    // const [cancel, setCancel] = useState(false);
    const [status, setStatus] = useState("");

    const [{ user }] = useStateValue();
    const history = useHistory();

    const OrderDataSend = {
        parcelName: parcelName,
        pickUp: pickUp,
        destination: destination,
        // cancel: cancel,
        status: "OnBoarded"
    }

 

    const redirect=()=>{
        if (!user) {
         history.push("/");
       } 
     }
    

    
useEffect(() => {
    redirect()
   
  }, [])

  const config = {
      headers:{
        Authorization: localStorage.getItem('token')
      }
  }
    function submitHandlerSend(e) {
        e.preventDefault();
        // setStatus("OnBoarded");
        console.log(status);

          axios
          .post(baseUrl + "/api/v1/parcel", OrderDataSend, config )
        
          .then((response) => {
            console.log(response);
          })
          .catch((error) => {
            console.log(error);
          });
         history.push("/UserOrders");

    }

    // function submitHandlerCancel(e) {
    //     e.preventDefault();
    //      axios
    //       .put(baseUrl + "/api/v1/parcel", OrderDataCancel, config )
    //       // .get("http://localhost:4000/api/v1/parcel")
        
    //       .then((response) => {
    //         console.log(response);
    //         // localStorage.setItem('token', response.token)
    //       })
    //       .catch((error) => {
    //         console.log(error);
    //       });
    //     setCancel(true);
    // }
    function submitHandlerCancel(e) {
        e.preventDefault();
         
    }

    return (
        <div className="main-section">
            <div className="main">.</div>
            <div className="title">
                <h1>Make An Order</h1>
            </div>

            <form >
                <label>Parcel Name</label>
                <input
                    type="text"
                    placeholder="Enter Parcel name"
                    value={parcelName}
                    onChange={(e) => setParcelName(e.target.value)}
                />
                <label>Parcel Pick up</label>
                <input
                    type="text"
                    placeholder="Enter Pick up"
                    value={pickUp}
                    onChange={(e) => setPickUp(e.target.value)}
                />
                <label>Parcel Destination</label>
                <input
                    type="text"
                    placeholder="Enter destination"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                />
            </form>
                {!parcelName || !pickUp || !destination ? "" :
                <>
                 <button type="submit" onClick={submitHandlerCancel}>Show Order</button>
                 <button type="submit" onClick={submitHandlerSend}>Send Order</button>
                 </>
                 }
                <h3>Order sent or cancelled</h3>
            <div className="page-results">
               
            </div>

        </div>
    )
}

export default PostOrders
