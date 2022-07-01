import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BeatPlayProvider } from "./context/Context";
import { AuthContextProvider } from "./context/authContext/AuthContext";
import { CartContextProvider } from "./context/cartContext/CartContext";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
    <AuthContextProvider>
        <BeatPlayProvider>
            <CartContextProvider>
                <App />
            </CartContextProvider>
        </BeatPlayProvider>
    </AuthContextProvider>
);
