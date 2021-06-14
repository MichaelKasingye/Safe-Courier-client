import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { auth } from "../Firebase/firebase";
import "./loginPage.css";
function LoginPage() {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function login(event) {
    event.preventDefault();
    auth
      .signInWithEmailAndPassword(email, password)
      .then((auth) => {
        history.push("/");
      })
      .catch((e) => {
        alert(e.message);
      });
  }

  function register(event) {
    event.preventDefault();
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((auth) => {
        history.push("/");
      })
      .catch((e) => {
        alert(e.message);
      });
  }

  return (
    <div className="Results">
      <div>.</div>

      <div className="login">
        <Link to="/"></Link>
        <div className="login_container">
          <h1>Sign in</h1>
          <form>
            <h5>E-mail</h5>
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
            <h5>Password</h5>
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
            <button type="submit" onClick={login} className="login_signButton">
              Sign In
            </button>
          </form>

          <button className="login_registerButton" onClick={register}>
            Create your Account
          </button>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
