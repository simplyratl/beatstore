import React from 'react';
import '../../style/dist/artists.min.css';
import { Parallax } from 'react-scroll-parallax';
import { motion } from 'framer-motion';

const Artists = () => {
    return (
        <div className='artists-container'>
            <div className='artist-wrapper'>
                <Parallax translateY={-10}>
                    <div className='left grid'>
                        <img src='https://s1.ticketm.net/dam/a/02e/e76ce768-d30b-4837-8135-2c360cdd202e_1461181_TABLET_LANDSCAPE_LARGE_16_9.jpg' />

                        <div className='text'>
                            <p className='title'>POPULAR ARTIST.</p>

                            <p className='info'>
                                Type beats of most popular artists today, all in one place.
                            </p>
                        </div>
                    </div>
                </Parallax>

                <motion.div
                    className='right grid condensed'
                    initial={{ opacity: 0, y: -10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                >
                    <div className='text'>
                        <p className='title'>IN ONE PLACE.</p>
                    </div>
                    <img src='https://images.complex.com/complex/images/c_fill,dpr_auto,f_auto,q_auto,w_1400/fl_lossy,pg_1/ved7hojt36yiabmf7bwc/roddy-dec-14?fimg-ssr-default' />
                </motion.div>
            </div>
        </div>
    );
};

export default Artists;
