import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PayPalButtons } from "@paypal/react-paypal-js";
import { Context } from "../../context/Context";
import axios from "axios";
import { v4 as uuid } from "uuid";
import { CartContext } from "../../context/cartContext/CartContext";

const PaypalButton = ({ total }) => {
    const { cart } = useContext(CartContext);
    const navigate = useNavigate();
    const [transaction, setTransaction] = useState({});
    const [download, setDownload] = useState([]);

    useEffect(() => {
        if (transaction.status === "COMPLETED") {
            const transactionUpdate = async () => {
                try {
                    const res = await axios({
                        method: "POST",
                        url: "http://192.168.1.8:8800/transaction",
                        data: {
                            trackingID: transaction.id,
                            productName: transaction.purchase_units,
                            customerName: `${transaction.payer.name.given_name} ${transaction.payer.name.surname}`,
                            price: parseInt(transaction.purchase_units[0].amount.value),
                            paymentMethod: "Paypal",
                            status: "Approved",
                        },
                        headers: {
                            token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
                        },
                    });
                    return res;
                } catch (error) {
                    console.log(error);
                }
            };

            transactionUpdate();

            setTimeout(() => {
                navigate(`/checkout/${transaction.id}`);
            }, [2000]);
        }
    }, [transaction]);
    return (
        <>
            <PayPalButtons
                createOrder={(data, actions) => {
                    return actions.order.create({
                        purchase_units: [
                            {
                                title: cart.map((item) => {
                                    return item.title;
                                }),
                                amount: {
                                    currency_code: "USD",
                                    value: total,
                                    breakdown: {
                                        item_total: {
                                            currency_code: "USD",
                                            value: total,
                                        },
                                    },
                                },
                                items: cart.map((item) => {
                                    return {
                                        name: item.title,
                                        unit_amount: {
                                            currency_code: "USD",
                                            value: item.basic_licence,
                                        },
                                        quantity: 1,
                                    };
                                }),
                            },
                        ],
                    });
                }}
                onApprove={async (data, actions) => {
                    const order = await actions.order.capture();
                    setTransaction(order);
                }}
                onError={(error) => {
                    console.log(error);
                }}
            />

            <span className="status">
                {transaction.status === "COMPLETED" && `Payment successful, redirecting...`}
            </span>
        </>
    );
};

export default PaypalButton;
