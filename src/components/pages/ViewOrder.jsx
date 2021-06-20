import React, { useEffect, useState } from "react";
import { baseUrl } from "../../global/config";
import { useStateValue } from "../ContextAPI/StateProvider";
import { useHistory, useParams } from "react-router-dom";
import Card from "../Card/AdminCard"
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
      <>
        {[...info].map((item) => (
          <Card
          key = {item._id}
          id ={item._id}
          parcelName = {item.parcelName}
          pickUp = {item.pickUp}
          destination = {item.destination}
          status = {item.status}
          isCancelled = {!item.isCancelled ? "No" : "Yes"}
          />
        ))}
      </>
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
            <div className="">
          <button type="submit" onClick={() => setClicked(true)}>
            Change Destination
          </button>
          <button type="submit" onClick={() => history.push("/UserOrders")}>
          View Orders
        </button>
        </div>
        )}

      </div>

      {clicked &&
        <form className="change">
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
  );
}

export default ViewOrder;
