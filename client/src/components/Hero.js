import React from 'react';
import '../style/dist/hero.min.css';

const Hero = () => {
    return (
        <div className='hero-container'>
            <div className='hero-inner'>
                <div className='text'></div>
            </div>
            {/* <div class='custom-shape-divider-top-1650046496'>
                <svg
                    data-name='Layer 1'
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 1200 120'
                    preserveAspectRatio='none'
                >
                    <path
                        d='M0,0V6c0,21.6,291,111.46,741,110.26,445.39,3.6,459-88.3,459-110.26V0Z'
                        class='shape-fill'
                    ></path>
                </svg>
            </div> */}

            <div className='hero-image-wrapper'>
                <img src={require('../assets/images/hero.jpg')} alt='' />
            </div>
        </div>
    );
};

export default Hero;
