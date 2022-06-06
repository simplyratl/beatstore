import React from 'react';
import { motion, useViewportScroll, useTransform } from 'framer-motion';
import '../../style/dist/endsection.min.css';

const EndSection = () => {
    const { scrollYProgress } = useViewportScroll();

    return (
        <div className='end-section-container'>
            <motion.div className='black-screen' style={{ scale: scrollYProgress }}>
                <p className='end-section-paragraph'>EVERY 2 DAYS NEW BEAT</p>
            </motion.div>
        </div>
    );
};

export default EndSection;
