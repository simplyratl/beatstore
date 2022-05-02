import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BeatPlayProvider } from './context/BeatPlayContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <BeatPlayProvider>
            <App />
        </BeatPlayProvider>
    </React.StrictMode>
);
