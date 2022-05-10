import React from 'react';
import CheckoutAdded from '../components/Checkout/CheckoutAdded';
import PaymentForm from '../components/Checkout/PaymentForm';
import '../style/dist/checkout.min.css';

const Checkout = () => {
    return (
        <div className='checkout-container' style={{ marginTop: 80 }}>
            <PaymentForm />
            <CheckoutAdded />
        </div>
    );
};

export default Checkout;
