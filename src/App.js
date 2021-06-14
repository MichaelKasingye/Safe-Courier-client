import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./components/pages/Home";
import Results from "./components/pages/Results";
import Squareroot from "./components/pages/Squareroot";
import Factorial from "./components/pages/Factorial";
import Login from "./components/pages/LoginPage";
import SignUp from "./components/pages/SignUp";
import { auth } from "./components/Firebase/firebase";
import { useStateValue } from "./components/ContextAPI/StateProvider";

function App() {
  const [{ user }, dispatch] = useStateValue();
  const none = "";
  //code to run on a given condition
  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        //loggrd in
        dispatch({
          type: "SET_USER",
          user: authUser,
        });
      } else {
        //logged out
        dispatch({
          type: "SET_USER",
          user: null,
        });
      }
    });
    return () => {
      // Unsubscribe
    };
  }, []);
  console.log("User is >>>>", user);
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/signUp" component={SignUp} />
          <Route path="/squareroot" component={Squareroot} />
          <Route path="/factorial" component={Factorial} />
          <Route path="/results" component={Results} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
