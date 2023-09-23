import "./App.css";
import Header from "./component/layout/Header/Header.js";
import Footer from "./component/layout/Footer/Footer.js";
import { BrowserRouter as Router } from "react-router-dom";
import { Routes , Route } from  'react-router-dom';
import webFont from "webfontloader";
import React from "react";
import Home from "./component/Home/Home.js";
import {  ToastContainer } from "react-toastify";
//import Loader from "./component/layout/Loader/loader.js";
import ProductDetails from "./component/Product/ProductDetails.js";
import Products from './component/Product/Products.js';
import Search from "./component/Product/Search.js";
import LoginSignUp from "./component/User/LoginSignUp";


function App() {
  
  React.useEffect(() => {
    webFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });
  }, []);
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/product/:id" element={<ProductDetails />} />
          <Route exact path="/products/" element={<Products />} />
          <Route path="/products/:keyword" element={<Products />} />
          <Route exact path="/search" element={<Search />} />
          <Route exact path="/login" element={<LoginSignUp />} />
        </Routes>
        <Footer />
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
