import React, { useEffect, useState } from "react";
import BeatRow from "../components/Beats/BeatRow";
import { rows } from "../components/Beats/beatrowfilter";
import { BsFillGrid3X3GapFill, BsGrid3X2GapFill } from "react-icons/bs";
import "../style/dist/beats.min.css";
import BeatAll from "../components/Beats/BeatAll";
import axios from "axios";

const Beats = () => {
    const [rowsCategory, setRowsCategory] = useState([]);
    const [gridLayout, setGridLayout] = useState(1);
    const [beats, setBeats] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getBeats = async () => {
            try {
                const res = await axios.get("https://elegant-mandarine-91231.herokuapp.com/beat");

                setBeats(res.data);
                setLoading(false);
                return res;
            } catch (error) {
                console.log(error);
            }
        };

        getBeats();
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

    const layoutRow = () => {
        return (
            <>
                <BeatRow title="Latest" beats={beats} loading={loading} />
                <BeatRow title="Popular" beats={beats} loading={loading} />
                {rowsCategory.map((row, index) => (
                    <div className="beat-row" key={index}>
                        <BeatRow title={row} beats={beats} loading={loading} />
                    </div>
                ))}
            </>
        );
    };

    const layoutAll = () => {
        return <BeatAll beats={beats} loading={loading} />;
    };

    return (
        <>
            <div style={{ marginTop: 150 }}>
                <div className="filter-rows">
                    <BsGrid3X2GapFill
                        className={`icon ${gridLayout === 1 ? "active" : ""}`}
                        onClick={() => setGridLayout(1)}
                    />
                    <BsFillGrid3X3GapFill
                        className={`icon ${gridLayout === 2 ? "active" : ""}`}
                        onClick={() => setGridLayout(2)}
                    />
                </div>

                {gridLayout === 1 ? layoutRow() : layoutAll()}
            </div>
        </>
    );
};

export default Beats;
