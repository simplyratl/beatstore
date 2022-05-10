const CartReducers = (state, action) => {
   switch (action.type) {
       case 'CART_START':
           return {
               cart: null,
               isFetching: true,
               error: false,
           };

       case 'CART_SUCCESS':
           return {
               cart: action.payload,
               isFetching: false,
               error: false,
           };

       case 'CART_FAILURE':
           return {
               cart: null,
               isFetching: false,
               error: true,
           };

       default:
           return { ...state };
   }
};

export default CartReducers;
