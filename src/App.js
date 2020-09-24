import productApi from "api/productApi";
import SignIn from "features/Auth/pages";
import firebase from "firebase";
import React, { Suspense, useEffect, useState } from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import "reactstrap";
import "./App.scss";
import Header from "./components/Header";
import NotFound from "./components/NotFound";
require("dotenv").config();
//Lazy load - Code splitting
const Photo = React.lazy(() => import("./features/Photo"));

// Config FireBase

// Configure Firebase.
const config = {
  apiKey: "AIzaSyA7FdXP3f3CI2iUVuENbmARccrF45nFZko",
  authDomain: "react-redux-app-29eaf.firebaseapp.com",
  // ...
};
firebase.initializeApp(config);

function App() {
  //Handle firebase auth changed
  useEffect(() => {
    //DID MOUNT
    const unregisterAuthObserver = firebase
      .auth()
      .onAuthStateChanged(async (user) => {
        if (!user) {
          // user logs out, handle somthing here
          console.log("USER NOT LOGGIN");
          return;
        }
        console.log("Log user name: ", user.displayName);
        const token = await user.getIdToken();
        console.log("Log token name: ", token);
      });
    //UNMOUNT
    return () => unregisterAuthObserver();
  }, []);

  const [productList, setProductList] = useState([]);

  useEffect(() => {
    const fetchProductList = async () => {
      try {
        const params = {
          _page: 1,
          _limit: 10,
        };

        const response = await productApi.getAll(params);
        setProductList(response.data);
        console.log(response);
      } catch (error) {
        console.log("failed to fetch api: ", error);
      }
    };
    fetchProductList();
  }, []);

  return (
    <div className="photo-app">
      <Suspense fallback={<div>Loading...</div>}>
        <BrowserRouter>
          <Header />
          <Switch>
            <Redirect exact from="/" to="/photos" />
            <Route path="/photos" component={Photo} />
            <Route path="/sign-in" component={SignIn} />
            <Route component={NotFound} />
          </Switch>
        </BrowserRouter>
      </Suspense>
    </div>
  );
}

export default App;
