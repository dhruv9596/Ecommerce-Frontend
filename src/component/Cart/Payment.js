import React, { Fragment, useRef , useEffect } from "react";
import CheckoutSteps from "../Cart/CheckoutSteps";
import { useSelector, useDispatch } from "react-redux";
import MetaData from "../layout/MetaData";
import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import axios from "axios";
import "./Payment.css";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import EventIcon from "@mui/icons-material/Event";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import { createOrder, clearErrors } from "../../actions/orderActions";

const Payment = () => {
  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));
  const dispatch = useDispatch();
  const stripe = useStripe();
  const elements = useElements();
  const payBtn = useRef(null);
  const navigate = useNavigate();
  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);
  const { error } = useSelector((state) => state.newOrder);
  console.log("User in Payment Page ", user);
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0Yjk4NTdjYmVjYjg3OGI4ZmYzMDBmNyIsImlhdCI6MTcwMjEwNzE3N30.k4ikA0SNXd27ExYMi54oE1REyjktnW0kekcZ4rga11o';
  const paymentData = {
    amount: Math.round(orderInfo.totalPrice * 100),
  };

  const order = {
    shippingInfo,
    orderItems: cartItems,
    itemsPrice: orderInfo.subtotal,
    taxPrice: orderInfo.tax,
    shippingPrice: orderInfo.shippingCharges,
    totalPrice: orderInfo.totalPrice,
  };

  const submitHandler = async (e) => {
    if(!user) return ;
    e.preventDefault();
    payBtn.current.disabled = true;
    try {
      console.log( 'Try Str');
      const config = {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      };
      console.log("User bfr", user);
      const { data } = await axios.post(
        "https://ecommerce-i8go.onrender.com/api/v1/payment/process",
        paymentData,
        config
      );
      console.log( 'APi Cmp');
      console.log("User atr", user);
      console.log("Data ", data);
      const client_sec = data?.client_secret;
      const client_secret = client_sec.toString();
      console.log("Client Secret ", client_secret);
      if (!stripe || !elements) return;

      const result = await stripe.confirmCardPayment(client_secret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
          billing_details: {
            name: user?.name,
            email: user?.email,
            address: {
              line1: shippingInfo?.address,
              city: shippingInfo?.city,
              state: shippingInfo?.state,
              postal_code: shippingInfo?.pinCode,
              country: shippingInfo?.country,
            },
          },
        },
      });
      if (result.error) {
        payBtn.current.disabled = false;
        console.log("result Error ", result.error.message);
        toast.error(result.error.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
      } else {
        if (result.paymentIntent.status === "succeeded") {
          order.paymentInfo = {
            id: result.paymentIntent.id,
            status: result.paymentIntent.status,
          }; 
          dispatch(createOrder(order));
          navigate("/success");
        } else {
          toast.error("There's some issue while processing payment ", {
            position: toast.POSITION.TOP_RIGHT,
          });
        }
      }
    } catch (error) {
      payBtn.current.disabled = false;
      const err = error?.response?.data?.message;
      console.log("Err from Catch Part ", err);
      toast.error(err, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  useEffect(() => {
      if (error) {
        toast.success("Logged In Successfully", {
        position: toast.POSITION.TOP_RIGHT,
      });
        dispatch(clearErrors());
      }
    }, [dispatch, error]);

  return (
    <Fragment>
      <MetaData title="Payment" />
      <CheckoutSteps activeStep={2} />
      <div className="paymentContainer">
        <form className="paymentForm" onSubmit={(e) => submitHandler(e)}>
          <Typography>Card Info</Typography>
          <div>
            <CreditCardIcon />
            <CardNumberElement className="paymentInput" />
          </div>
          <div>
            <EventIcon />
            <CardExpiryElement className="paymentInput" />
          </div>
          <div>
            <VpnKeyIcon />
            <CardCvcElement className="paymentInput" />
          </div>

          <input
            type="submit"
            value={`Pay - ₹${orderInfo && orderInfo.totalPrice}`}
            ref={payBtn}
            className="paymentFormBtn"
          />
        </form>
      </div>
    </Fragment>
  );
};

export default Payment;

// const [stripeApiKey , setStripeApiKey ] = useState("");
// async function getStrpeApiKey() {
//   const { data } = await axios.get(
//     "http://localhost:4000/api/v1/stripeapikey"
//   );
//   setStripeApiKey(data.stripeApiKey);
//   console.log("StripeApi Key ", data.stripeApiKey);
// }
// React.useEffect(() => {
//   getStrpeApiKey();
// }, []);
// return <div>Payment Page</div>
