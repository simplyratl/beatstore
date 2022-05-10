import { AUTH, LOGOUT } from '../actionTypes';

const authReducer = (state = { authData: null }, action) => {
    switch (action.type) {
        case AUTH:
            localStorage.setItem('user', JSON.stringify({ ...action?.data }));
            return { ...state, authData: action?.data };
        case LOGOUT:
            localStorage.removeItem('user');
            return { ...state, authData: null };

        default:
            return state;
    }
};

export default authReducer;
