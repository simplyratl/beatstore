import React, { useEffect, useLayoutEffect, useState } from "react";
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
import FetchLoading from "../FetchLoading";

const BeatRow = ({ title }) => {
    const [beats, setBeats] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showArrows, setShowArrows] = useState(true);

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
                const res = await axios
                    .get("https://elegant-mandarine-91231.herokuapp.com/beat", {
                        onDownloadProgress: (progressEvent) => {
                            let percentCompleted = Math.floor(
                                (progressEvent.loaded / progressEvent.total) * 100
                            );

                            setLoading(false);
                        },
                    })
                    .then((res) => {
                        setBeats(getDataRow(res.data, title));
                        return res;
                    });

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

    //Testing whether to show arrows before painting of a page.
    useLayoutEffect(() => {
        if (window.innerWidth > 768) {
            setShowArrows(true);
        } else {
            setShowArrows(false);
        }
    }, []);

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
        <>
            {loading && <FetchLoading finished={loading} />}

            <div className="beat-row-container">
                <div className="beat-row-wrapper">
                    <h2 style={{ marginLeft: 28, marginBottom: 10, display: "block" }}>
                        <Link
                            to={`/category/${title?.toLowerCase()}`}
                            state={{ beats: beats }}
                            className="title"
                        >
                            {title}

                            <AiOutlineRight className="icon" />
                        </Link>
                    </h2>

                    {beats?.length > 0 ? (
                        <div className="beats-container" style={{ padding: showArrows ? "0 32px" : "0 4%" }}>
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
        </>
    );
};

export default BeatRow;
