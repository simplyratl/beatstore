import React, { useContext, useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import WaveSurfer from 'wavesurfer.js';
import { BsPlayFill, BsFillPauseFill } from 'react-icons/bs';
import '../../style/dist/categorylist.min.css';
import { BeatPlayingContext } from '../../context/BeatPlayContext';

const CategoryList = () => {
    const waveformRef = useRef();
    const location = useLocation();
    let wavesurfer = null;

    useEffect(() => {
        const createWaveForms = () => {};

        if (waveformRef.current && waveformRef.current.childNodes.length < 1) {
            wavesurfer = WaveSurfer.create({
                container: waveformRef.current,
                waveColor: '#707070',
                progressColor: '#fcc201',
                barWidth: 5,
                barRadius: 3,
                height: 220,
                fillParent: true,
                xhr: {
                    cache: 'default',
                    mode: 'cors',
                    method: 'GET',
                    credentials: 'include',
                    headers: [
                        { key: 'cache-control', value: 'no-cache' },
                        { key: 'pragma', value: 'no-cache' },
                    ],
                },
            });

            wavesurfer.load(require('../../assets/song.mp3'));
            // wavesurfer.play();
        }
    }, [waveformRef]);

    return (
        <div className='category-list-container'>
            <ul className='beats-list'>
                {location.state.beats.map((beat, index) => (
                    <li className='beat' key={index}>
                        <div className='left'>
                            <img src={beat?.img} alt='' />

                            <div className='info'>
                                <div className='title'>
                                    <h3>{beat?.title}</h3>
                                    {true ? (
                                        <BsFillPauseFill className='play' />
                                    ) : (
                                        <BsPlayFill className='play' />
                                    )}
                                </div>
                                <span className='key'>{beat?.key}</span>
                                <span className='bpm'>{beat?.bpm} BPM</span>
                            </div>
                        </div>

                        <div className='middle'>
                            <div id='waveform' ref={waveformRef}></div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CategoryList;
