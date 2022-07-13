import React, { useEffect, useState } from "react";
import { AiOutlineRight } from "react-icons/ai";
import "../../style/dist/beatcard.min.css";
import axios from "axios";
import "../../style/dist/beatrow.min.css";
import Slider from "react-slick";
import { getDataRow } from "./beatrowfilter";
import SkeletonCard from "./SkeletonCard";
import { Link } from "react-router-dom";
import BeatCard from "./BeatCard";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";

const BeatRow = ({ title }) => {
    const [beats, setBeats] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showArrows, setShowArrows] = useState(false);

    const slider = React.useRef(null);

    let settings = {
        dots: true,
        infinite: beats?.length >= 6 ? true : false,
        arrows: false,
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
        const getBeats = async () => {
            try {
                // 192.168.1.18 ---- replace for testing on devices.
                const res = await axios.get("http://192.168.1.18:8800/beat");
                // const res = await axios.get("http://localhost:8800/beat");

                // setBeats(getDataRow(res.data, title));
                setBeats(getDataRow(res.data, title));
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

    useEffect(() => {
        window.addEventListener("resize", () => {
            if (window.innerWidth > 768) {
                setShowArrows(true);
            } else {
                setShowArrows(false);
            }
        });
    });

    return (
        <div className="beat-row-container">
            <div className="beat-row-wrapper">
                <h2 style={{ marginLeft: 28, marginBottom: 10, display: "block" }}>
                    <Link to={`/category/${title?.toLowerCase()}`} state={{ beats: beats }} className="title">
                        {title}

                        <AiOutlineRight className="icon" />
                    </Link>
                </h2>

                {beats?.length > 0 ? (
                    <div
                        className="beats-container"
                        style={{ padding: showArrows && beats?.length >= 6 ? "0 38px" : "0 4px" }}
                    >
                        {showArrows && beats?.length >= 6 && (
                            <IoIosArrowBack
                                className="arrow-slider left"
                                onClick={() => slider?.current?.slickPrev()}
                            />
                        )}

                        <Slider {...settings} ref={slider}>
                            {!loading
                                ? beats?.map((beat, index) => (
                                      <div key={index}>
                                          <BeatCard beat={beat} index={index} />
                                      </div>
                                  ))
                                : displaySkeleton()}
                        </Slider>
                        {showArrows && beats?.length >= 6 && (
                            <IoIosArrowForward
                                className="arrow-slider right"
                                onClick={() => slider?.current?.slickNext()}
                            />
                        )}
                    </div>
                ) : (
                    <span className="not-found">Not found</span>
                )}
            </div>
        </div>
    );
};

export default BeatRow;
