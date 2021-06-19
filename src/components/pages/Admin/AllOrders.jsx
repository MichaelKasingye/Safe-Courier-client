import React, { useEffect, useState } from "react";
import { baseUrl } from "../../../global/config";
import { Link, useHistory } from "react-router-dom";
import { useStateValue } from "../../ContextAPI/StateProvider";

import "../AllOrders.css";
import axios from "axios";

function AllOrders() {
  const [orders, setOrders] = useState("");
  const [{ user }] = useStateValue();
  const [{ Admin }] = useStateValue();

  const history = useHistory();

  const config = {
    headers: {
      Authorization: localStorage.getItem("token"),
    },
  };

  const redirect = () => {
    if (!user || !Admin) {
      history.push("/");
    }
  };
  useEffect(() => {
    redirect();
    axios.get(baseUrl + "/api/v1/parcel", config).then((response) => {
      setOrders(response.data);
    });
  }, []);

  const info = orders;

  return (
    <div className="main-section">
      <div className="main">.</div>
      <div className="title">
        <h1>All Orders</h1>
      </div>
      {info ? (
        <div className="">
          {[...info].map((item) => (
            <div className="" key={item._id}>
              <Link to={`/adminviewOrder/${item._id}`}>
                <p>User Name: {item.user.name}</p>
                <p>name: {item.parcelName}</p>
                <p>pickUp: {item.pickUp}</p>
                <p>destination: {item.destination}</p>
                <p>status: {item.status}</p>
                <p>Order Cancelled: {!item.isCancelled ? "No" : "Yes"}</p>
                <p>VIEW MORE DETAILS</p>
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <h3>PLEASE WAIT LOADING......</h3>
      )}

      <div className="page-results"></div>
    </div>
  );
}

export default AllOrders;
