import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { AuthContextProvider } from "./context/authContext/AuthContext";
import { BeatContextProvider } from "./context/beatContext/BeatContext";
import { DarkModeContextProvider } from "./context/darkModeContext";

ReactDOM.render(
    <AuthContextProvider>
        <BeatContextProvider>
            <DarkModeContextProvider>
                <App />
            </DarkModeContextProvider>
        </BeatContextProvider>
    </AuthContextProvider>,
    document.getElementById("root")
);
