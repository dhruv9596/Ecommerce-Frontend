import React from 'react'
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Payment from './Payment';
const Purchase = () => {
    const stripeApiKey = loadStripe(
      "pk_test_51OKn5oSALSWsSgjv6hyr2D87P54igKr8OeSg6GJ3WajREYL5mlfA2OwXAwTcTwj5zdQDDfM28JYyKSQYa36vitYp00FiOhrkss"
    );
  return (
    <Elements stripe={stripeApiKey}>
      <Payment />
    </Elements>
  );
}

export default Purchase