export const loginStart = () => ({
   type: 'LOGIN_START',
});

export const loginSuccess = (user) => ({
   type: 'LOGIN_SUCCESS',
   payload: user,
});

export const loginFailure = () => ({
   type: 'LOGIN_FAILURE',
});

export const logoutStart = () => ({
   type: 'LOGOUT',
});

export const loginStartGoogle = () => ({
   type: 'LOGIN_START_GOOGLE',
});

export const loginSuccessGoogle = (user) => ({
   type: 'LOGIN_SUCCESS_GOOGLE',
   payload: user,
});

export const loginFailureGoogle = () => ({
   type: 'LOGIN_FAILURE_GOOGLE',
});

export const logoutGoogle = () => ({
   type: 'LOGOUT_GOOGLE',
});

export const registerStart = () => ({
   type: 'REGISTER_START',
});

export const registerSuccess = (user) => ({
   type: 'REGISTER_SUCCESS',
   payload: user,
});

export const registerFailure = () => ({
   type: 'REGISTER_FAILURE',
});

export const updateUser = (user) => ({
   type: 'UPDATE_USER',
   payload: user,
});