import React, { useEffect, useState } from 'react';
import { IoSearchOutline, IoSettingsOutline } from 'react-icons/io5';
import { BsCart2 } from 'react-icons/bs';
import { BiHeart, BiLogOut } from 'react-icons/bi';
import { AiOutlineUser } from 'react-icons/ai';
import { Link, useLocation } from 'react-router-dom';
import '../style/hamburger/hamburger.css';
import '../style/dist/navbar.min.css';
import Promotion_Navbar from './Home/Promotion_Navbar';

const Navbar = () => {
    const [hamburger, setHamburger] = useState(false);
    const [showHamburgerWidth, setShowHamburgerWidth] = useState(false);
    const [searchShow, setSearchShow] = useState(false);
    const [background, setBackground] = useState(false);
    const location = useLocation();

    let timer = null;
    useEffect(() => {
        window.addEventListener('resize', () => {
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

    useEffect(() => {
        setHamburger(false);
    }, [location]);

    window.addEventListener('scroll', changeBackgorund);

    return (
        <header>
            <Promotion_Navbar enabled={background} />

            <div className={`${background ? 'navbar-inner background' : 'navbar-inner'}`}>
                <div
                    className={`navigation-left ${hamburger ? 'active' : showHamburgerWidth ? 'hidden' : ''}`}
                >
                    <div className='logo'>
                        <a href='/'>
                            <img src={require('../assets/images/logo transparent.png')} className='light' />
                        </a>
                    </div>

                    <ul className='navigation-wrapper'>
                        <li className='navigation-list'>
                            <Link to='/' className='navigation-link'>
                                HOME
                            </Link>
                        </li>
                        <li className='navigation-list'>
                            <Link to='/beats' className='navigation-link'>
                                BEATS
                            </Link>
                        </li>
                        <li className='navigation-list'>
                            <a href='#' className='navigation-link'>
                                PRODUCT
                            </a>
                        </li>
                        <li className='navigation-list'>
                            <a href='#' className='navigation-link'>
                                CONTACT
                            </a>
                        </li>
                    </ul>
                </div>

                <div className='navigation-right'>
                    <div className={`search-bar ${searchShow && 'active'}`}>
                        <span className='icon search-icon' onClick={() => setSearchShow(!searchShow)}>
                            {<IoSearchOutline />}
                        </span>
                        <div className='input'>
                            <input type='text' placeholder='Search for beats...' autoComplete='off' />
                        </div>
                    </div>
                    <div className='user-wrapper'>
                        <span className='icon element'>{<AiOutlineUser />}</span>

                        <div className='user-sub-menu'>
                            <div>
                                <a href='#' className='profile-main'>
                                    <img src='https://pbs.twimg.com/media/DiHYZjOVAAA95Yc.jpg' alt='' />

                                    <span>Index</span>
                                </a>
                            </div>

                            <ul className='ul-user-sub-menu'>
                                <a href='#' className='a-user-sub-menu'>
                                    <li className='li-user-sub-menu'>
                                        <BiHeart className='sub-icon' />
                                        Wishlist
                                    </li>
                                </a>
                                <a href='#' className='a-user-sub-menu'>
                                    <li className='li-user-sub-menu'>
                                        <IoSettingsOutline className='sub-icon' />
                                        Settings
                                    </li>
                                </a>
                                <a href='#' className='a-user-sub-menu'>
                                    <li className='li-user-sub-menu last'>
                                        <BiLogOut className='sub-icon' />
                                        Logout
                                    </li>
                                </a>
                            </ul>
                        </div>
                    </div>
                    <div className='cart element'>
                        <span className='icon'>{<BsCart2 />}</span>
                        <span className='money-in-cart'>$225.00</span>
                    </div>

                    <div className='vertical-line'></div>

                    <button
                        className={`hamburger hamburger--emphatic-r ${hamburger && 'is-active'}`}
                        type='button'
                        onClick={() => setHamburger(!hamburger)}
                    >
                        <span className='hamburger-box'>
                            <span className='hamburger-inner'></span>
                        </span>
                    </button>
                </div>
            </div>
        </header>
    );
};

export default Navbar;
