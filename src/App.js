import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./components/pages/Home";
import Results from "./components/pages/Results";
import AllOrders from "./components/pages/Admin/AllOrders";
import UserOrders from "./components/pages/SpecificUserOrder";
import ViewOrder from "./components/pages/ViewOrder";


import PostOrder from "./components/pages/PostOrder";
import Login from "./components/pages/LoginPage";
import AdminSignUp from "./components/pages/Admin/AdminLoginPage";
import AdminViewOrder from "./components/pages/Admin/AdminViewOrder";


function App() {
  


  return (
    <div className="App">
      <Router>
        <Navbar />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/adminsignUp" component={AdminSignUp} />
          <Route path="/adminviewOrder/:Id" component={AdminViewOrder} />

          <Route path="/allorders" component={AllOrders} />
          <Route path="/UserOrders" component={UserOrders} />
          <Route path="/viewOrder/:Id" component={ViewOrder} />


          <Route path="/postorder" component={PostOrder} />
          <Route path="/results" component={Results} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
