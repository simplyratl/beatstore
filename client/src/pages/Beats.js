import React from 'react';
import BeatRow from '../components/Beats/BeatRow';
import {rows} from '../components/Beats/beatrowfilter';

const Beats = () => {

    const getRandomRow = () => {
        return rows[Math.floor(Math.random() * rows.length)];
    }

    return (
        <div style={{marginTop: 100}}>
            <BeatRow title='Latest' />
            {/* <BeatRow title={getRandomRow()} /> */}
            {/* <BeatRow title={getRandomRow()} /> */}
            {/* <BeatRow title={getRandomRow()} /> */}
            {/* <BeatRow title={getRandomRow()} /> */}
        </div>
    );
};

export default Beats;
