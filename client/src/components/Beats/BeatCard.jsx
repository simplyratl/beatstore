import React, { useContext } from 'react';
import { BsPlayFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { Context } from '../../context/Context';
import { motion } from 'framer-motion';
import '../../style/dist/beatcard.min.css';

const BeatCard = ({ beat, index }) => {
    const { setCurrentBeat, setIsPlaying } = useContext(Context);

    return (
        <motion.div
            className='beat-card-container'
            key={index}
            initial={{ opacity: 0, transform: 'scale(1.1)' }}
            animate={{ opacity: 1, transform: 'scale(1)' }}
            exit={{ opacity: 0, transform: 'scale(1.1)' }}
            transition={{ duration: 1.2, stiffness: '50', type: 'spring' }}
        >
            <motion.div className='beat-image'>
                <BsPlayFill className='play' />
                <img
                    src={beat?.img}
                    alt=''
                    onClick={() => {
                        setIsPlaying(true);
                        setCurrentBeat(beat);
                    }}
                    initial={{ opacity: 0, transform: 'scale(1.2)' }}
                    animate={{ opacity: 1, transform: 'scale(1)' }}
                    exit={{ opacity: 0, transform: 'scale(1.1)' }}
                    transition={{ duration: 1, delay: 2 }}
                />
            </motion.div>

            <div className='bottom-bar'>
                <div className='info'>
                    <span className='price'>${beat?.basic_licence}</span>
                    <span className='key'>{beat?.key}</span>
                    <span className='bpm'>{beat?.bpm} BPM</span>
                </div>

                <Link
                    to={`/beat/${beat?.title.toLowerCase().replace(' ', '-')}/${beat?._id}`}
                    style={{ textDecoration: 'none' }}
                    state={{ beat: beat }}
                >
                    <span className='title'>{beat?.title}</span>
                </Link>
            </div>
        </motion.div>
    );
};

export default BeatCard;
