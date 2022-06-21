import React, { useContext, useEffect, useState } from "react";
import { GoogleLogin } from "react-google-login";
import { FcGoogle } from "react-icons/fc";
import { gapi } from "gapi-script";
// import { useDispatch } from 'react-redux';
import "../style/dist/login.min.css";
import { useNavigate } from "react-router-dom";
import { login, loginGoogle } from "../context/authContext/apiCalls";
import { AuthContext } from "../context/authContext/AuthContext";
import ForgottenPassword from "../components/ForgottenPassword";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorDisplay, setErrorDisplay] = useState("");
    const [forgotPasswordModal, setForgotPasswordModal] = useState(false);

    const { isFetching, dispatch } = useContext(AuthContext);

    // const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        const start = () => {
            const clientID = "677222132956-7bc9o1s3vkt87bvh6iiurq6460tasrmk.apps.googleusercontent.com";

            gapi.client.init({
                client: clientID,
                scope: "",
            });
        };

        gapi.load("client:auth2", start);
    }, []);

    const googleSuccess = (res) => {
        const result = res?.profileObj;
        const token = res?.tokenId;

        loginGoogle({ result, token }, dispatch);
    };

    const googleFailure = (error) => {
        console.log(error);
    };

    const handleLogin = (e) => {
        login({ email, password }, dispatch, setErrorDisplay);
    };

    const openForgotModal = () => {};

    return (
        <div className="login-container">
            <form>
                <div className="logo-container">
                    <img src={require("../assets/images/logo transparent.png")} className="logo" />
                </div>

                <h1 style={{ textAlign: "center" }}>Login</h1>

                <div className="row">
                    <label htmlFor="email">Email</label>
                    <input
                        type="text"
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

                <GoogleLogin
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
                />

                <span className="forgot-password" onClick={() => setForgotPasswordModal(true)}>
                    You forgot your password?
                </span>
            </form>

            <div className="forgot-password">
                {forgotPasswordModal && <ForgottenPassword close={setForgotPasswordModal} />}
            </div>
        </div>
    );
};

export default Login;
