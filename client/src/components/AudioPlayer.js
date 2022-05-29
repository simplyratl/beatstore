import React, { useContext, useEffect, useRef, useState } from 'react';
import { BiShuffle, BiRepeat } from 'react-icons/bi';
import { BsVolumeDown, BsVolumeMute, BsCart2 } from 'react-icons/bs';
import { AiFillPlayCircle, AiFillStepBackward, AiFillStepForward, AiFillPauseCircle } from 'react-icons/ai';
import { Context } from '../context/Context';
import '../style/dist/audioplayer.min.css';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/cartContext/CartContext';
import { addCart, addToCart, removeFromCart } from '../context/cartContext/apiCalls';

const AudioPlayer = () => {
    const [paused, setPaused] = useState(false);
    const [shuffle, setShuffle] = useState(false);
    const [percentSong, setPercentSong] = useState(0);
    const [repeat, setRepeat] = useState(false);
    const [percentVolume, setPercentVolume] = useState(50);
    const [muted, setMuted] = useState(true);

    const { isPlaying, currentBeat, setIsPlaying } = useContext(Context);
    const { cart, dispatch } = useContext(CartContext);

    const audioRef = useRef(null);
    const sliderRef = useRef(null);
    const currentProgress = useRef(null);
    const animationRef = useRef(null);

    const handlePercentDrag = (e) => {
        if (audioRef) {
            audioRef.current.currentTime = e.target.value;
            setPercentSong(e.target.value);
            currentProgress.current.style.setProperty(
                'width',
                `${(sliderRef.current.value / audioRef.current.duration) * 100}%`
            );
        }
    };

    const handleVolumeChange = (e) => {
        setPercentVolume(e.target.value);
    };

    useEffect(() => {
        if (isPlaying) {
            if (audioRef) {
                if (paused) {
                    setPaused(false);
                }

                audioRef.current.play();
                animationRef.current = requestAnimationFrame(whilePlaying);
            }
        } else {
            if (audioRef) {
                audioRef.current.pause();
                animationRef.current = cancelAnimationFrame(animationRef.current);
            }
        }
    }, [isPlaying, currentBeat]);

    useEffect(() => {
        if (audioRef) {
            audioRef.current.volume = percentVolume / 100;
        }
    }, [percentVolume]);

    const whilePlaying = () => {
        if (audioRef) {
            if (isPlaying && !audioRef.current.ended) {
                setPercentSong(audioRef.current.currentTime);
                currentProgress.current.style.setProperty(
                    'width',
                    `${(sliderRef.current.value / audioRef.current.duration) * 100}%`
                );
                animationRef.current = requestAnimationFrame(whilePlaying);
            }
        }
    };

    const convertTime = (duration) => {
        let minute = Math.floor((duration % 3600) / 60);
        let second = Math.floor((duration % 3600) % 60);

        return `${isNaN(minute) ? '-' : minute}:${isNaN(second) ? '-' : second <= 9 ? '0' + second : second}`;
    };

    const handleRepeat = (e) => {
        setRepeat(!repeat);

        console.log(repeat);

        if (!repeat) {
            audioRef.current.loop = true;
        } else {
            audioRef.current.loop = false;
        }
    };

    const mute = () => {
        setMuted(!muted);

        if (!muted) {
            if (audioRef) {
                audioRef.current.muted = false;
            }
        } else {
            if (audioRef) {
                audioRef.current.muted = true;
            }
        }
    };

    const handleAddToCart = (beat) => {
        addToCart(beat, dispatch);
    };

    const removeCart = (beat) => {
        removeFromCart(beat, dispatch);
    };

    return (
        <div className='audio-player-container'>
            <div className='audio-player-wrapper'>
                <div className='left-side'>
                    <img src={currentBeat?.img} alt='' />

                    <div className='song-info'>
                        <Link
                            to={`/beat/${currentBeat?.title?.toLowerCase().replace(' ', '-')}/${
                                currentBeat?._id
                            }`}
                            state={{ beat: currentBeat }}
                            className='song-title'
                        >
                            {currentBeat?.title}
                        </Link>
                        {currentBeat.artist ? (
                            <span className='song-artist'>{currentBeat.artist}</span>
                        ) : Object.keys(currentBeat).length > 0 ? (
                            !cart.some((item) => item._id === currentBeat._id) ? (
                                <button
                                    type='button'
                                    className='buy-now-player'
                                    style={{ margin: '4px 0' }}
                                    onClick={() => handleAddToCart(currentBeat)}
                                >
                                    <BsCart2 />
                                    {!currentBeat?.basic_licence?.toString()?.includes('.')
                                        ? `${currentBeat?.basic_licence}.00`
                                        : currentBeat?.basic_licence}
                                </button>
                            ) : (
                                <button
                                    type='button'
                                    className='buy-now-player incart'
                                    style={{ margin: '4px 0' }}
                                    onClick={() => removeCart(currentBeat)}
                                >
                                    <BsCart2 />
                                    In cart
                                </button>
                            )
                        ) : null}
                    </div>

                    {currentBeat.artist && (
                        <button type='button' className='buy-now-player'>
                            <BsCart2 onClick={() => handleAddToCart(currentBeat)} />
                            {!currentBeat?.basic_licence?.toString()?.includes('.')
                                ? `${currentBeat?.basic_licence}.00`
                                : currentBeat?.basic_licence}
                        </button>
                    )}
                </div>

                <div className='middle'>
                    <div className='controls'>
                        <BiShuffle
                            className='icon smaller'
                            onClick={() => setShuffle(!shuffle)}
                            style={{ fill: shuffle && 'red' }}
                        />
                        <AiFillStepBackward className='icon remove' />
                        {paused ? (
                            <AiFillPlayCircle
                                className='icon big'
                                onClick={() => {
                                    setPaused(false);
                                    setIsPlaying(true);
                                }}
                            />
                        ) : (
                            <AiFillPauseCircle
                                className={`icon big ${paused && 'paused'}`}
                                onClick={() => {
                                    setPaused(true);
                                    setIsPlaying(false);
                                }}
                            />
                        )}

                        <AiFillStepForward className='icon' />
                        <BiRepeat
                            className='icon smaller remove'
                            onClick={handleRepeat}
                            style={{ fill: repeat && 'red' }}
                        />
                    </div>
                    <div className='play-time'>
                        <span className='timeline-time'>{convertTime(audioRef?.current?.currentTime)}</span>
                        <div className='progress-bar-range'>
                            <div className='progress-bar' ref={currentProgress}></div>
                            <input
                                type='range'
                                step='0.01'
                                className='timeline'
                                onChange={handlePercentDrag}
                                value={percentSong}
                                ref={sliderRef}
                                max={audioRef?.current?.duration?.toString()}
                            />
                        </div>
                        <span className='timeline-time'>
                            {audioRef ? convertTime(audioRef?.current?.duration) : '-:-'}
                        </span>
                    </div>
                </div>

                <div className='right-side'>
                    {muted ? (
                        <BsVolumeDown className='icon' onClick={mute} />
                    ) : (
                        <BsVolumeMute className='icon' onClick={mute} />
                    )}

                    <div className='progress-bar-range'>
                        <div className='progress-bar' style={{ width: `${percentVolume}%` }}></div>
                        <input
                            type='range'
                            step='0.01'
                            className='timeline'
                            onChange={handleVolumeChange}
                            defaultValue='50%'
                        />
                    </div>
                </div>
            </div>

            <audio ref={audioRef} src={currentBeat?.mp3_tagged}></audio>
        </div>
    );
};

export default AudioPlayer;
