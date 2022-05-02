import React from 'react';
import '../../style/dist/skeletoncard.min.css';

const SkeletonCard = () => {
    return (
        <div className='skeleton-container'>
            <div className='beat-image'></div>

            <div className='bottom-bar'>
                <div className='info'>
                    <span className='price'></span>
                    <span className='key'></span>
                    <span className='bpm'></span>
                </div>

                <span className='title'></span>
            </div>
        </div>
    );
};

export default SkeletonCard;
