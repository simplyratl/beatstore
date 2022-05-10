import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../../context/Context';
import '../../style/dist/checkoutadded.min.css';
import PaypalButton from './PaypalButton';

const CheckoutAdded = () => {
    const [total, setTotal] = useState(0);

    const { cart, setCart } = useContext(Context);

    useEffect(() => {
        const calculateTotal = () => {
            let counter = 0;

            for (let i = 0; i < cart?.length; i++) {
                counter += cart[i].basic_licence;
            }
            setTotal(counter.toFixed(2));
        };

        calculateTotal();
    }, [cart]);

    return (
        <div className='checkout-added-container'>
            <h2>Cart Summary</h2>

            <div className='pricing'>
                <div className='subtotal'>
                    <span className='subtotal-title'>Subtotal</span>
                    <div className='price'>${total}</div>
                </div>

                <div className='subtotal'>
                    <span className='subtotal-title'>Discount</span>
                    <div className='price'>-$0.00</div>
                </div>

                <div className='subtotal total'>
                    <span className='subtotal-title'>TOTAL</span>
                    <div className='price'>${total}</div>
                </div>

                <div className='paypal-button'>
                    <PaypalButton total={total} />
                </div>
            </div>
        </div>
    );
};

export default CheckoutAdded;
