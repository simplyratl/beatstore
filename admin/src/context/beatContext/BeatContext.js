import { createContext, useReducer } from 'react';
import BeatReducer from './BeatReducers';

const INITIAL_STATE = {
    beats: [],
    isFetching: false,
    error: false,
};

export const BeatContext = createContext(INITIAL_STATE);

export const BeatContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(BeatReducer, INITIAL_STATE);

    return (
        <BeatContext.Provider
            value={{
                beats: state.beats,
                isFetching: state.isFetching,
                error: state.error,
                dispatch,
            }}
        >
            {children}
        </BeatContext.Provider>
    );
};
