import React, { useContext, useEffect, useState } from "react";
// import { GoogleLogin } from "react-google-login";
// import { FcGoogle } from "react-icons/fc";
// import { gapi } from "gapi-script";
import "../style/dist/login.min.css";
import { login, loginGoogle } from "../context/authContext/apiCalls";
import { AuthContext } from "../context/authContext/AuthContext";
import ForgottenPassword from "../components/ForgottenPassword";
import { motion } from "framer-motion";
import { IoIosArrowBack } from "react-icons/io";
import { Link, useLocation } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorDisplay, setErrorDisplay] = useState("");
    const [forgotPasswordModal, setForgotPasswordModal] = useState(false);

    const { isFetching, dispatch } = useContext(AuthContext);

    const location = useLocation();

    // useEffect(() => {
    //     const start = () => {
    //         const clientID = "677222132956-7bc9o1s3vkt87bvh6iiurq6460tasrmk.apps.googleusercontent.com";

    //         gapi.client.init({
    //             client: clientID,
    //             scope: "",
    //         });
    //     };

    //     gapi.load("client:auth2", start);
    // }, []);

    // const googleSuccess = (res) => {
    //     const result = res?.profileObj;
    //     const token = res?.tokenId;

    //     loginGoogle({ result, token }, dispatch);
    // };

    // const googleFailure = (error) => {
    //     console.log(error);
    // };

    const handleLogin = (e) => {
        login({ email, password }, dispatch, setErrorDisplay, location.state.url);
    };

    const openForgotModal = () => {};

    return (
        <motion.div
            className="login-container"
            initial={{ opacity: 0, transform: "translateY(-20%)" }}
            animate={{ opacity: 1, transform: "translateY(0%)" }}
            exit={{ opacity: 0, transform: "translateY(-20%)" }}
        >
            <Link to="/">
                <IoIosArrowBack className="go-back" />
            </Link>

            <form>
                <div className="logo-container">
                    <img src={require("../assets/images/logo_small.png")} className="logo" />
                </div>

                <h1 style={{ textAlign: "center" }}>Login</h1>

                <div className="row">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        name="email"
                        autoComplete="off"
                        placeholder="Your email"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <div className="row">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        name="password"
                        autoComplete="off"
                        placeholder="Your password"
                        onChange={(e) => setPassword(e.target.value)}
                        onKeyPress={(e) => {
                            e.key === "Enter" && handleLogin();
                        }}
                    />
                </div>

                <span style={{ margin: "6px 0 10px 0" }}>{errorDisplay}</span>

                <button type="button" onClick={handleLogin} disabled={isFetching}>
                    Login
                </button>

                {/* <GoogleLogin
                    clientId="677222132956-7bc9o1s3vkt87bvh6iiurq6460tasrmk.apps.googleusercontent.com"
                    render={(renderProps) => (
                        <button
                            className="google-login"
                            type="button"
                            onClick={renderProps.onClick}
                            disabled={renderProps.disabled}
                        >
                            <FcGoogle className="google-icon" /> Google Sign In
                        </button>
                    )}
                    onSuccess={googleSuccess}
                    onFailure={googleFailure}
                    cookiePolicy="single_host_origin"
                /> */}

                <span className="forgot-password" onClick={() => setForgotPasswordModal(true)}>
                    Forgot your password?
                </span>
            </form>

            <div className="forgot-password">
                {forgotPasswordModal && <ForgottenPassword close={setForgotPasswordModal} />}
            </div>
        </motion.div>
    );
};

export default Login;
