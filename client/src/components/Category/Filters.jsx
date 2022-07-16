import React, { useState } from "react";
import { BsPlayFill, BsFillPauseFill, BsCart2 } from "react-icons/bs";
import { BiChevronDown } from "react-icons/bi";
import { genres, keys, rows } from "../Beats/beatrowfilter";
import { tags } from "./categoriesfilter";
import { useEffect } from "react";

const Filters = ({
    filterOpenedMobile,
    setFilterOpenedMobile,
    beats,
    setBeats,
    filteredBeats,
    setFilteredBeats,
}) => {
    const [selectedFilter, setSelectedFilter] = useState("key");

    const [addedFilters, setAddedFilters] = useState([]);

    const [bpmLowest, setBpmLowest] = useState(0);
    const [bpmHighest, setBpmHighest] = useState(250);

    const renderButtonList = () => {
        const list = ["key", "bpm", "mood", "tags"];

        return list.map((element, index) => (
            <li
                onClick={() => {
                    setSelectedFilter(element);
                }}
                className={selectedFilter === element && "active"}
                key={index}
            >
                {element.toUpperCase()}
            </li>
        ));
    };

    const filterAdd = (e, element, filter) => {
        if (filter === "mood") filter = "primary_mood";

        if (e.target.checked) {
            setAddedFilters([...addedFilters, { element, filter }]);
        } else {
            setAddedFilters(addedFilters.filter((filter) => filter.element !== element));
        }
    };

    const filterCheckboxes = () => {
        const filterResults = {
            key: keys,
            mood: genres,
            tags: tags,
        };

        if (selectedFilter === "bpm") return renderBPMFilter();

        return filterResults[selectedFilter].map((element, index) => (
            <li key={index}>
                <label className={addedFilters.some((filter) => filter.element === element) ? "active" : ""}>
                    {element}
                    <input type="checkbox" onChange={(e) => filterAdd(e, element, selectedFilter)} />
                </label>
            </li>
        ));
    };

    const renderBPMFilter = () => {
        return (
            <div className="input-container-bpm">
                <input
                    type="number"
                    value={bpmLowest}
                    onChange={(e) => {
                        setBpmLowest(e.target.value);
                    }}
                />
                <span>to</span>
                <input
                    type="number"
                    value={bpmHighest}
                    onChange={(e) => {
                        setBpmHighest(e.target.value);
                    }}
                />
            </div>
        );
    };

    useEffect(() => {
        const filterBeats = () => {
            if (filteredBeats.length === 0 && addedFilters.length === 0) return setFilteredBeats(beats);

            setFilteredBeats(
                beats.filter((beat) => {
                    if (parseInt(beat.bpm) >= bpmLowest && parseInt(beat.bpm) <= bpmHighest) {
                        if (addedFilters.length === 0) {
                            return beat;
                        }

                        return addedFilters.some((filter) =>
                            beat[filter.filter] === filter.element ? beat : null
                        );
                    }
                })
            );
        };

        filterBeats();
        console.log("teswt");
    }, [addedFilters, bpmLowest, bpmHighest]);

    return (
        <div className={`filter ${filterOpenedMobile ? "active" : ""}`}>
            <div className="filter-wrapper">
                <h2 onClick={() => setFilterOpenedMobile(!filterOpenedMobile)}>
                    Filters <BiChevronDown className="chevron" />
                </h2>

                <ul className="filter-list">{renderButtonList()}</ul>
            </div>

            <div className="filter-sub-category">
                <h5 style={{ marginBottom: 12 }}>FILTERS FOR KEY</h5>

                <ul className="sub">{filterCheckboxes()}</ul>
            </div>
        </div>
    );
};

export default Filters;
