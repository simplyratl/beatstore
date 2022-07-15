import React, { useEffect, useState } from "react";
import BeatRow from "../components/Beats/BeatRow";
import { rows } from "../components/Beats/beatrowfilter";
import FetchLoading from "../components/FetchLoading";

const Beats = () => {
    const [rowsCategory, setRowsCategory] = useState([]);
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

    useEffect(() => {
        const createRandomRow = () => {
            let randomIndex = [];

            for (let i = 0; i < 5; i++) {
                randomIndex.push(rows[Math.floor(Math.random() * rows.length - 1)]);
            }

            if (!sessionStorage.getItem("library"))
                sessionStorage.setItem("library", JSON.stringify(randomIndex));

            return randomIndex;
        };

        const getRows = () => {
            if (sessionStorage.getItem("library")) {
                setRowsCategory(JSON.parse(sessionStorage.getItem("library")));
            }
        };

        createRandomRow();
        getRows();
    }, []);

    return (
        <>
            {/* {loading && <FetchLoading finished={finished} />} */}
            <div style={{ marginTop: 150 }}>
                <BeatRow title="Latest" />
                {rowsCategory.map((row, index) => (
                    <div className="beat-row" key={index}>
                        <BeatRow title={row} />
                    </div>
                ))}
            </div>
        </>
    );
};

export default Beats;
