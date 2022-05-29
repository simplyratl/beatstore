import React from 'react';
import '../../style/dist/buynow.min.css';

const BuyNow = () => {
    return (
        <div className='buynow-container'>
            <h1>BUY BEAT IN 1 MINUTE</h1>

            <h4>3 simple steps and in under one minute you can buy the beat you like.</h4>

            <div className='steps'>
                <div className='step'>
                    <h2>1.</h2>

                    <h3>Find perfect beat for you</h3>
                    <h5>Select any amount of beats you need, and add it to cart.</h5>
                </div>
                <div className='step'>
                    <h2>2.</h2>

                    <h3>Checkout</h3>
                    <h5>Checkout using PayPal or direct debit card payment.</h5>
                </div>
                <div className='step'>
                    <h2>3.</h2>

                    <h3>Download</h3>
                    <h5>That's it. In under 1 minute you can download beat(s) in high quality.</h5>
                </div>
            </div>
        </div>
    );
};

export default BuyNow;
