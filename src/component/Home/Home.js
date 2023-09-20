import React, { Fragment , useEffect } from "react";
import { FaMouse } from "react-icons/fa";
import "./Home.css";
import ProductCard from "./ProductCard.js";
import MetaData from '../layout/MetaData.js';
import { getProduct } from '../../actions/productActions';
import Loader from '../layout/Loader/loader.js';
import { useSelector , useDispatch } from 'react-redux';
const Home = () => {
  //const alert = useAlert();
  const dispatch = useDispatch();
  const { loading , error , products , productsCount } = useSelector( state => state.products );
  useEffect(() => {
    dispatch(getProduct());
  }, [dispatch , error]);
  return (
    <Fragment>
      {loading ? ( <Loader/> ) : (
        <Fragment>
        <MetaData title ="ECOMMERCE"/>
      <div className="banner">
        <p>Welcome to Ecommerce</p>
        <h1>FIND AMAZING PRODUCTS BELOW</h1>
        <a href="#container">
          <button>
            Scroll
            <FaMouse />
          </button>
        </a>
      </div>
      <h2 className="homeHeading">Featured Products</h2>
      <div className="container" id="container">
        {products && products.map((product) => { return <ProductCard key={product._id} product={product} />; })}
      </div></Fragment>)}
    </Fragment>
  );
};

export default Home;
