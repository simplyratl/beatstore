import React from "react";
import { FiTwitter } from "react-icons/fi";
import { FaFacebookF } from "react-icons/fa";
import { AiOutlineYoutube } from "react-icons/ai";
import "../style/dist/footer.min.css";
import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-wrapper">
                <div className="top-bar">
                    <h2>Beatstore ratlx</h2>

                    <div className="social">
                        <FiTwitter className="icon" />
                        <FaFacebookF className="icon" />
                        <AiOutlineYoutube className="icon" />
                    </div>

                    <div className="tos">
                        Our Terms of service &{" "}
                        <Link to={"/privacy-policy"} style={{ color: "#da4445" }}>
                            Privacy Policy.
                        </Link>
                    </div>
                </div>

                <div className="bottom-bar">
                    <ul className="list">
                        <li className="element">
                            <Link to="/login">Sign in</Link>
                        </li>
                        <li className="element">
                            <Link to="/beats">Beats</Link>
                        </li>
                        <li className="element">
                            <Link to="/contact">Contact</Link>
                        </li>
                    </ul>

                    <div className="newsletter">
                        <p>
                            Subscribe to receive emails about <br /> promotions and free beats!
                        </p>
                        <input type="text" className="newsletter-input" placeholder="Enter your email" />
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
