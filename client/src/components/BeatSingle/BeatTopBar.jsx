import React, { useContext, useState, useEffect, useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";
import { AiOutlineCloudDownload, AiOutlineShareAlt, AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { IoMdMicrophone } from "react-icons/io";
import { BiMicrophone, BiChevronDown } from "react-icons/bi";
import { BsCart2, BsSpotify } from "react-icons/bs";
import { BsPlayFill } from "react-icons/bs";
import { Context } from "../../context/Context";
import Slider from "react-slick";
import axios from "axios";
import "../../style/dist/beattopbar.min.css";
import "../../style/dist/beatcard.min.css";
import BeatCard from "../Beats/BeatCard";
import { AnimatePresence, motion } from "framer-motion";
import { addToCart, removeFromCart } from "../../context/cartContext/apiCalls";
import { CartContext } from "../../context/cartContext/CartContext";
import { AuthContext } from "../../context/authContext/AuthContext";
import ShareBeat from "./ShareBeat";

const BeatTopBar = () => {
    const location = useLocation();
    const [beat, setBeat] = useState({});
    const [recommended, setRecommended] = useState([]);
    const [usage, setUsage] = useState(false);
    const [selectedLicence, setSelectedLicence] = useState("basic");
    const [share, setShare] = useState(false);

    const [liked, setLiked] = useState(false);
    const [likeCounter, setLikeCounter] = useState(0);
    const [lockLike, setLockLike] = useState(false);

    const { cart, dispatch } = useContext(CartContext);
    const { user } = useContext(AuthContext);
    const { setIsPlaying, isPlaying, setCurrentBeat, currentBeat } = useContext(Context);

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
        const getData = async () => {
            if (!location.state) {
                const locationArr = location.pathname.split("/");
                const getID = locationArr[locationArr.length - 1];

                try {
                    const res = await axios.get(
                        `https://elegant-mandarine-91231.herokuapp.com/beat/find-id/${getID}`
                    );

                    setBeat(res.data);
                    setLikeCounter(res.data.likes.length);
                    return res;
                } catch (error) {
                    console.log(error);
                }
            } else {
                setBeat(location.state.beat);
                setLikeCounter(location.state.beat.likes.length);
            }
        };

        getData();
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
                const res = await axios.get("https://elegant-mandarine-91231.herokuapp.com/beat/");

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
    }, []);

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    }, [location]);

    const beatUploadedDate = (uploadDate) => {
        const now = new Date().getTime();
        const countdownDate = new Date(uploadDate).getTime();
        const distance = now - countdownDate;

        const days = Math.floor(distance / (24 * 60 * 60 * 1000));
        const hours = Math.floor((distance % (24 * 60 * 60 * 1000)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (60 * 60 * 1000)) / (1000 * 60));
        const seconds = Math.floor((distance % (60 * 1000)) / 1000);

        if (days !== 0) {
            return `${days} ${days === 1 ? "day" : "days"} ago`;
        } else if (hours !== 0) {
            return `${hours} ${hours === 1 ? "hour" : "hours"} ago`;
        } else if (minutes !== 0) {
            return `${minutes} ${minutes === 1 ? "minute" : "minutes"} ago`;
        } else {
            return `${seconds} ${seconds === 1 ? "second" : "seconds"} ago`;
        }
    };

    const handleLike = async () => {
        if (!user || !beat.likes || lockLike) return;

        setLockLike(true);
        setLiked(!liked);

        if (liked) {
            setLikeCounter(likeCounter - 1);
        } else {
            setLikeCounter(likeCounter + 1);
        }

        try {
            const res = await axios.put(
                `https://elegant-mandarine-91231.herokuapp.com/beat/likes/${beat._id}/${user._id}`
            );

            setBeat(res.data);

            return res;
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (lockLike) {
            setTimeout(() => {
                setLockLike(false);
            }, [800]);
        }
    }, [lockLike]);

    useEffect(() => {
        const getIfLiked = () => {
            if (beat && user) {
                if (beat?.likes?.filter((like) => like.toString() === user._id.toString()).length > 0) {
                    setLiked(true);
                } else {
                    setLiked(false);
                }
            }
        };

        getIfLiked();
    }, [beat]);

    return (
        <motion.div
            className="top-bar-container"
            initial={{ opacity: 0, top: -20 }}
            animate={{ opacity: 1, top: 0 }}
            exit={{ opacity: 0, top: -20 }}
            transition={{ delay: 0.2 }}
        >
            <div className="top-bar-wrapper">
                <div className="left">
                    <div className="beat-image-container">
                        <BsPlayFill
                            className={`play ${
                                isPlaying && JSON.stringify(currentBeat) === JSON.stringify(beat) && "active"
                            }`}
                        />
                        <img
                            src={beat.img}
                            className="beat-image"
                            onClick={() => {
                                setCurrentBeat(beat);
                                setIsPlaying(true);
                            }}
                        />
                    </div>
                    <h2>{beat.title}</h2>

                    <div className="beat-info">
                        <span className="bpm">{beat?.bpm} BPM</span>
                        <span className="key">{beat?.key}</span>
                        <span className="key">{beatUploadedDate(beat?.createdAt)}</span>
                    </div>

                    <div className="control-beat">
                        <AiOutlineShareAlt className="icon" onClick={() => setShare(true)} />
                        <AiOutlineCloudDownload
                            className="icon"
                            onClick={() => window.open(beat.mp3_tagged)}
                        />

                        <div className="likes">
                            {!user && <div className="login-error">You must login to like the beat.</div>}
                            {liked ? (
                                <AiFillHeart className="icon liked" onClick={() => handleLike()} />
                            ) : (
                                <AiOutlineHeart className="icon" onClick={() => handleLike()} />
                            )}
                            <span className="counter">{likeCounter}</span>
                        </div>
                    </div>
                </div>

                <div className="right">
                    <span className="licencing-title">Licencing</span>

                    <div className="add-to-cart">
                        <div className="total-container">
                            <span className="total">TOTAL:</span>
                            {selectedLicence === "basic" && (
                                <span className="price">
                                    $
                                    {!beat?.basic_licence?.toString()?.includes(".")
                                        ? `${beat?.basic_licence}.00`
                                        : beat?.basic_licence}
                                </span>
                            )}
                            {selectedLicence === "premium" && (
                                <span className="price">
                                    $
                                    {!beat?.premium_licence?.toString()?.includes(".")
                                        ? `${beat?.premium_licence}.00`
                                        : beat?.premium_licence}
                                </span>
                            )}
                            {selectedLicence === "vip" && <span className="price">${beat.vip_licence}</span>}
                        </div>

                        {user &&
                            (!cart.some((item) => item._id === beat._id) ? (
                                <button onClick={() => handleAddToCart(beat)}>
                                    <BsCart2 className="icon" />
                                    Add to cart
                                </button>
                            ) : (
                                cart.some((item) => item._id === beat._id) && (
                                    <button onClick={() => removeCart(beat)} className="incart">
                                        <BsCart2 className="icon" />
                                        In cart
                                    </button>
                                )
                            ))}
                    </div>

                    <div className="licence-container">
                        <div
                            className={`licence ${selectedLicence === "basic" && "active"}`}
                            onClick={() => setSelectedLicence("basic")}
                        >
                            <span className="title">Basic Licence</span>
                            <span className="price">
                                $
                                {!beat?.basic_licence?.toString()?.includes(".")
                                    ? `${beat?.basic_licence}.00`
                                    : beat?.basic_licence}
                            </span>
                            <span className="type">MP3</span>
                        </div>
                        <div
                            className={`licence ${selectedLicence === "premium" && "active"}`}
                            onClick={() => setSelectedLicence("premium")}
                        >
                            <span className="title">Premium Licence</span>
                            <span className="price">
                                $
                                {!beat?.premium_licence?.toString()?.includes(".")
                                    ? `${beat?.premium_licence}.00`
                                    : beat?.premium_licence}
                            </span>
                            <span className="type">MP3 and WAW</span>
                        </div>
                        {beat.vip_licence && (
                            <div
                                className={`licence ${selectedLicence === "vip" && "active"}`}
                                onClick={() => setSelectedLicence("vip")}
                            >
                                <span className="title">VIP Licence</span>
                                <span className="price">$30.00</span>
                                <span className="type">MP3, WAW AND TRACK STEMS</span>
                            </div>
                        )}
                    </div>

                    <div className={`usage-terms ${usage && "active"}`}>
                        <h3 className="usage-title" onClick={() => setUsage(!usage)}>
                            Usage Terms <BiChevronDown className="icon" />
                        </h3>

                        <div className="bottom-usage">
                            <span className="title-licence-usage">
                                Basic Licence ($
                                {selectedLicence === "basic" &&
                                !beat?.premium_licence?.toString()?.includes(".")
                                    ? `${beat?.basic_licence}.00`
                                    : beat?.basic_licence}
                                )
                            </span>

                            <div className="terms">
                                <div className="term">
                                    <IoMdMicrophone className="icon" />
                                    FOR PROFIT LIVE PERFORMANCES
                                </div>
                                <div className="term">
                                    <BiMicrophone className="icon" />
                                    USED FOR RECORDING
                                </div>
                                <div className="term">
                                    <BsSpotify className="icon" />
                                    {selectedLicence === "basic" && "UP TO 100,000  STREAMS"}
                                    {selectedLicence === "premium" && "UP TO 250,000 STREAMS"}
                                    {selectedLicence === "vip" && "UNLIMITED STREAMS"}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="recommended-beats">
                <h2 style={{ marginBottom: 18 }}>Based on this beat you might like...</h2>

                <Slider {...settings}>
                    {recommended.map((beat, index) => (
                        <div key={index}>
                            <BeatCard beat={beat} index={index} />
                        </div>
                    ))}
                </Slider>
            </div>

            <AnimatePresence>
                {share && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.18 }}
                    >
                        <ShareBeat setClose={setShare} />
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

export default BeatTopBar;
