import React from 'react';
import '../../style/dist/musicplatform.min.css';

const MusicPlatform = () => {
    return (
        <div className='music-platforms-container'>
            <h2>DISTRIBUTE YOUR MUSIC TO ANY POPULAR PLATFORM</h2>

            <img src={require('../../assets/images/music_logos.png')} />

            <h4>By purchasing beats, you are allowed to distribute your music to any platform.</h4>
        </div>
    );
};

export default MusicPlatform;
