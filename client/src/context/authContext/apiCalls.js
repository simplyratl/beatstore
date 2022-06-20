import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { loginFailure, loginStart, loginSuccess, loginSuccessGoogle, loginFailureGoogle, registerStart, registerFailure, registerSuccess, logoutStart, updateUser } from './AuthActions';

export const login = async (user, dispatch, setErrorDisplay) => {
    dispatch(loginStart());

    try {
        const res = await axios.post('http://localhost:8800/auth/login', user);
        dispatch(loginSuccess(res.data));

        window.location.href = '/';

        setErrorDisplay('Uspjesno ulogovan.');
    } catch (error) {
        dispatch(loginFailure());
        setErrorDisplay("You don't have admin account, or credidentials are not correct.");
    }
};

export const loginGoogle = (user, dispatch) => {
    dispatch(loginStart());

    try {
        dispatch(loginSuccessGoogle(user));
        window.location.href = '/';

    } catch (error) {
        dispatch(loginFailureGoogle());
    }
}

export const register = async (user, dispatch, setErrorDisplay, setSuccess) => {
    dispatch(registerStart());

    try {
        const res = await axios.post('http://localhost:8800/auth/register', user);
        dispatch(registerSuccess(res.data));

        setTimeout(() => {
            window.location.href = '/login';
        }, [2000])

        setSuccess(true);

    } catch (error) {
        dispatch(registerFailure());
        setErrorDisplay('Registration failed.');
    }
}

export const logoutRegular = (dispatch) => {
    dispatch(logoutStart());
}

export const userUpdated = (user, dispatch) => {
    dispatch(updateUser(user));
}