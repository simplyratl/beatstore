import React, { useEffect, useState } from "react";
import "../../style/dist/featurescrolling.min.css";
import Picture from "../../assets/images/illustrations/undraw_post_online_re_1b82.svg";
import { AiOutlineGift, AiOutlineDownload } from "react-icons/ai";
import { IoShareSocialOutline } from "react-icons/io5";
import { BiMicrophone } from "react-icons/bi";
import { BsSoundwave, BsPaypal } from "react-icons/bs";
import { AnimatePresence, motion, useScroll } from "framer-motion";

const FeaturesScrolling = () => {
    const [scrollPosition, setScrollPosition] = useState(0);

    const { scrollY } = useScroll();

    scrollY.onChange((y) => {
        setScrollPosition(y);
    });

    return (
        <div className="features-container">
            <div className="features-wrapper">
                <div className={`left grid ${scrollPosition >= 2800 && "active"}`}>
                    <AnimatePresence>
                        {scrollPosition >= 3000 && (
                            <motion.div
                                className="card"
                                initial={{ opacity: 0, transform: "translateY(-20%)" }}
                                animate={{ opacity: 1, transform: "translateY(0%)" }}
                                exit={{ opacity: 0, transform: "translateY(-20%)" }}
                            >
                                <AiOutlineGift className="icon" />

                                <div className="text">
                                    <h3>Bulk Deals</h3>
                                    <p>Buy beats and get bulk deals</p>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                    <AnimatePresence>
                        {scrollPosition >= 3500 && (
                            <motion.div
                                className="card two"
                                initial={{ opacity: 0, transform: "translateY(-20%)" }}
                                animate={{ opacity: 1, transform: "translateY(0%)" }}
                                exit={{ opacity: 0, transform: "translateY(-20%)" }}
                            >
                                <BsPaypal className="icon" />

                                <div className="text">
                                    <h3>Transactions</h3>
                                    <p>Fast transactions and cheap prices.</p>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <AnimatePresence>
                        {scrollPosition >= 4000 && (
                            <motion.div
                                className="card"
                                initial={{ opacity: 0, transform: "translateY(-20%)" }}
                                animate={{ opacity: 1, transform: "translateY(0%)" }}
                                exit={{ opacity: 0, transform: "translateY(-20%)" }}
                            >
                                <IoShareSocialOutline className="icon" />

                                <div className="text">
                                    <h3>Share</h3>
                                    <p>Share your music everywhere with beats you bought.</p>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* <Parallax translateY={[-24, -10]}> */}
                <div className="middle">
                    <img src={Picture} />
                </div>
                {/* </Parallax> */}

                <div className={`right grid ${scrollPosition >= 4300 && "active"}`}>
                    <AnimatePresence>
                        {scrollPosition >= 4500 && (
                            <motion.div
                                className="card"
                                initial={{ opacity: 0, transform: "translateY(-20%)" }}
                                animate={{ opacity: 1, transform: "translateY(0%)" }}
                                exit={{ opacity: 0, transform: "translateY(-20%)" }}
                            >
                                <AiOutlineDownload className="icon" />

                                <div className="text">
                                    <h3>Instant Download</h3>
                                    <p>Just buy beats and download immediately.</p>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <AnimatePresence>
                        {scrollPosition >= 5000 && (
                            <motion.div
                                className="card"
                                initial={{ opacity: 0, transform: "translateY(-20%)" }}
                                animate={{ opacity: 1, transform: "translateY(0%)" }}
                                exit={{ opacity: 0, transform: "translateY(-20%)" }}
                            >
                                <BiMicrophone className="icon" />

                                <div className="text">
                                    <h3>Record</h3>
                                    <p>Record music with any license.</p>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <AnimatePresence>
                        {scrollPosition >= 5500 && (
                            <motion.div
                                className="card"
                                initial={{ opacity: 0, transform: "translateY(-20%)" }}
                                animate={{ opacity: 1, transform: "translateY(0%)" }}
                                exit={{ opacity: 0, transform: "translateY(-20%)" }}
                            >
                                <BsSoundwave className="icon" />

                                <div className="text">
                                    <h3>High Quality Beats</h3>
                                    <p>Anything more to say?</p>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
};

export default FeaturesScrolling;
