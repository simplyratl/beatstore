import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { cartAdd, cartDelete, cartDeleteAll } from './CartActions';

export const addToCart = (item, dispatch) => {
    dispatch(cartAdd(item));
};

export const removeFromCart = (item, dispatch) => {
    dispatch(cartDelete(item));
};

export const removeAllCart = (dispatch) => {
    dispatch(cartDeleteAll());
}