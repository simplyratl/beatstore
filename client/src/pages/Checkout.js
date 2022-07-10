import React, { useContext, useLayoutEffect } from "react";
import CheckoutAdded from "../components/Checkout/CheckoutAdded";
import PaymentForm from "../components/Checkout/PaymentForm";
import { motion, AnimatePresence } from "framer-motion";
import { AuthContext } from "../context/authContext/AuthContext";
import "../style/dist/checkout.min.css";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    useLayoutEffect(() => {
        if (!user) navigate("/");
    }, []);

    return (
        <AnimatePresence>
            <motion.div
                className="checkout-container"
                style={{ marginTop: 80 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8 }}
            >
                <PaymentForm />
                <CheckoutAdded />
            </motion.div>
        </AnimatePresence>
    );
};

export default Checkout;
