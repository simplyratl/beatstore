import React from "react";
import "../style/dist/fetchloading.min.css";

const FetchLoading = ({ finished }) => {
    return <div className={`loading-fetch-top ${finished && "end"}`}></div>;
};

export default FetchLoading;
