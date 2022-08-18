import React, { useState } from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import { Container, Row, Col } from "reactstrap";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// firebase
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "./config/firebaseConfig";

// axios
import Axios from "axios";

// react-router-dom
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";

// pages
import Home from "./Pages/Home";
import HomeUserSpecific from "./Pages/HomeUserSpecific";
import Signup from "./Pages/Signup";
import Signin from "./Pages/Signin";
import PageNotFound from "./Pages/PageNotFound";

//layouts
import Footer from "./Layouts/Footer";
import Header from "./Layouts/Header";

//context
import UserContext from "./Context/UserContext";

firebase.initializeApp(firebaseConfig);

const App = () => {
  const [user, setUser] = useState(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <ToastContainer position="bottom-right" />
      <Router>
        <Header />
        <Switch>
          <Route exact path="/" component={Home}></Route>
          <Route exact path="/user" component={HomeUserSpecific}></Route>
          <Route exact path="/signin" component={Signin}></Route>
          <Route exact path="/signup" component={Signup}></Route>
          <Route path="*" component={PageNotFound}></Route>
        </Switch>
      </Router>
      <Footer />
    </UserContext.Provider>
  );
};
export default App;
