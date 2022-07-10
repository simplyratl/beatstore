import React, { useEffect, useRef } from "react";
import "../style/dist/loading.min.css";

const Loading = ({ finished }) => {
    const loadingRef = useRef();

    useEffect(() => {
        if (finished) {
            setTimeout(() => {
                loadingRef.current.className = "loading-container fade";
            }, [1200]);
        }
    }, [finished]);

    return (
        <div className="loading-container" ref={loadingRef}>
            <div className="loading-wrapper">
                <div className={`loading ${finished && "active-loading"}`}>
                    <span>LOADING...</span>
                </div>
            </div>
        </div>
    );
};

export default Loading;
