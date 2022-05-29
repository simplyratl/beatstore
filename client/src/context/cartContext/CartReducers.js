const CartReducers = (state, action) => {
    switch (action.type) {
        case 'CART_ADD':
            return {
                ...state,
                cart: [...state.cart, { ...action.payload }],
            };

        case 'CART_DELETE':
            return {
                ...state,
                cart: state.cart.filter((item) => item._id !== action.payload._id),
            };

        case 'CART_DELETE_ALL':
            return {
                ...state,
                cart: [],
            };

        default:
            return state;
    }
};

export default CartReducers;
