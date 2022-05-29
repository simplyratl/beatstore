import React from 'react';
import { IoIosClose } from 'react-icons/io';
import { motion, AnimatePresence } from 'framer-motion';
import '../style/dist/forgotpassword.min.css';

const ForgottenPassword = ({ close }) => {
    return (
        <>
            <AnimatePresence>
                <div className='forgot-password-container'>
                    <motion.div
                        className='forgot-password-wrapper'
                        initial={{ transform: 'translateY(-40%)' }}
                        animate={{ transform: 'translateY(0%)' }}
                        exit={{ transform: 'translateY(40%)' }}
                    >
                        <div className='top-bar'>
                            <IoIosClose className='close' onClick={() => close(false)} />
                        </div>

                        <h1>Forgot password</h1>

                        <form>
                            <label htmlFor='email'>Email</label>
                            <input type='text' name='email' autoComplete='off' />

                            <button type='button' className='btn-forgot'>
                                Submit
                            </button>
                        </form>
                    </motion.div>
                </div>
            </AnimatePresence>
        </>
    );
};

export default ForgottenPassword;
