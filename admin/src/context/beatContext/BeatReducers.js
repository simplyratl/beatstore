const BeatReducer = (state, action) => {
    switch (action.type) {
        case 'CREATE_BEAT_START':
            return {
                ...state,
                isFetching: true,
                error: false,
            };

        case 'CREATE_BEAT_SUCCESS':
            return {
                beats: [...state.beats, action.payload],
                isFetching: false,
                error: false,
            };

        case 'CREATE_BEAT_FAILURE':
            return {
                ...state,
                isFetching: false,
                error: true,
            };
        case 'GET_BEAT_START':
            return {
                beats: [],
                isFetching: true,
                error: false,
            };

        case 'GET_BEAT_SUCCESS':
            return {
                beats: action.payload,
                isFetching: false,
                error: false,
            };

        case 'GET_BEAT_FAILURE':
            return {
                beats: [],
                isFetching: false,
                error: true,
            };
        case 'DELETE_BEAT_START':
            return {
                ...state,
                isFetching: true,
                error: false,
            };

        case 'DELETE_BEAT_SUCCESS':
            return {
                beats: state.beats.filter((beat) => beat._id !== action.payload),
                isFetching: false,
                error: false,
            };

        case 'DELETE_BEAT_FAILURE':
            return {
                ...state,
                isFetching: false,
                error: true,
            };

        default:
            return { ...state };
    }
};

export default BeatReducer;
