import React from 'react';
import { BsPlayFill } from 'react-icons/bs';
import '../../style/dist/beatcard.min.css';

const BeatCard = ({ beat }) => {
    return (
        <div className='beat-card-container'>
            {/* <div className='beat-image'>
                <BsPlayFill className='play' />
                <img src={beat?.img} alt='' />
            </div>

            <div className='bottom-bar'>
                <div className='info'>
                    <span className='price'>${beat?.basic_licence}</span>
                    <span className='key'>{beat?.key}</span>
                    <span className='bpm'>{beat?.bpm} BPM</span>
                </div>

                <span className='title'>{beat?.title}</span>
            </div> */}
        </div>
    );
};

export default BeatCard;
