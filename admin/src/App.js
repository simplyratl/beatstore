import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import List from "./pages/list/List";
import ListBeats from "./pages/listbeats/ListBeats";
import Single from "./pages/single/Single";
import New from "./pages/new/New";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { productInputs, userInputs } from "./formSource";
import "./style/dark.scss";
import { useContext, useEffect } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import AddProduct from "./pages/add/AddProduct";
import { AuthContext } from "./context/authContext/AuthContext";
import { logoutStart } from "./context/authContext/apiCalls";

function App() {
    const { darkMode } = useContext(DarkModeContext);
    const { user, dispatch } = useContext(AuthContext);

    const checkLoggedIn = (component) => {
        return user ? component : <Navigate to="/login" />;
    };

    const parseJWT = (token) => {
        try {
            return JSON.parse(atob(token.split(".")[1]));
        } catch (error) {
            return null;
        }
    };

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));

        if (user) {
            const decodeJWT = parseJWT(user.accessToken);
            if (decodeJWT.exp * 1000 < Date.now()) {
                logoutStart(dispatch);
            }
        }
    }, []);

    return (
        <div className={darkMode ? "app dark" : "app"}>
            <BrowserRouter>
                <Routes>
                    <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
                    <Route exact path="/" element={checkLoggedIn(<Home />)} />
                    <Route exact path="/login" element={<Login />} />

                    <Route path="/">
                        <Route path="users">
                            <Route index element={<List />} />
                            <Route path=":userId" element={<Single />} />
                            <Route path="new" element={<New inputs={userInputs} title="Add New User" />} />
                        </Route>
                        <Route path="products">
                            <Route index element={<ListBeats />} />
                            <Route path=":productId" element={<Single />} />
                            <Route
                                path="new"
                                element={<New inputs={productInputs} title="Add New Product" />}
                            />
                        </Route>
                        <Route path="add" element={<AddProduct />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
