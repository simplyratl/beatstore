import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BeatPlayProvider } from "./context/Context";
import { AuthContextProvider } from "./context/authContext/AuthContext";
import { CartContextProvider } from "./context/cartContext/CartContext";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { ParallaxProvider } from "react-scroll-parallax";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
    <AuthContextProvider>
        <BeatPlayProvider>
            <CartContextProvider>
                <PayPalScriptProvider options={{ "client-id": process.env.REACT_APP_PAYPAL_CLIENT }}>
                    <ParallaxProvider>
                        <App />
                    </ParallaxProvider>
                </PayPalScriptProvider>
            </CartContextProvider>
        </BeatPlayProvider>
    </AuthContextProvider>
);
