import React from "react";
import { Link } from "react-router-dom";
import { auth } from "../Firebase/firebase";

function Home() {
  const signedOut = auth.signOut();
  return (
    <div className="home">
      <h1>Code Challenge</h1>

      {!signedOut ? (
        <button>
          <Link style={{ color: "white" }} to="/login">
            Sign Up
          </Link>
        </button>
      ) : (
        <div>
          <h4>Wellcome</h4>
          <p style={{ fontSize: "1.5rem" }}>
            View more of the site from the links above
          </p>
        </div>
      )}
    </div>
  );
}

export default Home;
