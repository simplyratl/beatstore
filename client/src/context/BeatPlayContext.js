import { createContext, useState } from 'react';

export const BeatPlayingContext = createContext();

export const BeatPlayProvider = ({ children }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentBeat, setCurrentBeat] = useState({});

    return (
        <BeatPlayingContext.Provider
            value={{
                isPlaying,
                setIsPlaying,
                currentBeat,
                setCurrentBeat,
            }}
        >
            {children}
        </BeatPlayingContext.Provider>
    );
};
