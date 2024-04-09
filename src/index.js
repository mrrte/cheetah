import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "bootstrap/dist/css/bootstrap.css";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { G_CLIENT_ID } from "./constants/envConstants";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { StripeProvider } from '@stripe/react-stripe-js';
import {
  PaymentElement,
  Elements,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { STRIPE_KEY } from "./constants/envConstants";
console.log("STRIPE_KEY",STRIPE_KEY)
const stripePromise = loadStripe(STRIPE_KEY);
const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <Elements stripe={stripePromise}>
  <Provider store={store}>
    <BrowserRouter>
      <GoogleOAuthProvider clientId={G_CLIENT_ID}>
     
        <App />
      
      </GoogleOAuthProvider>
    </BrowserRouter>
  </Provider>
  </Elements>
);
