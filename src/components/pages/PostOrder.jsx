import React, { useEffect, useState } from "react";
import "./AllOrders.css";
import { useHistory } from "react-router-dom";
import { useStateValue } from "../ContextAPI/StateProvider";
import { baseUrl } from "../../global/config";

import axios from "axios";

function PostOrders() {
  const [parcelName, setParcelName] = useState("");
  const [pickUp, setPickUp] = useState("");
  const [destination, setDestination] = useState("");
  const [feedback, setFeedback] = useState("");
  const [pressed, setPressed] = useState(false);

  const [{ user }] = useStateValue();
  const history = useHistory();

  const OrderDataSend = {
    parcelName: parcelName,
    pickUp: pickUp,
    destination: destination,
    status: "OnBoarded",
  };

  const redirect = () => {
    if (!user) {
      history.push("/");
    }
  };

  useEffect(() => {
    redirect();
  }, []);

  const config = {
    headers: {
      Authorization: localStorage.getItem("token"),
    },
  };
  function submitHandlerSend(e) {
    e.preventDefault();
    setPressed(true);
    axios
      .post(baseUrl + "/api/v1/parcel", OrderDataSend, config)

      .then((response) => {
        setFeedback(response.statusText);
      });
  }

  return (
    <div className="main-section">
      <div className="main">.</div>
      <div className="title">
        <h1>Make An Order</h1>
      </div>

      <form>
        <label>Parcel Name</label>
        <input
          type="text"
          placeholder="Enter Parcel name"
          value={parcelName}
          onChange={(e) => setParcelName(e.target.value)}
        />
        <label>Pick up Locaton</label>
        <input
          type="text"
          placeholder="Enter Location"
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
      {!parcelName || !pickUp || !destination ? (
        ""
      ) : (
        <>
          <button type="submit" onClick={submitHandlerSend}>
            Send Order
          </button>
          <button type="submit" onClick={() => history.push("/UserOrders")}>
            Show Order
          </button>
        </>
      )}
      {feedback ? <h3>Order sent </h3> : <h3>Press send to make Order</h3>}
      {pressed && !feedback ? <h3> Sending Order</h3> : ""}
    </div>
  );
}

export default PostOrders;
