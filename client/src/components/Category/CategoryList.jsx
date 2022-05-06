import React, { useContext, useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { BsPlayFill, BsFillPauseFill, BsCart2 } from 'react-icons/bs';
import { BiChevronDown } from 'react-icons/bi';
import '../../style/dist/categorylist.min.css';
import axios from 'axios';
import { getDataRow } from '../Beats/beatrowfilter';
import { key } from './categoriesfilter';
import { motion, AnimatePresence } from 'framer-motion';

const CategoryList = ({ rowTitle }) => {
    const location = useLocation();
    const [filterOpenedMobile, setFilterOpenedMobile] = useState(false);
    const [beats, setBeats] = useState([]);
    const [filteredBeats, setFilteredBeats] = useState([]);
    const [selectedFilter, setSelectedFilter] = useState('');
    const [addedFilters, setAddedFilters] = useState([]);
    const [keyCategory, setKeyCategory] = useState(new Array(key.length).fill(false));

    useEffect(() => {
        if (!location.state) {
            const getData = async () => {
                try {
                    //192.168.1.18 ---- replace for testing on devices.
                    const res = await axios.get('http://192.168.1.18:8800/beat', {
                        headers: {
                            token: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyNjY5OTMxZGM0NTJlYzczZGI0NTlmOSIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY1MTc0NDA3NywiZXhwIjoxNjUyMDAzMjc3fQ.NMtkexWaj7AVFadQ0CngHjUmQnt20RfMj_3aORhOunY',
                        },
                    });

                    setBeats(getDataRow(res.data, rowTitle.charAt(0).toUpperCase() + rowTitle.slice(1)));
                    setFilteredBeats(
                        getDataRow(res.data, rowTitle.charAt(0).toUpperCase() + rowTitle.slice(1))
                    );

                    console.log('sa servera uzeti podaci.');
                } catch (error) {
                    console.log(error);
                }
            };

            getData();
        } else {
            setBeats(location.state.beats);
            setFilteredBeats(location.state.beats);
        }
    }, [location.state]);

    const handleChangeFilter = (position, category) => {
        if (category === 'key') {
            const updatedCheckState = keyCategory.map((item, index) => (index === position ? !item : item));

            setKeyCategory(updatedCheckState);
        }
    };

    const handleFilterElement = (filterName, active, filter) => {
        if (active) {
            setAddedFilters([...addedFilters, filter]);

            setFilteredBeats(
                beats.filter((beat) => {
                    for (let i = 0; i < addedFilters.length; i++) {
                        if (beat[filterName] === addedFilters[i]) {
                            return beat;
                        }
                    }
                })
            );
        } else {
            setAddedFilters(
                addedFilters.filter((filterEl) => {
                    return filterEl !== filter;
                })
            );

            if (addedFilters.length === 0) {
                setFilteredBeats(beats);
                return;
            }

            setFilteredBeats(
                beats.filter((beat) => {
                    for (let i = 0; i < addedFilters.length; i++) {
                        if (beat[filterName] === addedFilters[i]) {
                            return beat;
                        }
                    }
                })
            );
        }
    };

    const handleFilterMobile = () => {
        if (window.innerWidth < 1149 && selectedFilter !== '') {
            setFilterOpenedMobile(true);
        } else {
            setFilterOpenedMobile(false);
        }
    };

    return (
        <div className='category-list-container'>
            <ul className='beats-list'>
                <AnimatePresence>
                    {filteredBeats.map((beat, index) => (
                        <motion.li
                            className='beat'
                            key={index}
                            layout
                            initial={{ opacity: 0, transform: 'translateY(-20%)' }}
                            animate={{ opacity: 1, transform: 'translateY(0%)' }}
                            exit={{ opacity: 0, transform: 'translateY(20%)' }}
                            transition={{ duration: 0.2 }}
                        >
                            <div className='left'>
                                <img src={beat?.img} alt='' />
                                <div className='info'>
                                    <div className='title'>
                                        <h3>{beat?.title}</h3>
                                    </div>
                                    <span className='key'>{beat?.key}</span>
                                    <span className='bpm'>{beat?.bpm} BPM</span>
                                </div>
                            </div>

                            <div className='right'>
                                <button type='button'>
                                    <BsCart2 />
                                    {!beat?.basic_licence?.toString()?.includes('.')
                                        ? `${beat?.basic_licence}.00`
                                        : beat?.basic_licence}
                                </button>
                            </div>
                        </motion.li>
                    ))}
                </AnimatePresence>
            </ul>

            <div className={`filter ${filterOpenedMobile && 'active'}`}>
                <div className='filter-wrapper'>
                    <h2 onClick={() => setFilterOpenedMobile(!filterOpenedMobile)}>
                        Filters <BiChevronDown className='chevron' />
                    </h2>

                    <ul className='filter-list'>
                        <li
                            onClick={() => {
                                setSelectedFilter('key');
                                handleFilterMobile();
                            }}
                            className={selectedFilter === 'key' && 'active'}
                        >
                            KEY
                        </li>
                        <li
                            onClick={() => {
                                setSelectedFilter('bpm');
                                handleFilterMobile();
                            }}
                            className={selectedFilter === 'bpm' && 'active'}
                        >
                            BPM
                        </li>
                        <li
                            onClick={() => {
                                setSelectedFilter('mood');
                                handleFilterMobile();
                            }}
                            className={selectedFilter === 'mood' && 'active'}
                        >
                            MOOD
                        </li>
                        <li
                            onClick={() => {
                                setSelectedFilter('tags');
                                handleFilterMobile();
                            }}
                            className={selectedFilter === 'tags' && 'active'}
                        >
                            TAGS
                        </li>
                    </ul>
                </div>

                <div className='filter-sub-category'>
                    {selectedFilter === 'key' && (
                        <>
                            <h5 style={{ marginBottom: 12 }}>FILTERS FOR KEY</h5>

                            <ul className='sub'>
                                {key.map((key, index) => (
                                    <li key={index}>
                                        <label
                                            className={keyCategory[index] ? 'active' : ''}
                                            onClick={() => {
                                                handleFilterElement('key', !keyCategory[index], key);
                                            }}
                                        >
                                            {key}
                                            <input
                                                type='checkbox'
                                                onChange={() => handleChangeFilter(index, 'key')}
                                            />
                                        </label>
                                    </li>
                                ))}
                            </ul>
                        </>
                    )}

                    {selectedFilter === 'bpm' && (
                        <>
                            <h5 style={{ marginBottom: 12 }}>FILTERS FOR BPM</h5>

                            <input type='range' />
                        </>
                    )}

                    {selectedFilter === 'mood' && (
                        <>
                            <h5 style={{ marginBottom: 12 }}>FILTERS FOR MOOD</h5>

                            <ul className='sub'>
                                <li>Energetic</li>
                                <li>Bouncy</li>
                                <li>Eccentric</li>
                                <li>Flirty</li>
                            </ul>
                        </>
                    )}

                    {selectedFilter === 'tags' && (
                        <>
                            <h5 style={{ marginBottom: 12 }}>FILTERS FOR MOOD</h5>

                            <ul className='sub'>
                                <li>jack harlow</li>
                                <li>dark</li>
                                <li>flirty</li>
                            </ul>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CategoryList;
