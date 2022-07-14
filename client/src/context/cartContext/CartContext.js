import CartReducers from "./CartReducers";
import React, { createContext, useContext, useEffect, useReducer, useState } from "react";

const INITIAL_STATE = {
    cart: JSON.parse(localStorage.getItem("cart")) || [],
};

export const CartContext = createContext(INITIAL_STATE);

export const CartContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(CartReducers, INITIAL_STATE);

    useEffect(() => {
        if (state.cart) {
            localStorage.setItem("cart", JSON.stringify(state.cart));
        } else {
            localStorage.setItem("cart", null);
        }
    }, [state.cart]);

    return (
        <CartContext.Provider
            value={{
                cart: state.cart,
                error: state.error,
                dispatch,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};
