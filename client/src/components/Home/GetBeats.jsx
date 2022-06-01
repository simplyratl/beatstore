import React from 'react';
import '../../style/dist/getbeats.min.css';
import Transactions from '../../assets/images/illustrations/undraw_transfer_money_re_6o1h.svg';
import Recording from '../../assets/images/illustrations/undraw_recording_re_5xyq.svg';
import { motion, AnimatePresence } from 'framer-motion';

const GetBeats = () => {
    return (
        <div className='buy-now-container'>
            <motion.div
                className='left grid'
                initial={{ opacity: 0, transform: 'translateY(-20%)' }}
                whileInView={{ opacity: 1, transform: 'translateY(0%)' }}
                transition={{ duration: 1.4 }}
                viewport={{ once: false }}
            >
                <span>
                    Transactions with PayPal are avaliable. Buying beats from this site you can get more beats
                    from bulk deals! Transactions are made securely with PayPal integrated system, the one
                    that use Beatstars or Airbit.
                </span>

                <img src={Transactions} />
            </motion.div>

            <motion.div
                className='right grid'
                initial={{ opacity: 0, transform: 'translateY(-20%)' }}
                whileInView={{ opacity: 1, transform: 'translateY(0%)' }}
                transition={{ duration: 1.4 }}
                viewport={{ once: false }}
            >
                <img src={Recording} />

                <span>In under one minute you can start recording on a new beat you bought.</span>
            </motion.div>
        </div>
    );
};

export default GetBeats;
