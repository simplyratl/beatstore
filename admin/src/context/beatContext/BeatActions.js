export const createBeatStart = () => ({
    type: 'GREAT_BEAT_START',
});

export const createBeatSuccess = (beats) => ({
    type: 'GREAT_BEAT_SUCCESS',
    payload: beats,
});

export const createBeatFailure = () => ({
    type: 'GREAT_BEAT_FAILURE',
});

export const getBeatStart = () => ({
    type: 'GET_BEAT_START',
});

export const getBeatSuccess = (beats) => ({
    type: 'GET_BEAT_SUCCESS',
    payload: beats,
});

export const getBeatFailure = () => ({
    type: 'GET_BEAT_FAILURE',
});

export const deleteBeatStart = () => ({
    type: 'DELETE_BEAT_START',
});

export const deleteBeatSuccess = (id) => ({
    type: 'DELETE_BEAT_SUCCESS',
    payload: id,
});

export const deleteBeatFailure = () => ({
    type: 'DELETE_BEAT_FAILURE',
});
