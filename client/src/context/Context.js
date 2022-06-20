import { createContext, useEffect, useState } from "react";

export const Context = createContext();

export const BeatPlayProvider = ({ children }) => {
    const [cart, setCart] = useState([]);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentBeat, setCurrentBeat] = useState({});
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

    return (
        <Context.Provider
            value={{
                isPlaying,
                setIsPlaying,
                currentBeat,
                setCurrentBeat,
                user,
                setUser,
                cart,
                setCart,
            }}
        >
            {children}
        </Context.Provider>
    );
};
