import React, { useContext, useState, useEffect, useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { FiShare } from 'react-icons/fi';
import { AiOutlineCloudDownload } from 'react-icons/ai';
import { IoMdMicrophone } from 'react-icons/io';
import { BiMicrophone, BiChevronDown } from 'react-icons/bi';
import { BsCart2, BsSpotify } from 'react-icons/bs';
import { BsPlayFill } from 'react-icons/bs';
import { BeatPlayingContext } from '../../context/BeatPlayContext';
import axios from 'axios';
import '../../style/dist/beattopbar.min.css';

const BeatTopBar = () => {
    const location = useLocation();
    const [beat, setBeat] = useState({});
    const [usage, setUsage] = useState(false);
    const [selectedLicence, setSelectedLicence] = useState('basic');

    useEffect(() => {
        if (!location.state) {
            const getData = async () => {
                const locationArr = location.pathname.split('/');
                const getID = locationArr[locationArr.length - 1];

                console.log('radi');

                try {
                    const res = await axios.get(`http://localhost:8800/beat/find/${getID}`, {
                        headers: {
                            token: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyNjY5OTMxZGM0NTJlYzczZGI0NTlmOSIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY1MTc0NDA3NywiZXhwIjoxNjUyMDAzMjc3fQ.NMtkexWaj7AVFadQ0CngHjUmQnt20RfMj_3aORhOunY',
                        },
                    });

                    setBeat(res.data);

                    console.log('uzeto sa baze');
                } catch (error) {
                    console.log(error);
                }
            };

            getData();
        } else {
            setBeat(location.state.beat);
        }
    }, []);

    const { setIsPlaying, isPlaying, setCurrentBeat, currentBeat } = useContext(BeatPlayingContext);

    return (
        <div className='top-bar-container'>
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

                    <div className='control-beat'>
                        <FiShare className='icon' />
                        <AiOutlineCloudDownload className='icon' />
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
                                        : currentBeat?.basic_licence}
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

                        <button>
                            <BsCart2 />
                            Add to cart
                        </button>
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
                            <span className='title-licence-usage'>Basic Licence ($30.00)</span>

                            <div className='terms'>
                                <div className='term'>
                                    <IoMdMicrophone />
                                    FOR PROFIT LIVE PERFORMANCES
                                </div>
                                <div className='term'>
                                    <BiMicrophone />
                                    USED FOR RECORDING
                                </div>
                                <div className='term'>
                                    <BsSpotify />
                                    UP TO 50,000 STREAMS
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BeatTopBar;
