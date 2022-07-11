import React, { useEffect, useState } from "react";
import BeatTopBar from "../components/BeatSingle/BeatTopBar";
import FetchLoading from "../components/FetchLoading";

const BeatSingle = () => {
    const [loading, setLoading] = useState(true);
    const [finished, setFinished] = useState(false);

    useEffect(() => {
        const onPageLoad = () => {
            setFinished(true);

            setTimeout(() => {
                setLoading(false);
            }, 600);
        };

        if (document.readyState === "complete") {
            onPageLoad();
        } else {
            window.addEventListener("load", onPageLoad);
            return () => window.removeEventListener("load", onPageLoad);
        }
    }, []);

    return (
        <>
            {loading && <FetchLoading finished={finished} />}
            <BeatTopBar />
        </>
    );
};

export default BeatSingle;
