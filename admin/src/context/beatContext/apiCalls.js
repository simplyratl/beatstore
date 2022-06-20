import {
    createBeatFailure,
    createBeatStart,
    createBeatSuccess,
    deleteBeatFailure,
    deleteBeatStart,
    deleteBeatSuccess,
    getBeatFailure,
    getBeatStart,
    getBeatSuccess,
} from "./BeatActions";
import axios from "axios";

export const createBeat = async (beat, dispatch, setStatus) => {
    dispatch(createBeatStart());

    try {
        setStatus("Adding...");
        const res = await axios.post("http://localhost:8800/beat", beat, {
            headers: {
                token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
            },
        });

        dispatch(createBeatSuccess(res.data));

        setTimeout(() => {
            setStatus("");
        }, [2000]);

        setStatus("Successfuly added beat.");
    } catch (error) {
        dispatch(createBeatFailure());
        setStatus("Beat has not been added. Error.");
    }
};

export const getBeats = async (dispatch) => {
    dispatch(getBeatStart());

    try {
        const res = await axios.get("http://localhost:8800/beat", {
            headers: {
                token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
            },
        });

        dispatch(getBeatSuccess(res.data));
    } catch (error) {
        dispatch(getBeatFailure());
    }
};

export const deleteBeats = async (id, dispatch, setDeleteSuccess) => {
    dispatch(deleteBeatStart());

    try {
        await axios.delete("http://localhost:8800/beat/" + id, {
            headers: {
                token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
            },
        });

        setDeleteSuccess(true);
        dispatch(deleteBeatSuccess(id));
    } catch (error) {
        dispatch(deleteBeatFailure());
    }
};
