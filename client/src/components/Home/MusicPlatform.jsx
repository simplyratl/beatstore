import React from 'react';
import Marquee from 'react-fast-marquee';
import { Parallax } from 'react-scroll-parallax';
import '../../style/dist/musicplatform.min.css';

const MusicPlatform = () => {
    return (
        <div className='music-platforms-container'>
            <h2>DISTRIBUTE YOUR MUSIC TO ANY POPULAR PLATFORM</h2>

            <img src={require('../../assets/images/music_platforms/laptop.png')} className='laptop' />

            <div className='infinite-scroll-container'>
                <Marquee className='infinite-scroll' speed={40} gradient={false}>
                    <div className='element'>
                        <img src={require('../../assets/images/music_platforms/spotify.png')} />
                    </div>
                    <div className='element'>
                        <img src={require('../../assets/images/music_platforms/deezer.png')} />
                    </div>
                    <div className='element'>
                        <img src={require('../../assets/images/music_platforms/apple_music.png')} />
                    </div>
                    <div className='element'>
                        <img src={require('../../assets/images/music_platforms/youtube_music.png')} />
                    </div>
                    <div className='element'>
                        <img src={require('../../assets/images/music_platforms/tidal.png')} />
                    </div>
                </Marquee>
            </div>

            <h4>By purchasing beats, you are allowed to distribute your music to any platform.</h4>
        </div>
    );
};

export default MusicPlatform;
