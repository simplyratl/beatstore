import React, { useEffect, useState } from "react";
import BeatRow from "../components/Beats/BeatRow";
import { rows } from "../components/Beats/beatrowfilter";

const Beats = () => {
    const [rows, setRows] = useState([]);

    useEffect(() => {
        const createRandomRow = () => {
            let randomIndex = [];

            for (let i = 0; i < 5; i++) {
                randomIndex.push(rows[Math.floor(Math.random() * rows.length)]);
            }

            if (!sessionStorage.getItem("library"))
                sessionStorage.setItem("library", JSON.stringify(randomIndex));

            return randomIndex;
        };

        const getRows = () => {
            if (sessionStorage.getItem("library")) {
                setRows(JSON.parse(sessionStorage.getItem("library")));
            }
        };

        createRandomRow();
        getRows();
    }, []);

    return (
        <div style={{ marginTop: 100 }}>
            <BeatRow title="Latest" />
            {rows.map((row) => (
                <BeatRow title={row} />
            ))}
        </div>
    );
};

export default Beats;
