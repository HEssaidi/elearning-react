import React, { useState, useEffect } from "react";
import logo from '../logo.svg';
import Navbar from "../components/Nav/Navbar";
import Footer from "../components/Footer";
import Upload from "../components/Upload";
import Recherche from "../components/Recherche";
import Login from "../components/Login";
import Signup from "../components/Signup";
import ObjectDetails from "../components/Recherche/ObjectDetails";
// import ObjectsList from "../components/ObjectsList";

import {
  BrowserRouter,
  Route,
  Switch,
  HashRouter,
  Redirect,
  useHistory
} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/index.css";
// import Footer from '../components/Footer';
// import './App.css';

function App() {

  const [loggedIn, setLoggedIn] = useState(JSON.parse(localStorage["authStorage"]).isLoggedIn);

  let locals = localStorage["authStorage"];
  if (
    typeof locals == "undefined" ||
    typeof locals == undefined ||
    typeof locals === "undefined"
  ) {
    console.log("Kayn problem hna !!!")
    let authStorage = {
      isLoggedIn: false,
      user: {}
    };
    localStorage["authStorage"] = JSON.stringify(authStorage);
  } else {
    console.log("Kayn problem hna !!!")
    // console.log("NOT UNDEFINED++  ", locals);
  }


  return (
    <HashRouter>
      <div className="App">
        <Navbar
          {...{ loggedIn }}
          // logoutUser={_logoutUser}
          user={JSON.parse(localStorage["authStorage"]).user}
          isLoggedIn={
            JSON.parse(localStorage["authStorage"]).isLoggedIn
          }
        />
        <div style={{ paddingTop: 66 }}>

          <Switch>
            <Route
              exact
              path="/upload"
              render={props => <Upload {...props} />}
            // component={Form}
            />
            <Redirect exact from="/" to="recherche" />
            <Route
              exact
              path="/recherche"
              render={props => <Recherche {...props} />}
            // component={Form}
            />
            <Route
              exact
              path="/login"
              render={props => <Login {...props} />}
            // component={Form}
            />
            <Route
              exact
              path="/signup"
              render={props => <Signup {...props} />}
            // component={Form}
            />
            <Route
              path="/object_details/:object_id"
              component={ObjectDetails}
            />
          </Switch>
          {/* <header className="App-header"> */}
          {/* <img src={logo} className="App-logo" alt="logo" />
        <p>
         <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a> Edit <code>src/App.js</code> and save to reload.
        </p> */}

          {/* </header> */}
        </div>
        {/* <Footer /> */}
      </div>
    </HashRouter>
  );
}

export default App;
