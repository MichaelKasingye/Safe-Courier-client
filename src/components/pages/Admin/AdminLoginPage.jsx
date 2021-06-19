import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import {  baseUrl } from "../../../global/config";

import axios from "axios";

// import { auth } from "../Firebase/firebase";
import "../loginPage.css";
function LoginPage() {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [press, setPress] = useState(false);


  const signUpData = {
    name: name,
    email: email,
    password: password
  };
  const loginData = {
    name: name,
    password: password
  };

  function login(e) {
    e.preventDefault();

    console.log(signUpData);
    axios
      .post(baseUrl + "/api/v1/auth/login", loginData)
      .then((response) => {
        console.log(response.data);
        history.push("/allorders");
        localStorage.setItem('token', response.data.acessToken);
        localStorage.setItem("name", name);
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
      setPassword("");
  }

  function register(e) {
    e.preventDefault();

    console.log(signUpData);
    axios
      .post(baseUrl + "/api/v1/auth/signup", signUpData)
      .then((response) => {
        console.log(response.data.acessToken);
        localStorage.removeItem("token");
        localStorage.removeItem("name");
        localStorage.setItem('token', response.data.acessToken);
        localStorage.setItem("name", name);

        history.push("/allorders");
        window.location.reload();

      })
      .catch((error) => {
        console.log(error);
      });
      setPassword("");
  }

  return (
    <div className="Results">
      <div>.</div>

      <div className="login">
        <Link to="/"></Link>
        <div className="login_container">
        {press?<h1>Admin Login</h1>:<h1>Create Admin Account</h1>}
          
          <form>
          <h5>Name</h5>
            <input
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
            {press?" ": 
            <>
            <h5>E-mail</h5>
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
            </>}
            <h5>Password</h5>
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </form>
          {press?<>
          <button type="submit" onClick={login} className="login_signButton">
              Sign In
            </button>
          </>:
          <>
          <button className="login_registerButton" onClick={register}>
            Create your Account
          </button>
          </>}
            

          
          <div className="register_buttons">
            {press?<p className="register_button" onClick={() => setPress(false)} >
            Create your new Account 
          </p>:<p className="register_button" type="submit" onClick={() => setPress(true)} >
              Sign In from Here if you have an Account
            </p>}
          

          
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
