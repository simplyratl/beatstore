import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "../../context/cartContext/CartContext";
import { AuthContext } from "../../context/authContext/AuthContext";
import "../../style/dist/checkoutadded.min.css";
import PaypalButton from "./PaypalButton";
import axios from "axios";

const CheckoutAdded = () => {
    const [total, setTotal] = useState(0);
    const [discountName, setDiscountName] = useState("");
    const [discount, setDiscount] = useState(0);

    const [couponError, setCouponError] = useState("");

    const { cart } = useContext(CartContext);
    const { user } = useContext(AuthContext);

    useEffect(() => {
        const calculateTotal = () => {
            let counter = 0;

            for (let i = 0; i < cart?.length; i++) {
                counter += cart[i].basic_licence;
            }
            setTotal(counter);
        };

        calculateTotal();
    }, [cart]);

    const handleCoupon = async () => {
        if (discountName.length === 0) return;
        if (discount > 0) return setCouponError("You already redeemed your coupon.");

        setCouponError("");

        try {
            const res = await axios.get(`http://localhost:8800/coupon/${discountName}`, {
                headers: {
                    token: `Bearer ${user.accessToken}`,
                },
            });

            if (!res.data[0]?.percent) return setCouponError("The coupon you entered is not valid.");

            calculatePercent(res.data[0].percent);
            return res;
        } catch (error) {
            console.log(error);
        }
    };

    const calculatePercent = (percent) => {
        if (!percent) return;

        const percentNumber = (total * percent) / 100;

        setDiscount(percentNumber.toFixed(2));
        setTotal(total - percentNumber.toFixed(2));

        setTimeout(() => {
            setCouponError("");
        }, 2000);

        setCouponError(`Code ${discountName} successfuly reedemed.`);
    };

    return (
        <div className="checkout-added-container">
            <h2>Cart Summary</h2>

            <div className="pricing">
                <div className="subtotal">
                    <span className="subtotal-title">Subtotal</span>
                    <div className="price">${total}</div>
                </div>

                <div className="subtotal">
                    <span className="subtotal-title">Discount</span>
                    <div className="price">-${discount}</div>
                </div>

                <div className="subtotal total">
                    <span className="subtotal-title">TOTAL</span>
                    <div className="price">${total}</div>
                </div>

                <div className="discount">
                    <input
                        type="text"
                        className="discount"
                        placeholder="Example: 54QJCX"
                        onChange={(e) => setDiscountName(e.target.value)}
                    />
                    <button className="discount-submit" type="button" onClick={handleCoupon}>
                        Add Discount Code
                    </button>

                    <span className="error">{couponError}</span>
                </div>

                {user ? (
                    <div className="paypal-button" style={{ marginTop: 18 }}>
                        <PaypalButton total={total} />
                    </div>
                ) : (
                    <h2>You have to login to buy beats.</h2>
                )}
            </div>
        </div>
    );
};

export default CheckoutAdded;
