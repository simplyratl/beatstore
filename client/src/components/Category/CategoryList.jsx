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
import Filters from "./Filters";

const CategoryList = ({ rowTitle }) => {
    const location = useLocation();
    const [filterOpenedMobile, setFilterOpenedMobile] = useState(false);
    const [beats, setBeats] = useState([]);
    const [filteredBeats, setFilteredBeats] = useState([]);

    const { setIsPlaying, currentBeat, setCurrentBeat } = useContext(Context);

    const { dispatch, cart } = useContext(CartContext);
    const { user } = useContext(AuthContext);

    useEffect(() => {
        if (!location.state) {
            const getData = async () => {
                try {
                    const res = await axios.get("https://elegant-mandarine-91231.herokuapp.com/beat");

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
                            className={`beat ${filteredBeats[index]._id === currentBeat._id ? "active" : ""}`}
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

            <Filters
                filterOpenedMobile={filterOpenedMobile}
                setFilterOpenedMobile={setFilterOpenedMobile}
                beats={beats}
                setBeats={setBeats}
                filteredBeats={filteredBeats}
                setFilteredBeats={setFilteredBeats}
            />
        </div>
    );
};

export default CategoryList;
