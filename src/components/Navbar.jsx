import React, { useEffect, useState } from "react";
import { FaBars } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import { Link } from "react-router-dom";
import { SidebarData } from "./Sidebar";
import { IconContext } from "react-icons";
import { useStateValue } from "./ContextAPI/StateProvider";
import { auth } from "./Firebase/firebase";
import { useHistory } from "react-router-dom";
import "./navbar.css";

function Navbar() {
  const [sidebar, setSidebar] = useState(false);
  const [navbar, setNavbar] = useState(false);
  const [burger, setBurger] = useState(false);
  const [{ user }] = useStateValue();
  const history = useHistory();


//   function redirect(){
//     if (!user) {
//      history.push("/login");
//    } 
//  }
  

// useEffect(() => {
//  redirect()

// }, [])
  const showSidebar = () => setSidebar(!sidebar);

  const showBurger = () => {
    if (window.innerWidth <= 500) {
      setBurger(true);
    } else {
      setBurger(false);
    }
  };

  // function theUserSignOut() {
  //   const signedOut = auth.signOut();
  //   if (signedOut) {
  //     history.push("/login");
  //   } else {
  //     history.push("/login");
  //   }
  // }
  // const out = " ";
  // useEffect(() => {
  //   showBurger();
  //   theUserSignOut();
  //   return () => {
  //     // Unsubscribe();
  //   };
  // }, [out]);

  window.addEventListener("resize", showBurger);

  const changeBackground = () => {
    if (window.scrollY >= 50) {
      setNavbar(true);
    } else {
      setNavbar(false);
    }
  };

  window.addEventListener("scroll", changeBackground);

  function signOut() {
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    window.location.reload();
  history.push("/login");

  }

  console.log(user);

  return (
    <>
      <IconContext.Provider value={{ size: "1.5rem" }}>
        <div className={navbar ? "navbar active" : "navbar"}>
          {burger ? (
            <Link to="#" className="menu-bars">
              <FaBars onClick={showSidebar} />
            </Link>
          ) : (
            <Link to="/" className="logo">
              <h3>Safe Courier</h3>
            </Link>
          )}

          {burger ? (
            ""
          ) : (
            <div className="nav-menu">
              <Link to="/">Home</Link>
              <Link to="/postorder">Factorial</Link>
              <Link to="/allorders"> Square root</Link>
              <Link to="/UserOrders"> your Orders</Link>

              <Link to="/results"> Results</Link>
              <Link to="/login">{user?.email}</Link>
              {!user ? (
                 
                <Link to="/login" onClick={signOut}>
                  Login</Link>
              ) : (
                <> 
                 <p>{user}</p>
                <Link to="/login" onClick={signOut}>
                  Sign Out 
                </Link>
                </>
              )}
            </div>
          )}

          {burger ? (
            <Link to="/" className="logo">
              <h3>CodeChallenge</h3>
            </Link>
          ) : (
            ""
          )}
        </div>
        <div className={sidebar ? "sidebar-menu active" : "sidebar-menu"}>
          <ul className="sidebar-menu-items" onClick={showSidebar}>
            <li className="navbar-toggle">
              <Link to="#" className="menu-bars">
                <AiOutlineClose
                  style={{ color: "black" }}
                  onClick={showSidebar}
                />
              </Link>
            </li>
            {SidebarData.map((item, index) => {
              return (
                <li key={index} className={item.cName}>
                  <Link to={item.path}>
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </IconContext.Provider>
    </>
  );
}

export default Navbar;
