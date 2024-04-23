import "./App.css";
import Header from "./component/layout/Header/Header.js";
import Footer from "./component/layout/Footer/Footer.js";
import { BrowserRouter as Router } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import webFont from "webfontloader";
import React, { useEffect } from "react";
import Home from "./component/Home/Home.js";
import { ToastContainer } from "react-toastify";
//import Loader from "./component/layout/Loader/loader.js";
import ProductDetails from "./component/Product/ProductDetails.js";
import Products from "./component/Product/Products.js";
import Search from "./component/Product/Search.js";
import LoginSignUp from "./component/User/LoginSignUp";
import store from "./store";
import { loadUser } from "./actions/userActions";
import UserOptions from "./component/layout/Header/UserOptions.js";
import { useSelector } from "react-redux";
import Profile from "./component/User/Profile.js";
import ProtectedRoute from "./component/Route/ProtectedRoute.js";
import UpdateProfile from "./component/User/UpdateProfile.js";
import Cart from "./component/Cart/Cart";
import Shipping from "./component/Cart/Shipping";
import ConfirmOrder from "./component/Cart/ConfirmOrder";
import Purchase from "./component/Cart/Purchase.js";
import OrderSuccess from "./component/Cart/OrderSuccess.js";
import MyOrders from "./component/Order/MyOrders.js";
import OrderDetails from "./component/Order/OrderDetails.js";
import Dashboard from "./component/Admin/Dashboard.js";
import ProductList from "./component/Admin/ProductList.js";
import NewProduct from "./component/Admin/NewProduct.js";
import UpdateProduct from "./component/Admin/UpdateProduct.js";
import OrderList from "./component/Admin/OrderList.js";
import ProcessOrder from "./component/Admin/ProcessOrder.js";
import UsersList from "./component/Admin/UsersList.js";
import UpdateUser from "./component/Admin/UpdateUser.js";
import ProductReviews from "./component/Admin/ProductReviews.js";
import About from "./component/layout/About/About.js";
import Contact from "./component/layout/Contact/Contact.js";
import NotFound from "./component/layout/Not Found/NotFound.js";
function App() {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  useEffect(() => {
    console.log("User-->", user);
  }, [user]); 

  React.useEffect(() => {
    webFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });
    store.dispatch(loadUser());
  }, []);

  // window.addEventListener("contextmenu" , (e) =>e.preventDefault());

  return (
    <>
      <Router>
        <Header />
        {isAuthenticated && <UserOptions user={user} />}
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/about" element={<About />} />
          <Route exact path="/contact" element={<Contact />} />
          <Route exact path="/product/:id" element={<ProductDetails />} />
          <Route exact path="/products/" element={<Products />} />
          <Route path="/products/:keyword" element={<Products />} />
          <Route exact path="/search" element={<Search />} />
          <Route
            exact
            path="/account"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path="/me/update"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <UpdateProfile />
              </ProtectedRoute>
            }
          />
          <Route exact path="/login" element={<LoginSignUp />} />
          <Route exact path="/cart" element={<Cart />} />
          <Route
            exact
            path="/login/shipping"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <Shipping />
              </ProtectedRoute>
            }
          />

          <Route
            exact
            path="/process/payment"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <Purchase />
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path="/success"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <OrderSuccess />
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path="/orders"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <MyOrders />
              </ProtectedRoute>
            }
          />

          <Route
            exact
            path="/order/confirm"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <ConfirmOrder />
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path="/order/:id"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <OrderDetails />
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path="/admin/dashboard"
            element={
              <ProtectedRoute isAdmin={true} isAuthenticated={isAuthenticated}>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path="/admin/products"
            element={
              <ProtectedRoute isAdmin={true} isAuthenticated={isAuthenticated}>
                <ProductList />
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path="/admin/product"
            element={
              <ProtectedRoute isAdmin={true} isAuthenticated={isAuthenticated}>
                <NewProduct />
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path="/admin/product/:id"
            element={
              <ProtectedRoute isAdmin={true} isAuthenticated={isAuthenticated}>
                <UpdateProduct />
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path="/admin/orders"
            element={
              <ProtectedRoute isAdmin={true} isAuthenticated={isAuthenticated}>
                <OrderList />
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path="/admin/order/:id"
            element={
              <ProtectedRoute isAdmin={true} isAuthenticated={isAuthenticated}>
                <ProcessOrder />
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path="/admin/users"
            element={
              <ProtectedRoute isAdmin={true} isAuthenticated={isAuthenticated}>
                <UsersList />
              </ProtectedRoute>
            }
          />
          {/* <Route
              exact
              path="/admin/user/:id"

              element={
                <ProtectedRoute isAdmin={true} isAuthenticated={isAuthenticated}>
                  <UpdateUser />
                </ProtectedRoute>
              }
            /> */}
          <Route
            exact
            path="/admin/reviews"
            element={
              <ProtectedRoute isAdmin={true} isAuthenticated={isAuthenticated}>
                <ProductReviews />
              </ProtectedRoute>
            }
          />
          <Route
            element={
                <NotFound />
            }
          />
        </Routes>
        <Footer />
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
