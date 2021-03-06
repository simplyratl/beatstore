import React from "react";
import { useRef } from "react";
import { IoClose } from "react-icons/io5";
import "../../style/dist/sharebeats.min.css";

const ShareBeat = ({ setClose }) => {
    const inputLink = useRef();

    return (
        <div className="share-container">
            <div className="share-wrapper">
                <div className="top">
                    <h4>Share</h4>
                    <IoClose className="close" onClick={() => setClose(false)} />
                </div>

                <div className="share-link">
                    <input type="text" readOnly defaultValue={window.location} ref={inputLink} />
                    <span
                        className="copy"
                        onClick={() => {
                            navigator.clipboard.writeText(window.location);
                            inputLink.current.focus();
                        }}
                    >
                        COPY
                    </span>
                </div>
            </div>
        </div>
    );
};

export default ShareBeat;
