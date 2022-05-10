import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BeatPlayProvider } from './context/Context';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import { reducers } from './context/redux/reducers';
import { AuthContextProvider } from './context/authContext/AuthContext';
import { CartContextProvider } from './context/cartContext/CartContext';

const store = createStore(reducers, compose(applyMiddleware(thunk)));

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <React.StrictMode>
        <Provider store={store}>
            <AuthContextProvider>
                <BeatPlayProvider>
                    {/* <CartContextProvider> */}
                        <App />
                    {/* </CartContextProvider> */}
                </BeatPlayProvider>
            </AuthContextProvider>
        </Provider>
    </React.StrictMode>
);
