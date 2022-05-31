import React from 'react';
import '../../style/dist/getbeats.min.css';

const GetBeats = () => {
    return (
        <div className='get-beats-container'>
            <img src='https://upload.wikimedia.org/wikipedia/commons/1/17/Elite-producer.jpg' />

            <div className='text'>
                <h1>Get beats made for you.</h1>

                <button type='button'>Get beats</button>
            </div>
        </div>
    );
};

export default GetBeats;
