import axios from "axios";
import React, { useEffect, useState } from "react";
import BeatCard from "../components/Beats/BeatCard";
import "../style/dist/beatcard.min.css";
import "../style/dist/searchpage.min.css";

const SearchPage = () => {
    const [beat, setBeat] = useState([]);
    const searched = window.location.pathname.split("/")[2].replaceAll("%20", " ");

    useEffect(() => {
        const getSearchResults = async () => {
            try {
                const res = await axios.get(`http://localhost:8800/beat/find/${searched}`);
                setBeat(res.data);
                return res;
            } catch (error) {
                console.log(error);
            }
        };

        getSearchResults();
    }, []);

    return (
        <div className="search-page-container">
            <h1>Search results for {searched}.</h1>

            <div className="search-page-wrapper">
                {beat.map((beatEl, index) => (
                    <div key={index}>
                        <BeatCard beat={beatEl} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SearchPage;
