import React, { useContext, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AiOutlineDelete } from 'react-icons/ai';
import '../../style/dist/paymentform.min.css';
import { CartContext } from '../../context/cartContext/CartContext';
import { removeAllCart, removeFromCart } from '../../context/cartContext/apiCalls';

const PaymentForm = () => {
    const [showConfirmation, setShowConfirmation] = useState(false);

    const { cart, dispatch } = useContext(CartContext);

    const deleteItems = () => {
        if (showConfirmation) {
            removeAllCart(dispatch);

            setShowConfirmation(false);
        }
    };

    const deleteSpecificItem = (deletedItem) => {
        removeFromCart(deletedItem, dispatch);
    };

    return (
        <div class='payment-container'>
            <div class='payment-wrapper'>
                <h2 class='title'>Checkout</h2>

                <span className='remove' onClick={() => setShowConfirmation(true)}>
                    Delete cart items.
                </span>

                <div className='added-container'>
                    {cart?.map((item, index) => (
                        <div className='added' key={index}>
                            <div className='info'>
                                <div className='image-container'>
                                    <img src={item.img} />
                                </div>

                                <div className='info-more'>
                                    <span className='title'>{item.title}</span>
                                    <span className='side'>
                                        {item.bpm}, {item.key}
                                    </span>
                                </div>
                            </div>

                            <div className='right'>
                                <div className='price'>${item.basic_licence}</div>

                                <span className='remove' onClick={() => deleteSpecificItem(item)}>
                                    <AiOutlineDelete />
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <AnimatePresence>
                {showConfirmation && (
                    <motion.div
                        className='confirmation'
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                    >
                        <motion.div
                            className='confirmation-wrapper'
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.24 }}
                        >
                            <h2>Delete cart items?</h2>

                            <span className='question'>
                                You are about to remove {cart?.length} items. Are you sure?
                            </span>

                            <div className='buttons'>
                                <button type='button' onClick={() => deleteItems()}>
                                    Yes
                                </button>
                                <button
                                    type='button'
                                    className='no'
                                    onClick={() => setShowConfirmation(false)}
                                >
                                    No
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default PaymentForm;
