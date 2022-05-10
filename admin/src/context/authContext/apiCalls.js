import axios from 'axios';
import { loginFailure, loginStart, loginSuccess } from './AuthActions';

export const login = async (user, dispatch, setErrorDisplay) => {
    dispatch(loginStart());
    try {
        const res = await axios.post('http://192.168.1.18/auth/login', user);
        res.data.isAdmin && dispatch(loginSuccess(res.data));

        setErrorDisplay('Uspjesno ulogovan.');
    } catch (error) {
        dispatch(loginFailure());
        setErrorDisplay('Nemate admin nalog, ili kredincijali su netačni.');
    }
};
