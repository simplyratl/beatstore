import React, { useContext, useEffect, useState } from "react";
import { IoSearchOutline, IoSettingsOutline } from "react-icons/io5";
import { BsCart2 } from "react-icons/bs";
import { BiHeart, BiLogOut } from "react-icons/bi";
import { AiOutlineUser } from "react-icons/ai";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../style/hamburger/hamburger.css";
import "../style/dist/navbar.min.css";
import Promotion_Navbar from "./Home/Promotion_Navbar";
import { CartContext } from "../context/cartContext/CartContext";
import { logoutRegular } from "../context/authContext/apiCalls";
import { AuthContext } from "../context/authContext/AuthContext";

const Navbar = () => {
    const [hamburger, setHamburger] = useState(false);
    const [showHamburgerWidth, setShowHamburgerWidth] = useState(false);
    const [searchShow, setSearchShow] = useState(false);
    const [background, setBackground] = useState(false);
    const [hideNav, setHideNav] = useState(false);

    const [total, setTotal] = useState(0);

    const [userMenu, setUserMenu] = useState(false);

    const location = useLocation();
    const navigate = useNavigate();

    const { cart, dispatch } = useContext(CartContext);
    const { dispatch: authDispatch } = useContext(AuthContext);
    const { user } = useContext(AuthContext);

    let lastScroll = window.scrollY;

    useEffect(() => {
        const calculateTotal = () => {
            if (cart.length > 0) {
                let counter = 0;

                for (let i = 0; i < cart?.length; i++) {
                    counter += cart[i].basic_licence;
                }

                setTotal(counter.toFixed(2));
            } else {
                setTotal(0);
            }
        };

        calculateTotal();
    }, [cart]);

    useEffect(() => {
        window.addEventListener("resize", () => {
            if (window.innerWidth < 1149) {
                setShowHamburgerWidth(true);
            } else {
                setShowHamburgerWidth(false);
            }
        });
    });

    const changeBackgorund = () => {
        if (window.scrollY >= 150) {
            setBackground(true);
        } else {
            setBackground(false);
        }
    };

    const hideNavScroll = () => {
        if (lastScroll < window.scrollY && lastScroll > 120) {
            setHideNav(true);
            setUserMenu(false);
        } else {
            setHideNav(false);
        }

        lastScroll = window.scrollY;
    };

    useEffect(() => {
        setHamburger(false);
        setUserMenu(false);
    }, [location]);

    window.addEventListener("scroll", () => {
        changeBackgorund();
        hideNavScroll();
    });

    const handleLogout = () => {
        logoutRegular(authDispatch);
    };

    const handleSearch = (e) => {
        window.location = `/search/${e.target.value}`;
        // navigate(`/search/${e.target.value}`);
    };

    console.log(user);

    return (
        <header>
            {/* <Promotion_Navbar enabled={background} /> */}

            <div
                className={`${background ? "navbar-inner background" : "navbar-inner"}`}
                style={{ top: hideNav && "-100px" }}
            >
                <div
                    className={`navigation-left ${hamburger ? "active" : showHamburgerWidth ? "hidden" : ""}`}
                >
                    <div className="logo">
                        <a href="/">
                            <img src={require("../assets/images/logo transparent.png")} className="light" />
                        </a>
                    </div>

                    <ul className="navigation-wrapper">
                        <li className="navigation-list">
                            <Link to="/" className="navigation-link">
                                HOME
                            </Link>
                        </li>
                        <li className="navigation-list">
                            <Link to="/beats" className="navigation-link">
                                BEATS
                            </Link>
                        </li>
                        <li className="navigation-list">
                            <a href="#" className="navigation-link disabled">
                                KITS
                            </a>
                        </li>
                        <li className="navigation-list">
                            <Link to={"/contact"} className="navigation-link">
                                CONTACT
                            </Link>
                        </li>
                    </ul>
                </div>

                <div className="navigation-right">
                    <div className={`search-bar ${searchShow && "active"}`}>
                        <span className="icon search-icon" onClick={() => setSearchShow(!searchShow)}>
                            {<IoSearchOutline />}
                        </span>
                        <div className="input">
                            <input
                                type="text"
                                placeholder="Search for beats..."
                                autoComplete="off"
                                onKeyPress={(e) => e.key === "Enter" && handleSearch(e)}
                            />
                        </div>
                    </div>
                    <div className="user-wrapper">
                        {user ? (
                            <span className="icon element user" onClick={() => setUserMenu(!userMenu)}>
                                {<AiOutlineUser />}
                            </span>
                        ) : (
                            <>
                                <Link to={"/register"} className="element auth">
                                    Sign up
                                </Link>
                                <Link to={"/login"} className="element auth">
                                    Sign In
                                </Link>
                            </>
                        )}

                        {user ? (
                            <div className={`user-sub-menu ${userMenu && "active"}`}>
                                <div>
                                    <Link
                                        to={`/profile/${user.result ? user.result.givenName : user.username}`}
                                        className="profile-main"
                                    >
                                        <img
                                            src={user.result ? user.result.imageUrl : user.profilePic}
                                            alt=""
                                        />

                                        <span>{user.result ? user.result.givenName : user.username}</span>
                                    </Link>
                                </div>

                                <ul className="ul-user-sub-menu">
                                    <a href="/checkout" className="a-user-sub-menu">
                                        <li className="li-user-sub-menu">
                                            <BiHeart className="sub-icon" />
                                            Cart
                                        </li>
                                    </a>
                                    <a href="#" className="a-user-sub-menu">
                                        <li className="li-user-sub-menu">
                                            <IoSettingsOutline className="sub-icon" />
                                            Settings
                                        </li>
                                    </a>
                                    <span href="#" className="a-user-sub-menu" style={{ cursor: "pointer" }}>
                                        <li className="li-user-sub-menu last" onClick={() => handleLogout()}>
                                            <BiLogOut className="sub-icon" />
                                            Logout
                                        </li>
                                    </span>
                                </ul>
                            </div>
                        ) : null}
                    </div>
                    <a href="/checkout" className="cart element">
                        <span className="icon">{<BsCart2 />}</span>
                        <span className="money-in-cart">${total}</span>
                    </a>

                    <div className="vertical-line"></div>

                    <button
                        className={`hamburger hamburger--emphatic-r ${hamburger && "is-active"}`}
                        type="button"
                        onClick={() => setHamburger(!hamburger)}
                    >
                        <span className="hamburger-box">
                            <span className="hamburger-inner"></span>
                        </span>
                    </button>
                </div>
            </div>
        </header>
    );
};

export default Navbar;
