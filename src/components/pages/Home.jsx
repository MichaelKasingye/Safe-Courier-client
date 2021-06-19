import React from "react";
import { Link } from "react-router-dom";
import { useStateValue } from "../ContextAPI/StateProvider";


function Home() {
  const [{ user }] = useStateValue();

  return (
    <div className="home">
      <h1>Safe Courier</h1>

      {!user ? (
        <div className="">
          <button>
            <Link style={{ color: "white" }} to="/login">
              SIGN UP
            </Link>
          </button>
          <button>
            <Link style={{ color: "white" }} to="/login">
              LOGIN
            </Link>
          </button>
        </div>
      ) : (
        <div>
          <h4>Wellcome {user}</h4>
          <p style={{ fontSize: "1.5rem" }}>
            Click the button below to post an Order
          </p>
          <button>
            <Link style={{ color: "white" }} to="/postorder">
              Post an Order
            </Link>
          </button>
        </div>
      )}
    </div>
  );
}

export default Home;
