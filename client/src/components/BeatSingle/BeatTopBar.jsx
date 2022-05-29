import React, { useContext, useState, useEffect, useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { FiShare } from 'react-icons/fi';
import { AiOutlineCloudDownload } from 'react-icons/ai';
import { IoMdMicrophone } from 'react-icons/io';
import { BiMicrophone, BiChevronDown } from 'react-icons/bi';
import { BsCart2, BsSpotify } from 'react-icons/bs';
import { BsPlayFill } from 'react-icons/bs';
import { Context } from '../../context/Context';
import Slider from 'react-slick';
import axios from 'axios';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';
import storage from '../../firebase';
import '../../style/dist/beattopbar.min.css';
import '../../style/dist/beatcard.min.css';
import BeatCard from '../Beats/BeatCard';
import { motion } from 'framer-motion';
import { addToCart, removeFromCart } from '../../context/cartContext/apiCalls';
import { CartContext } from '../../context/cartContext/CartContext';

const BeatTopBar = () => {
    const location = useLocation();
    const [beat, setBeat] = useState({});
    const [recommended, setRecommended] = useState([]);
    const [usage, setUsage] = useState(false);
    const [selectedLicence, setSelectedLicence] = useState('basic');

    const { cart, dispatch } = useContext(CartContext);

    let settings = {
        infinite: recommended.length > 6 ? true : false,
        arrows: true,
        slidesToShow: 6,
        slidesToScroll: 6,
        swipe: false,
        responsive: [
            {
                breakpoint: 1000,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 4,
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    swipe: true,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    arrows: false,
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    swipe: true,
                },
            },
            {
                breakpoint: 360,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    swipe: true,
                },
            },
        ],
    };

    useEffect(() => {
        if (!location.state) {
            const getData = async () => {
                const locationArr = location.pathname.split('/');
                const getID = locationArr[locationArr.length - 1];

                try {
                    const res = await axios.get(`http://192.168.1.18:8800/beat/find/${getID}`, {
                        headers: {
                            token: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyNjY5OTMxZGM0NTJlYzczZGI0NTlmOSIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY1MTc0NDA3NywiZXhwIjoxNjUyMDAzMjc3fQ.NMtkexWaj7AVFadQ0CngHjUmQnt20RfMj_3aORhOunY',
                        },
                    });

                    setBeat(res.data);
                } catch (error) {
                    console.log(error);
                }
            };

            getData();
        } else {
            setBeat(location.state.beat);
        }
    }, []);

    const handleAddToCart = (beat) => {
        addToCart(beat, dispatch);
    };

    const removeCart = (beat) => {
        removeFromCart(beat, dispatch);
    };

    useEffect(() => {
        const getRecommended = async () => {
            try {
                //192.168.1.18 ---- replace for testing on devices.
                const res = await axios.get('http://192.168.1.18:8800/beat/', {
                    headers: {
                        token: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyNjY5OTMxZGM0NTJlYzczZGI0NTlmOSIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY1MTc0NDA3NywiZXhwIjoxNjUyMDAzMjc3fQ.NMtkexWaj7AVFadQ0CngHjUmQnt20RfMj_3aORhOunY',
                    },
                });

                setRecommended(
                    res.data.filter((beatEl) => {
                        if (
                            beatEl.primary_mood === beat.primary_mood ||
                            beatEl.secondary_mood === beat.secondary_mood ||
                            beatEl.key === beat.key
                        ) {
                            if (beatEl._id !== beat._id) {
                                return beatEl;
                            }
                        }
                    })
                );
            } catch (error) {
                console.log(error);
            }
        };

        getRecommended();
    }, [recommended]);

    const { setIsPlaying, isPlaying, setCurrentBeat, currentBeat } = useContext(Context);

    return (
        <motion.div
            className='top-bar-container'
            initial={{ opacity: 0, top: -20 }}
            animate={{ opacity: 1, top: 0 }}
            exit={{ opacity: 0, top: -20 }}
            transition={{ delay: 0.2 }}
        >
            <div className='top-bar-wrapper'>
                <div className='left'>
                    <div className='beat-image-container'>
                        <BsPlayFill
                            className={`play ${
                                isPlaying && JSON.stringify(currentBeat) === JSON.stringify(beat) && 'active'
                            }`}
                        />
                        <img
                            src={beat.img}
                            className='beat-image'
                            onClick={() => {
                                setCurrentBeat(beat);
                                setIsPlaying(true);
                            }}
                        />
                    </div>
                    <h2>{beat.title}</h2>

                    <div className='beat-info'>
                        <span className='bpm'>{beat?.bpm} BPM</span>
                        <span className='key'>{beat?.key}</span>
                    </div>

                    <div className='control-beat'>
                        <FiShare className='icon' />
                        <AiOutlineCloudDownload
                            className='icon'
                            onClick={() => window.open(beat.mp3_tagged)}
                        />
                    </div>
                </div>

                <div className='right'>
                    <span className='licencing-title'>Licencing</span>

                    <div className='add-to-cart'>
                        <div className='total-container'>
                            <span className='total'>TOTAL:</span>
                            {selectedLicence === 'basic' && (
                                <span className='price'>
                                    $
                                    {!beat?.basic_licence?.toString()?.includes('.')
                                        ? `${beat?.basic_licence}.00`
                                        : beat?.basic_licence}
                                </span>
                            )}
                            {selectedLicence === 'premium' && (
                                <span className='price'>
                                    $
                                    {!beat?.premium_licence?.toString()?.includes('.')
                                        ? `${beat?.premium_licence}.00`
                                        : beat?.premium_licence}
                                </span>
                            )}
                            {selectedLicence === 'vip' && <span className='price'>${beat.vip_licence}</span>}
                        </div>

                        {!cart.some((item) => item._id === beat._id) && (
                            <button onClick={() => handleAddToCart(beat)}>
                                <BsCart2 className='icon' />
                                Add to cart
                            </button>
                        )}

                        {cart.some((item) => item._id === beat._id) && (
                            <button onClick={() => removeCart(beat)} className='incart'>
                                <BsCart2 className='icon' />
                                In cart
                            </button>
                        )}
                    </div>

                    <div className='licence-container'>
                        <div
                            className={`licence ${selectedLicence === 'basic' && 'active'}`}
                            onClick={() => setSelectedLicence('basic')}
                        >
                            <span className='title'>Basic Licence</span>
                            <span className='price'>
                                $
                                {!beat?.basic_licence?.toString()?.includes('.')
                                    ? `${beat?.basic_licence}.00`
                                    : beat?.basic_licence}
                            </span>
                            <span className='type'>MP3</span>
                        </div>
                        <div
                            className={`licence ${selectedLicence === 'premium' && 'active'}`}
                            onClick={() => setSelectedLicence('premium')}
                        >
                            <span className='title'>Premium Licence</span>
                            <span className='price'>
                                $
                                {!beat?.premium_licence?.toString()?.includes('.')
                                    ? `${beat?.premium_licence}.00`
                                    : beat?.premium_licence}
                            </span>
                            <span className='type'>MP3 and WAW</span>
                        </div>
                        {beat.vip_licence && (
                            <div
                                className={`licence ${selectedLicence === 'vip' && 'active'}`}
                                onClick={() => setSelectedLicence('vip')}
                            >
                                <span className='title'>VIP Licence</span>
                                <span className='price'>$30.00</span>
                                <span className='type'>MP3, WAW AND TRACK STEMS</span>
                            </div>
                        )}
                    </div>

                    <div className={`usage-terms ${usage && 'active'}`}>
                        <h3 className='usage-title' onClick={() => setUsage(!usage)}>
                            Usage Terms <BiChevronDown className='icon' />
                        </h3>

                        <div className='bottom-usage'>
                            <span className='title-licence-usage'>
                                Basic Licence ($
                                {selectedLicence === 'basic' &&
                                !beat?.premium_licence?.toString()?.includes('.')
                                    ? `${beat?.basic_licence}.00`
                                    : beat?.basic_licence}
                                )
                            </span>

                            <div className='terms'>
                                <div className='term'>
                                    <IoMdMicrophone className='icon' />
                                    FOR PROFIT LIVE PERFORMANCES
                                </div>
                                <div className='term'>
                                    <BiMicrophone className='icon' />
                                    USED FOR RECORDING
                                </div>
                                <div className='term'>
                                    <BsSpotify className='icon' />
                                    {selectedLicence === 'basic' && 'UP TO 100,000  STREAMS'}
                                    {selectedLicence === 'premium' && 'UP TO 250,000 STREAMS'}
                                    {selectedLicence === 'vip' && 'UNLIMITED STREAMS'}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className='recommended-beats'>
                <h2 style={{ marginBottom: 18 }}>Based on this beat you might like...</h2>

                <Slider {...settings}>
                    {recommended.map((beat, index) => (
                        <div key={index}>
                            <BeatCard beat={beat} index={index} />
                        </div>
                    ))}
                </Slider>
            </div>
        </motion.div>
    );
};

export default BeatTopBar;
