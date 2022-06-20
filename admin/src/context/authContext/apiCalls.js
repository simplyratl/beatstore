import axios from "axios";
import { loginFailure, loginStart, loginSuccess, updateUser, logout } from "./AuthActions";

export const login = async (user, dispatch, setErrorDisplay) => {
    dispatch(loginStart());
    try {
        const res = await axios.post("http://localhost:8800/auth/login", user);
        res.data.isAdmin && dispatch(loginSuccess(res.data));

        setErrorDisplay("Uspjesno ulogovan.");
    } catch (error) {
        dispatch(loginFailure());
        setErrorDisplay("Nemate admin nalog, ili kredincijali su netačni.");
    }
};

export const logoutStart = (dispatch) => {
    dispatch(logout());
};
