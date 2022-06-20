import React, { useEffect, useLayoutEffect, useState } from "react";
import SuccessIllustration from "../assets/images/illustrations/undraw_order_confirmed_re_g0if.svg";
import storage from "../firebasemain";
import { getDownloadURL, ref } from "firebase/storage";
import "../style/dist/boughtpage.min.css";
import { useContext } from "react";
import { CartContext } from "../context/cartContext/CartContext";
import CryptoJS from "crypto-js";

const BoughtPage = () => {
    const [downloadLink, setDownloadLink] = useState([]);
    const [buttons, setButtons] = useState([]);

    const { cart } = useContext(CartContext);

    useEffect(() => {
        const getDownloads = () => {
            const temp = downloadLink;

            cart.forEach((cartItem) => {
                if (cart.length !== downloadLink.length) {
                    temp.push({ link: cartItem.mp3_tagged, title: cartItem.title });
                }
            });
            setDownloadLink(temp);
        };

        getDownloads();
        renderButton();
    }, [cart]);

    function renderButton() {
        let temp = [];

        for (let i = 0; i < downloadLink.length; i++) {
            temp.push(
                <button className="order-btn" onClick={() => handleDownload(i)} key={i}>
                    Download {downloadLink[i].title}
                </button>
            );
        }

        setButtons(temp);
        return temp;
    }

    function handleDownload(index) {
        window.open(downloadLink[index].link);
    }

    return (
        <div className="bought-page-container">
            <div className="bought-page-wrapper">
                <img src={SuccessIllustration} />

                <p>Successful order.</p>

                {buttons.map((button) => {
                    return button;
                })}
            </div>
        </div>
    );
};

export default BoughtPage;
