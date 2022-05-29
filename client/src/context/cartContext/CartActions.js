export const cartAdd = (cart) => ({
   type: 'CART_ADD',
   payload: cart,
});

export const cartDelete = (cart) => ({
   type: 'CART_DELETE',
   payload: cart,
});

export const cartDeleteAll = () => ({
   type: 'CART_DELETE_ALL',
});
