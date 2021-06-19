import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useStateValue } from "../ContextAPI/StateProvider";
// import {user} from "../../global/user"


import axios from "axios";

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
            View more of the site from the links above
          </p>
        </div>
      )}
    </div>
  );
}

export default Home;
