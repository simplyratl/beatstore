const AuthReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN_START':
            return {
                user: null,
                isFetching: true,
                error: false,
            };

        case 'LOGIN_SUCCESS':
            return {
                user: action.payload,
                isFetching: false,
                error: false,
            };

        case 'LOGIN_FAILURE':
            return {
                user: null,
                isFetching: false,
                error: true,
            };

        case 'LOGOUT':
            return {
                user: null,
                isFetching: false,
                error: false,
            };

        case 'LOGIN_START_GOOGLE':
            return {
                user: null,
                isFetching: true,
                error: false,
            };

        case 'LOGIN_SUCCESS_GOOGLE':
            localStorage.setItem('user', JSON.stringify({ ...action?.payload }));
            return {
                user: action.payload,
                isFetching: false,
                error: false,
            };

        case 'LOGIN_FAILURE_GOOGLE':
            return {
                user: null,
                isFetching: false,
                error: true,
            };

        case 'LOGOUT_GOOGLE':
            localStorage.removeItem('user');
            return {
                user: null,
                isFetching: false,
                error: false,
            };

        case 'REGISTER_START':
            return {
                user: null,
                isFetching: true,
                error: false,
            };

        case 'REGISTER_SUCCESS':
            return {
                user: action.payload,
                isFetching: false,
                error: false,
            };

        case 'REGISTER_FAILURE':
            return {
                user: null,
                isFetching: false,
                error: true,
            };
        case 'UPDATE_USER':
            const updatedUser = action.payload;
            const currentUser = state.user;

            Object.keys(updatedUser).forEach(key => {
                if (updatedUser[key]) {
                    state.user[key] = updatedUser[key];
                }
            })

            return {
                user: currentUser,
                isFetching: false,
                error: false,
            };

        default:
            return { ...state };
    }
};

export default AuthReducer;
