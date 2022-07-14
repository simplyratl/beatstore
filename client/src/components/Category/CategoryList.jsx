import React, { useContext, useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { BsPlayFill, BsFillPauseFill, BsCart2 } from "react-icons/bs";
import { BiChevronDown } from "react-icons/bi";
import "../../style/dist/categorylist.min.css";
import axios from "axios";
import { getDataRow } from "../Beats/beatrowfilter";
import { key, mood, tags } from "./categoriesfilter";
import { motion, AnimatePresence } from "framer-motion";
import { Context } from "../../context/Context";
import { addToCart, removeFromCart } from "../../context/cartContext/apiCalls";
import { CartContext } from "../../context/cartContext/CartContext";
import { AuthContext } from "../../context/authContext/AuthContext";

const CategoryList = ({ rowTitle }) => {
    const location = useLocation();
    const [filterOpenedMobile, setFilterOpenedMobile] = useState(false);
    const [checkPlaying, setCheckPlaying] = useState(false);
    const [beats, setBeats] = useState([]);
    const [filteredBeats, setFilteredBeats] = useState([]);
    const [selectedFilter, setSelectedFilter] = useState("");
    const [addedFilters, setAddedFilters] = useState([]);
    const [keyCategory, setKeyCategory] = useState(new Array(key.length).fill(false));
    const [moodCategory, setMoodCategory] = useState(new Array(mood.length).fill(false));
    const [tagCategory, setTagCategory] = useState(new Array(tags.length).fill(false));
    const [bpmLowest, setBpmLowest] = useState(0);
    const [bpmHighest, setBpmHighest] = useState(250);

    const { setIsPlaying, currentBeat, setCurrentBeat } = useContext(Context);

    const { dispatch, cart } = useContext(CartContext);
    const { user } = useContext(AuthContext);

    useEffect(() => {
        if (!location.state) {
            const getData = async () => {
                try {
                    //192.168.1.18 ---- replace for testing on devices.
                    // const res = await axios.get("http://192.168.1.18:8800/beat");
                    const res = await axios.get("http://localhost:8800/beat");

                    setBeats(getDataRow(res.data, rowTitle.charAt(0).toUpperCase() + rowTitle.slice(1)));
                    setFilteredBeats(
                        getDataRow(res.data, rowTitle.charAt(0).toUpperCase() + rowTitle.slice(1))
                    );
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
        if (category === "key") {
            const updatedCheckState = keyCategory.map((item, index) => (index === position ? !item : item));

            setKeyCategory(updatedCheckState);
        } else if (category === "mood") {
            const updatedCheckState = moodCategory.map((item, index) => (index === position ? !item : item));

            setMoodCategory(updatedCheckState);
        } else if (category === "tags") {
            const updatedCheckState = tagCategory.map((item, index) => (index === position ? !item : item));

            setTagCategory(updatedCheckState);
        }
    };

    const handleFilterElement = (filterName, active, filter) => {
        if (active) {
            setAddedFilters([...addedFilters, filter]);

            if (filterName === "tags") {
                setFilteredBeats(
                    beats.filter((beat) => {
                        beat.tags.filter((beatTag) => {
                            if (beatTag === filter) {
                                return beat;
                            }
                        });
                    })
                );

                return;
            }

            setFilteredBeats(
                beats.filter((beat) => {
                    for (let i = 0; i < addedFilters.length; i++) {
                        if (beat[filterName] === addedFilters[i]) {
                            if (parseInt(beat.bpm) >= bpmLowest && parseInt(beat.bpm) <= bpmHighest) {
                                return true;
                            }
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
                setFilteredBeats(
                    beats.filter((beat) => {
                        if (parseInt(beat.bpm) >= bpmLowest && parseInt(beat.bpm) <= bpmHighest) {
                            return true;
                        }
                    })
                );
                return;
            }

            setFilteredBeats(
                beats.filter((beat) => {
                    for (let i = 0; i < addedFilters.length; i++) {
                        if (beat[filterName] === addedFilters[i]) {
                            if (parseInt(beat.bpm) >= bpmLowest && parseInt(beat.bpm) <= bpmHighest) {
                                return true;
                            }
                        }
                    }
                })
            );
        }
    };

    useEffect(() => {
        const bpmFilter = () => {
            if (bpmLowest === 0 && bpmHighest === 250) {
                return;
            }

            setFilteredBeats(
                beats.filter((beat) => {
                    if (parseInt(beat.bpm) >= bpmLowest && parseInt(beat.bpm) <= bpmHighest) {
                        return beat;
                    }
                })
            );
        };

        bpmFilter();
    }, [bpmHighest, bpmLowest]);

    const handleFilterMobile = () => {
        if (window.innerWidth < 1149) {
            setFilterOpenedMobile(true);
        } else {
            setFilterOpenedMobile(false);
        }
    };

    const handleAddToCart = (beat) => {
        if (!user) return;
        addToCart(beat, dispatch);
    };

    const removeCart = (beat) => {
        removeFromCart(beat, dispatch);
    };

    return (
        <div className="category-list-container">
            <ul className="beats-list">
                <AnimatePresence>
                    {filteredBeats.map((beat, index) => (
                        <motion.li
                            className={`beat ${filteredBeats[index]._id === currentBeat._id && "active"}`}
                            key={index}
                            layout
                            initial={{ opacity: 0, transform: "translateY(-20%)" }}
                            animate={{ opacity: 1, transform: "translateY(0%)" }}
                            exit={{ opacity: 0, transform: "translateY(20%)" }}
                            transition={{ duration: 0.2 }}
                        >
                            <div
                                className="left"
                                onClick={() => {
                                    setIsPlaying(true);
                                    setCurrentBeat(beat);
                                }}
                            >
                                <img src={beat?.img} alt="" />
                                <div className="info">
                                    <div className="title">
                                        <h3>{beat?.title}</h3>
                                    </div>
                                    <span className="key">{beat?.key}</span>
                                    <span className="bpm">{beat?.bpm} BPM</span>
                                </div>
                            </div>

                            <div className="right">
                                {!cart.some((item) => item._id === beat._id) && (
                                    <motion.button
                                        type="button"
                                        onClick={() => {
                                            handleAddToCart(beat, index);
                                        }}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                    >
                                        {!user && (
                                            <div className="login-error">You must login to use cart.</div>
                                        )}

                                        <BsCart2 className="icon" />
                                        <p>
                                            $
                                            {!beat?.basic_licence?.toString()?.includes(".")
                                                ? `${beat?.basic_licence}.00`
                                                : beat?.basic_licence}
                                        </p>
                                    </motion.button>
                                )}

                                {cart.some((item) => item._id === beat._id) && (
                                    <motion.button
                                        type="button"
                                        onClick={() => {
                                            removeCart(beat);
                                        }}
                                        className="incart"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                    >
                                        <BsCart2 className="icon" />
                                        <p>In cart</p>
                                    </motion.button>
                                )}
                            </div>
                        </motion.li>
                    ))}
                </AnimatePresence>
            </ul>

            <div className={`filter ${filterOpenedMobile && "active"}`}>
                <div className="filter-wrapper">
                    <h2 onClick={() => setFilterOpenedMobile(!filterOpenedMobile)}>
                        Filters <BiChevronDown className="chevron" />
                    </h2>

                    <ul className="filter-list">
                        <li
                            onClick={() => {
                                setSelectedFilter("key");
                                handleFilterMobile();
                            }}
                            className={selectedFilter === "key" && "active"}
                        >
                            KEY
                        </li>
                        <li
                            onClick={() => {
                                setSelectedFilter("bpm");
                                handleFilterMobile();
                            }}
                            className={selectedFilter === "bpm" && "active"}
                        >
                            BPM
                        </li>
                        <li
                            onClick={() => {
                                setSelectedFilter("mood");
                                handleFilterMobile();
                            }}
                            className={selectedFilter === "mood" && "active"}
                        >
                            MOOD
                        </li>
                        <li
                            onClick={() => {
                                setSelectedFilter("tags");
                                handleFilterMobile();
                            }}
                            className={selectedFilter === "tags" && "active"}
                        >
                            TAGS
                        </li>
                    </ul>
                </div>

                <div className="filter-sub-category">
                    {selectedFilter === "key" && (
                        <>
                            <h5 style={{ marginBottom: 12 }}>FILTERS FOR KEY</h5>

                            <ul className="sub">
                                {key.map((key, index) => (
                                    <li key={index}>
                                        <label
                                            className={keyCategory[index] ? "active" : ""}
                                            onClick={() => {
                                                handleFilterElement("key", !keyCategory[index], key);
                                            }}
                                        >
                                            {key}
                                            <input
                                                type="checkbox"
                                                onChange={() => handleChangeFilter(index, "key")}
                                            />
                                        </label>
                                    </li>
                                ))}
                            </ul>
                        </>
                    )}

                    {selectedFilter === "bpm" && (
                        <>
                            <h5 style={{ marginBottom: 12 }}>FILTERS FOR BPM</h5>

                            <div className="input-container-bpm">
                                <input
                                    type="number"
                                    value={bpmLowest}
                                    onChange={(e) => {
                                        setBpmLowest(e.target.value);
                                    }}
                                />
                                <span>to</span>
                                <input
                                    type="number"
                                    value={bpmHighest}
                                    onChange={(e) => {
                                        setBpmHighest(e.target.value);
                                    }}
                                />
                            </div>
                        </>
                    )}

                    {selectedFilter === "mood" && (
                        <>
                            <h5 style={{ marginBottom: 12 }}>FILTERS FOR MOOD</h5>

                            <ul className="sub">
                                {mood.map((mood, index) => (
                                    <li key={index}>
                                        <label
                                            className={moodCategory[index] ? "active" : ""}
                                            onClick={() => {
                                                handleFilterElement(
                                                    "primary_mood",
                                                    !moodCategory[index],
                                                    mood
                                                );
                                            }}
                                        >
                                            {mood}
                                            <input
                                                type="checkbox"
                                                onChange={() => handleChangeFilter(index, "mood")}
                                            />
                                        </label>
                                    </li>
                                ))}
                            </ul>
                        </>
                    )}

                    {selectedFilter === "tags" && (
                        <>
                            <h5 style={{ marginBottom: 12 }}>FILTERS FOR KEY</h5>

                            <ul className="sub">
                                {tags.map((tag, index) => (
                                    <li key={index}>
                                        <label
                                            className={tagCategory[index] ? "active" : ""}
                                            onClick={() => {
                                                handleFilterElement("tags", !tagCategory[index], tag);
                                            }}
                                        >
                                            {tag}
                                            <input
                                                type="checkbox"
                                                onChange={() => handleChangeFilter(index, "tags")}
                                            />
                                        </label>
                                    </li>
                                ))}
                            </ul>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CategoryList;
