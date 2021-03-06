import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
    loginFailure,
    loginStart,
    loginSuccess,
    loginSuccessGoogle,
    loginFailureGoogle,
    registerStart,
    registerFailure,
    registerSuccess,
    logoutStart,
    updateUser,
} from "./AuthActions";

export const login = async (user, dispatch, setErrorDisplay, url) => {
    dispatch(loginStart());

    try {
        const res = await axios.post("https://elegant-mandarine-91231.herokuapp.com/auth/login", user);
        // const res = await axios.post("http://192.168.1.18:8800/auth/login", user);
        dispatch(loginSuccess(res.data));

        setErrorDisplay("Login success.");

        window.location.href = url;
    } catch (error) {
        dispatch(loginFailure());
        switch (error.response.status) {
            case 400:
                setErrorDisplay("User not found");
                break;
            case 404:
                setErrorDisplay("Incorrect password");
                break;
        }
    }
};

export const loginGoogle = (user, dispatch) => {
    dispatch(loginStart());

    try {
        dispatch(loginSuccessGoogle(user));
        window.location.href = "/";
    } catch (error) {
        dispatch(loginFailureGoogle());
    }
};

export const register = async (user, dispatch, setErrorDisplay, setSuccess) => {
    dispatch(registerStart());

    try {
        const res = await axios.post("https://elegant-mandarine-91231.herokuapp.com/auth/register", user);
        dispatch(registerSuccess(res.data));

        setTimeout(() => {
            window.location.href = "/login";
        }, [2000]);

        setSuccess(true);
    } catch (error) {
        dispatch(registerFailure());
        switch (error.response.status) {
            case 400:
                setErrorDisplay("User with that email already exists.");
                break;
            case 500:
                setErrorDisplay("Something went wrong or user with that username exists.");
                break;
        }
    }
};

export const logoutRegular = (dispatch) => {
    dispatch(logoutStart());
};

export const userUpdated = (user, dispatch) => {
    dispatch(updateUser(user));
};
