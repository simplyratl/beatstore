import React from 'react';
import BeatRow from '../components/Beats/BeatRow';
import { rows } from '../components/Beats/beatrowfilter';

const Beats = () => {

    const getRandomRow = () => {
        const randomIndex = rows[Math.floor(Math.random() * rows.length)];

        return randomIndex;
    }

    return (
        <div style={{ marginTop: 100 }}>
            <BeatRow title='Latest' />
            <BeatRow title={getRandomRow()} />
            <BeatRow title={getRandomRow()} />
            <BeatRow title={getRandomRow()} />
            <BeatRow title={getRandomRow()} />
        </div>
    );
};

export default Beats;
