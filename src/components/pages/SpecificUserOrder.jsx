import React, { useEffect, useState } from "react";
import { baseUrl } from "../../global/config";
import { useStateValue } from "../ContextAPI/StateProvider";
import { useHistory, Link } from "react-router-dom";

import "./AllOrders.css";
import axios from "axios";

function SpecificOrder() {
  const [orders, setOrders] = useState("");
  const history = useHistory();
  const [{ user }] = useStateValue();

  const redirect = () => {
    if (!user) {
      history.push("/");
    }
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
      .get(baseUrl + "/api/v1/parcel", config, {signal: ac.signal})
      .then((response) => {
        response.data
          .filter((filterData) => filterData.user.name === user)
          .filter((person) => {
            const theURL = person.user._id;

            axios
              .get(baseUrl + `/api/v1/users/${theURL}/parcels`, config)
              .then((response) => {
                setOrders(response.data);
              })
             
          });
      })
      return () => {
        ac.abort();
      };
  }, []);

  const info = orders;

  return (
    <div className="main-section">
      <div className="main">.</div>
      <div className="title">
        <h1>Your Orders</h1>
      </div>
      {info ? (
        <div className="">
          {[...info].map((item) => (
            <div className="" key={item._id}>
              <Link to={`/viewOrder/${item._id}`}>
                <p>name: {item.parcelName}</p>
                <p>pickUp: {item.pickUp}</p>
                <p>destination: {item.destination}</p>
                <p>status: {item.status}</p>
                <p>Order Cancelled: {!item.isCancelled ? "No" : "Yes"}</p>
                <p>view order</p>
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <h3>Loadinging data..... Please wait</h3>
      )}

      <div className="page-results"></div>
    </div>
  );
}

export default SpecificOrder;
