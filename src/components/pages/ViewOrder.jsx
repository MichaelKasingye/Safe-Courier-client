import React, { useEffect, useState } from "react";
import { baseUrl } from "../../global/config";
import { useStateValue } from "../ContextAPI/StateProvider";
import { useHistory, useParams } from "react-router-dom";

import "./AllOrders.css";
import axios from "axios";

function ViewOrder() {
  const [orders, setOrders] = useState("");
  const [destination, setDestination] = useState("");
  const history = useHistory();
  const [{ user }] = useStateValue();

  const { Id } = useParams();
  const [clicked, setClicked] = useState(false);
  const [clickDestination, setClickedDestination] = useState(false);

  const redirect = () => {
    if (!user) {
      history.push("/");
    }
  };

  const OrderDataCancel = {
    isCancelled: true,
  };
  const OrderDataDestination = {
    destination: destination,
  };
  const config = {
    headers: {
      Authorization: localStorage.getItem("token"),
    },
  };
  useEffect(() => {
    redirect();
    const ac = new AbortController();
    axios
      .get(baseUrl + `/api/v1/parcel/${Id}`, config,{signal: ac.signal})
      .then((response) => {
        setOrders(response.data);
      })
      // .catch((error) => {
      //   setResponseInfo(error.response.data);
      // });
    return () => {
      ac.abort();
      setClickedDestination(false);
      setClicked(true);
    };
  }, [ clickDestination]);

  function cancelHandler(e) {
    e.preventDefault();
    setClickedDestination(true)

    axios
      .put(baseUrl + `/api/v1/parcel/${Id}/cancel`, OrderDataCancel, config)
  }

  function destinationHandler(e) {
    e.preventDefault();
    setClickedDestination(true);
    axios
      .put(
        baseUrl + `/api/v1/parcel/${Id}/destination`,
        OrderDataDestination,
        config
      )
     
  }
  const info = orders;

  return (
    <div className="main-section">
      <div className="main">.</div>
      <div className="title">
        <h1>View your Order</h1>
      </div>
      {info?
      <div className="">
        {[...info].map((item) => (
          <div className="" key={item._id}>
            <p>name: {item.parcelName}</p>
            <p>pickUp: {item.pickUp}</p>
            <p>destination: {item.destination}</p>
            <p>status: {item.status}</p>
            <p>Order Cancelled: {!item.isCancelled ? "No" : "Yes"}</p>
          </div>
        ))}
      </div>
      :  <h4>Loading Data.... Please wait.....</h4> }
      

      <div className="">
        {!info ? (
          ""
        ) : (
          <button type="submit" onClick={cancelHandler}>
            Cancel Order
          </button>
        )}
        {!info ? (
          ""
        ) : (
          <button type="submit" onClick={() => setClicked(true)}>
            Change Destination
          </button>
        )}

        {clicked &&
          <form action="">
            <input
              type="text"
              placeholder="Change location"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
            />
            {destination &&
            <button type="submit" onClick={destinationHandler}>
              Change
            </button>}
            
          </form>
       }
      </div>

      <div className="page-results"></div>
    </div>
  );
}

export default ViewOrder;
