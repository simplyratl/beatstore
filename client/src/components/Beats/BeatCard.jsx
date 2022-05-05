import React, { useContext } from 'react';
import { BsPlayFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { BeatPlayingContext } from '../../context/BeatPlayContext';
import '../../style/dist/beatcard.min.css';

const BeatCard = ({ beat, index }) => {
    const { setCurrentBeat, setIsPlaying } = useContext(BeatPlayingContext);

    return (
        <div className='beat-card-container' key={index}>
            <div className='beat-image'>
                <BsPlayFill className='play' onClick={() => setIsPlaying(false)} />
                <img
                    src={beat?.img}
                    alt=''
                    onClick={() => {
                        setIsPlaying(true);
                        setCurrentBeat(beat);
                    }}
                />
            </div>

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
        </div>
    );
};

export default BeatCard;
