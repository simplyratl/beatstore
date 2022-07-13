import React, { useEffect, useState } from "react";
import "../../style/dist/promotionbar.min.css";
import { MdRemove } from "react-icons/md";

const Promotion_Navbar = ({ navbarRef }) => {
    const [remove, setRemove] = useState(false);
    const [message, setMessage] = useState("");

    useEffect(() => {
        if (remove) {
            navbarRef.current.style.top = "0";
        } else navbarRef.current.style.top = "50px";
    }, [remove]);

    useEffect(() => {
        window.addEventListener("resize", () => {
            if (window.innerWidth > 770)
                setMessage(
                    `July Sale: Use Code "ratl20" For 20% Off Your Order. Ends July 21st At 11:59 P.M.`
                );
            else setMessage(`July Sale: Code "ratl20".`);
        });
    });

    return (
        <>
            {!remove && (
                <div className="promotion-bar">
                    <h3>{message}</h3>
                    <MdRemove className="remove" onClick={() => setRemove(true)} />
                </div>
            )}
        </>
    );
};

export default Promotion_Navbar;
