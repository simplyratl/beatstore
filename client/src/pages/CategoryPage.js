import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import CategoryList from "../components/Category/CategoryList";

const CategoryPage = () => {
    const location = useLocation();

    const title = location.pathname.replace("/category/", "");

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    }, [location]);

    return (
        <div className="category-container">
            <div className="category-wrapper">
                <h1 style={{ color: "#fff", marginTop: 120, marginLeft: "4%" }}>{title.toUpperCase()}</h1>

                <CategoryList rowTitle={title} />
            </div>
        </div>
    );
};

export default CategoryPage;
