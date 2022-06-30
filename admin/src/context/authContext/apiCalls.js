import axios from "axios";
import { loginFailure, loginStart, loginSuccess, updateUser, logout } from "./AuthActions";

export const login = async (user, dispatch, setErrorDisplay) => {
    dispatch(loginStart());
    try {
        const adminUser = {
            ...user,
            admin: true,
        };

        const res = await axios.post("http://localhost:8800/auth/login", adminUser);
        res.data.isAdmin && dispatch(loginSuccess(res.data));

        setErrorDisplay("Uspjesno ulogovan.");
    } catch (error) {
        dispatch(loginFailure());
        switch (error.response.status) {
            case 400:
                setErrorDisplay("User not found");
                break;
            case 403:
                setErrorDisplay("You are not authorised for this login.");
                break;
            case 404:
                setErrorDisplay("Incorrect password");
                break;
        }
    }
};

export const logoutStart = (dispatch) => {
    dispatch(logout());
};
