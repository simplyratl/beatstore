import React, { useState } from "react";
import { IoIosSearch } from "react-icons/io";
import "../../style/dist/beatcard.min.css";
import "../../style/dist/beatrow.min.css";
import SkeletonCard from "./SkeletonCard";
import BeatCard from "./BeatCard";
import FetchLoading from "../FetchLoading";
import { useEffect } from "react";

const BeatAll = ({ beats, loading }) => {
    const [search, setSearch] = useState("");
    const [filteredBeats, setFilteredBeats] = useState(beats);

    const displaySkeleton = () => {
        let temp = [];

        for (let i = 0; i < 7; i++) {
            temp.push(
                <div key={i}>
                    <SkeletonCard />
                </div>
            );
        }

        return temp;
    };

    useEffect(() => {
        const searchFilter = () => {
            if (search.length > 0) {
                setFilteredBeats(
                    beats.filter((beat) => {
                        if (beat.title.toLowerCase().startsWith(search.toLowerCase())) {
                            return beat;
                        }
                    })
                );
            } else {
                setFilteredBeats(beats);
            }
        };

        searchFilter();
    }, [search]);

    return (
        <>
            {loading && <FetchLoading finished={loading} />}

            <div className="beat-row-container all">
                <div className="search">
                    <IoIosSearch className="icon" />
                    <input
                        type="text"
                        className="search-input"
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search"
                    />
                </div>

                <div className="beat-row-wrapper">
                    {beats?.length > 0 ? (
                        <div className="beats-container">
                            {loading && displaySkeleton()}

                            {!loading &&
                                filteredBeats
                                    ?.sort((a, b) => new Date(b.createAt) - new Date(a.createAt))
                                    ?.map((beat, index) => (
                                        <div key={index}>
                                            <BeatCard beat={beat} index={index} />
                                        </div>
                                    ))}
                        </div>
                    ) : (
                        <span className="not-found">Not found</span>
                    )}
                </div>
            </div>
        </>
    );
};

export default BeatAll;
