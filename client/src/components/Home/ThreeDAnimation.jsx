import React, { useEffect, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '../../style/dist/threedanim.min.css';

const ThreeDAnimation = () => {
    gsap.registerPlugin(ScrollTrigger);

    useEffect(() => {
        gsap.timeline()
            .to('.monitor1', 3, {
                x: '-40%',
                scrollTrigger: {
                    trigger: '.threed-wrapper',
                    start: 'top center',
                    scrub: 0.8,
                },
            })
            .to(
                '.monitor2',
                3,
                {
                    x: '40%',
                    scrollTrigger: {
                        trigger: '.threed-wrapper',
                        start: 'top center',
                        scrub: 0.8,
                    },
                },
                '-=3'
            );

        gsap.timeline().to('.text', 2, {
            opacity: 1,
            scrollTrigger: {
                trigger: '.threed-wrapper',
            },
        });
    }, []);

    return (
        <div className='threed-container'>
            <div className='threed-wrapper'>
                <img
                    src='https://www.pngkey.com/png/full/177-1777636_fl-studio-laptops-laptop-fl-studio.png'
                    className='monitor1'
                />
                <img
                    src='https://cdn-www.avid.com/-/media/Webstore/SpotlightProducts/PT_MONITOR.png'
                    className='monitor2'
                />
            </div>

            <p className='text'>PROFESSIONAL BEATS</p>
        </div>
    );
};

export default ThreeDAnimation;
