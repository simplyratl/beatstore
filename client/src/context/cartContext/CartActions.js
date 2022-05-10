export const cartStart = () => ({
   type: 'CART_START',
});

export const cartSuccess = (cart) => ({
   type: 'CART_SUCCESS',
   payload: cart,
});

export const cartFailure = () => ({
   type: 'CART_FAILURE',
});
