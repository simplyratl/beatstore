import React, { useContext, useEffect, useRef, useState } from 'react';
import { BsPlayFill } from 'react-icons/bs';
import { AiOutlineRight } from 'react-icons/ai';
import '../../style/dist/beatcard.min.css';
import axios from 'axios';
import '../../style/dist/beatrow.min.css';
import { BeatPlayingContext } from '../../context/BeatPlayContext';
import Slider from 'react-slick';
import SkeletonCard from './SkeletonCard';
import { Link } from 'react-router-dom';
import BeatCard from './BeatCard';

const BeatRow = ({ title }) => {
    const [beats, setBeats] = useState([]);
    const [loading, setLoading] = useState(true);

    var settings = {
        dots: true,
        infinite: true,
        arrows: true,
        speed: 500,
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
                },
            },
            {
                breakpoint: 360,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };

    useEffect(() => {
        const getBeats = async () => {
            try {
                const res = await axios.get('http://localhost:8800/beat', {
                    headers: {
                        token: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyNjY5OTMxZGM0NTJlYzczZGI0NTlmOSIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY1MTc0NDA3NywiZXhwIjoxNjUyMDAzMjc3fQ.NMtkexWaj7AVFadQ0CngHjUmQnt20RfMj_3aORhOunY',
                    },
                });

                setBeats(res.data);
                setLoading(false);

                return res;
            } catch (error) {
                console.log(error);
            }
        };

        getBeats();
    }, []);

    const displaySkeleton = () => {
        let temp = [];

        for (let i = 0; i < 7; i++) {
            temp.push(
                <div key={i}>
                    <SkeletonCard />
                </div>
            );
        }

        return temp;
    };

    return (
        <div className='beat-row-container'>
            <div className='beat-row-wrapper'>
                <h2 style={{ marginLeft: 28, marginBottom: 10, display: 'block' }}>
                    <Link to={`/category/${title.toLowerCase()}`} state={{ beats: beats }} className='title'>
                        {title}

                        <AiOutlineRight className='icon' />
                    </Link>
                </h2>
                <div className='beats-container'>
                    <Slider {...settings}>
                        {!loading
                            ? beats?.map((beat, index) => (
                                  <div key={index}>
                                      <BeatCard beat={beat} index={index} />{' '}
                                  </div>
                              ))
                            : displaySkeleton()}
                    </Slider>
                </div>
            </div>
        </div>
    );
};

export default BeatRow;
