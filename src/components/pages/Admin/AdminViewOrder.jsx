import React, { useEffect, useState } from "react";
import { baseUrl } from "../../../global/config";
import { useStateValue } from "../../ContextAPI/StateProvider";
import { useHistory,  useParams } from "react-router-dom";

import "./../AllOrders.css";
import axios from "axios";

function AdminViewOrder() {
  const [orders, setOrders] = useState("");
  const [pickUp, setPickUp] = useState("");

  const history = useHistory();

  const [{ user }] = useStateValue();

  const { Id } = useParams();
  const [clicked, setClicked] = useState(false);
  const [clickDestination, setClickedDestination] = useState(false);

  const redirect = () => {
    if (!user) {
      history.push("/adminsignUp");
    }
  };

  const OrderDataStatusOnroute = {
    status: "On Route",
  };
  const OrderDataStatusDelivered = {
    status: "Delivered",
  };
  const OrderDataPresentLocation = {
    pickUp: pickUp,
  };
  const config = {
    headers: {
      Authorization: localStorage.getItem("token"),
    },
  };

  useEffect(() => {
    redirect();

    axios.get(baseUrl + `/api/v1/parcel/${Id}`, config).then((response) => {
      setOrders(response.data);
    });
    return () => {
      setClickedDestination(false);
    };
  }, [clickDestination]);

  function pickUPHandler(e) {
    e.preventDefault();
    setClickedDestination(true);

    axios
      .put(
        baseUrl + `/api/v1/parcel/${Id}/presentLocation`,
        OrderDataPresentLocation,
        config
      )
      .catch((error) => {
        console.log(error);
      });
  }

  function statusHandlerOnRoute(e) {
    e.preventDefault();
    // setClickedDestination(false)
    setClickedDestination(true);
    // setStatus("On route");
    axios
      .put(
        baseUrl + `/api/v1/parcel/${Id}/status`,
        OrderDataStatusOnroute,
        config
      )
      .catch((error) => {
        console.log(error);
      });
  }
  function statusHandlerDelivered(e) {
    e.preventDefault();
    // setClickedDestination(false)
    setClickedDestination(true);
    // setStatus("Delivered");
    axios
      .put(
        baseUrl + `/api/v1/parcel/${Id}/status`,
        OrderDataStatusDelivered,
        config
      )
      .catch((error) => {
        console.log(error);
      });
  }
  const info = orders;

  return (
    <div className="main-section">
      <div className="main">.</div>
      <div className="title">
        <h1>Users Order</h1>
      </div>
      {info ? (
        <div className="">
          {[...info].map((item) => (
            <div className="" key={item._id}>
              <p>User Name: {item.user.name}</p>
              <p>Parcel Name: {item.parcelName}</p>
              <p>pickUp: {item.pickUp}</p>
              <p>destination: {item.destination}</p>
              <p>status: {item.status}</p>
              <p>Order Cancelled: {!item.isCancelled ? "No" : "Yes"}</p>
            </div>
          ))}
        </div>
      ) : (
        <h3>PLEASE WAIT LOADING......</h3>
      )}

      <div className="">
        {!info ? (
          ""
        ) : (
          <button type="submit" onClick={() => setClicked(true)}>
            Make Adjustments
          </button>
        )}
        {/* {!info ? "" : <button type="submit" onClick={()=>setClickedDestination(false)}>Change Present Location</button>} */}

        {clicked ? (
          <form action="">
            <div className="">
              {/* <input type="text"
                placeholder="Change status"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                /> */}
              <h4>Change status</h4>
              <button type="submit" onClick={statusHandlerOnRoute}>
                On Route
              </button>
              <button type="submit" onClick={statusHandlerDelivered}>
                Delivered
              </button>
            </div>
            <div className="">
              <input
                type="text"
                placeholder="Change Present Location"
                value={pickUp}
                onChange={(e) => setPickUp(e.target.value)}
              />
              <button type="submit" onClick={pickUPHandler}>
                Change location
              </button>
            </div>
          </form>
        ) : (
          ""
        )}
      </div>

      <div className="page-results"></div>
    </div>
  );
}

export default AdminViewOrder;
