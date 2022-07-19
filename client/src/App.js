import React, { useContext, useEffect, useState } from "react";
import { BrowserRouter as Router, Outlet, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import AudioPlayer from "./components/AudioPlayer";
import Beats from "./pages/Beats";
import Register from "./pages/Register";
import CategoryPage from "./pages/CategoryPage";
import BeatSingle from "./pages/BeatSingle";
import Login from "./pages/Login";
import { Context } from "./context/Context";
import Checkout from "./pages/Checkout";
import BoughtPage from "./pages/BoughtPage";
import Contact from "./pages/Contact";
import SearchPage from "./pages/SearchPage";
import Profile from "./pages/Profile";
import Loading from "./components/Loading";
import { AnimatePresence } from "framer-motion";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import { AuthContext } from "./context/authContext/AuthContext";
import { logoutStart } from "./context/authContext/AuthActions";

const Defaults = () => {
    const { currentBeat } = useContext(Context);

    return (
        <>
            <Navbar />
            {currentBeat && (
                <AnimatePresence>
                    <AudioPlayer />
                </AnimatePresence>
            )}

            <Outlet />
        </>
    );
};

function App() {
    const { user, setUser } = useContext(Context);
    const { dispatch } = useContext(AuthContext);
    const [loading, setLoading] = useState(true);
    const [finished, setFinished] = useState(false);

    useEffect(() => {
        const onPageLoad = () => {
            setFinished(true);

            setTimeout(() => {
                setLoading(false);
            }, 2000);
        };

        if (document.readyState === "complete") {
            onPageLoad();
        } else {
            window.addEventListener("load", onPageLoad);
            return () => window.removeEventListener("load", onPageLoad);
        }
    }, []);

    useEffect(() => {
        if (loading) document.body.style.overflow = "hidden";
        else {
            document.body.style.overflowX = "hidden";
            document.body.style.overflowY = "visible";
        }
    }, [loading]);

    useEffect(() => {
        const parseJWT = (token) => {
            try {
                return JSON.parse(atob(token.split(".")[1]));
            } catch (error) {
                return null;
            }
        };

        if (user) {
            const decodeJWT = parseJWT(user.accessToken);
            if (decodeJWT.exp * 1000 < Date.now()) {
                logoutStart(dispatch);
            }
        }
    }, []);

    return (
        <Router>
            {loading && <Loading finished={finished} />}

            <Routes>
                <Route element={<Defaults />}>
                    <Route exact path="/" element={<Home />} />
                </Route>
                <Route element={<Defaults />}>
                    <Route path="/beats" element={<Beats />} />
                </Route>
                <Route element={<Defaults />}>
                    <Route path="/category/:category" element={<CategoryPage />} />
                </Route>
                <Route element={<Defaults />}>
                    <Route path="/beat/:name/:id" element={<BeatSingle />} />
                </Route>
                <Route element={<Defaults />}>
                    <Route path="/checkout" element={<Checkout />} />
                </Route>
                <Route element={<Defaults />}>
                    <Route path="/checkout/:id" element={<BoughtPage />} />
                </Route>
                <Route element={<Defaults />}>
                    <Route path="/search/:query" element={<SearchPage />} />
                </Route>
                <Route element={<Defaults />}>
                    <Route path="/contact" element={<Contact />} />
                </Route>
                <Route element={<Defaults />}>
                    <Route path="/profile/:username" element={<Profile />} />
                </Route>
                <Route element={<Defaults />}>
                    <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                </Route>
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
            </Routes>
        </Router>
    );
}

export default App;
