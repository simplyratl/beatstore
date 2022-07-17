import React from "react";
import "../../style/dist/buynow.min.css";

const BuyNow = () => {
    return (
        <div className="buynow-container">
            <h1>BUY BEAT IN 1 MINUTE</h1>

            <h4>3 simple steps and in under one minute you can buy the beat you like.</h4>

            <div className="steps">
                <div className="step">
                    <span>1.</span>

                    <h3>Find perfect beat for you</h3>
                    <p>Select any amount of beats you need, and add it to cart.</p>
                </div>
                <div className="step">
                    <span>2.</span>

                    <h3>Checkout</h3>
                    <p>Checkout using PayPal or direct debit card payment.</p>
                </div>
                <div className="step">
                    <span>3.</span>

                    <h3>Download</h3>
                    <p>That's it. In under 1 minute you can download beat(s) in high quality.</p>
                </div>
            </div>
        </div>
    );
};

export default BuyNow;
