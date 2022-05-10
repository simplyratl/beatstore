import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { cartFailure, cartStart, cartSuccess } from './CartActions';

export const addCart = (cart, dispatch) => {
    dispatch(cartStart());

    
    try {
        dispatch(cartSuccess(cart));
        
    } catch (error) {
        dispatch(cartFailure());
    }
};
