import React, { useContext, useEffect, useRef, useState } from "react";
import Checkbox from "@mui/material/Checkbox";
import { AiOutlineStop } from "react-icons/ai";
import { BsCheck2Circle } from "react-icons/bs";
import { register } from "../../context/authContext/apiCalls";
import { AuthContext } from "../../context/authContext/AuthContext";
import zxcvbn from "zxcvbn";
import { motion } from "framer-motion";
import "../../style/dist/registerform.min.css";
import { IoIosArrowBack } from "react-icons/io";
import { Link } from "react-router-dom";

const RegisterForm = () => {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errorDisplay, setErrorDisplay] = useState("");
    const [passwordCorrect, setPasswordCorrect] = useState(false);
    const [colorProgress, setColorProgress] = useState("red");
    const [checkbox, setCheckbox] = useState(false);
    const [success, setSuccess] = useState(false);

    const { isFetching, dispatch } = useContext(AuthContext);

    const testPassword = zxcvbn(password);

    const calculatePassScore = testPassword.score * 100;

    useEffect(() => {
        if (password.length >= 8) {
            setPasswordCorrect(true);
        } else {
            setPasswordCorrect(false);
        }
    }, [password]);

    useEffect(() => {
        if (calculatePassScore / 4 <= 30) {
            setColorProgress("red");
        } else if (calculatePassScore / 4 >= 30 && calculatePassScore / 4 <= 60) {
            setColorProgress("orange");
        } else {
            setColorProgress("green");
        }
    }, [password]);

    const handleRegister = (e) => {
        e.preventDefault();

        if (!email.includes("@")) {
            setErrorDisplay("You need to provide valid email.");
            return;
        }

        if (password !== confirmPassword) {
            setErrorDisplay("Passwords don't match.");
            return;
        }

        if (!checkbox) {
            setErrorDisplay("You must agree with Terms & Services.");
            return;
        }

        register({ username, email, password }, dispatch, setErrorDisplay, setSuccess);
    };

    return (
        <motion.div
            className="register-container"
            initial={{ opacity: 0, transform: "translateY(-20%)" }}
            animate={{ opacity: 1, transform: "translateY(0%)" }}
            exit={{ opacity: 0, transform: "translateY(-20%)" }}
        >
            <Link to="/">
                <IoIosArrowBack className="go-back" />
            </Link>

            <div className="register-wrapper">
                <form action="">
                    <div className="logo-container">
                        <img src={require("../../assets/images/logo_small.png")} className="logo" />
                    </div>

                    <h1 style={{ textAlign: "center" }}>Sign up</h1>

                    <div className="row">
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            name="username"
                            autoComplete="off"
                            placeholder="Set username for your profile"
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>

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
                            placeholder="Your password"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <div className="row">
                        <span className="validate-password">
                            Password must be at least 8 characters long.
                            {passwordCorrect ? (
                                <BsCheck2Circle className="icon success" />
                            ) : (
                                <AiOutlineStop className="icon fail" />
                            )}
                        </span>
                    </div>

                    <div className="row">
                        <span className="password-strength">
                            <span
                                className="progress"
                                style={{ width: calculatePassScore, background: colorProgress }}
                            ></span>
                        </span>
                        {colorProgress === "red" && <p>Weak</p>}
                        {colorProgress === "orange" && <p>Okay</p>}
                        {colorProgress === "green" && <p>Strong</p>}
                    </div>

                    <div className="row">
                        <label htmlFor="confirmPassword">Confirm Password</label>
                        <input
                            type="password"
                            name="confirmPassword"
                            placeholder="Confirm your password"
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </div>

                    <label className="terms-of-service">
                        <Checkbox
                            inputProps={{
                                "aria-label": "Terms and Services",
                            }}
                            sx={{
                                position: "relative",
                                top: -8,
                                marginRight: 0.6,
                                color: "#fcc201",
                            }}
                            size="small"
                            checked={checkbox}
                            onChange={(e) => setCheckbox(e.target.checked)}
                        />
                        <span>
                            I have read and agree to the <a href="#">Terms of service</a> &{" "}
                            <a href="#">Privacy Policy.</a>
                        </span>
                    </label>

                    <button type="button" onClick={handleRegister} disabled={isFetching}>
                        Sign up
                    </button>
                    <span>{errorDisplay}</span>
                </form>
            </div>

            {success && (
                <motion.div
                    className="register-success"
                    initial={{ bottom: "-100px" }}
                    animate={{ bottom: "1em" }}
                    exit={{ bottom: "-100px" }}
                >
                    <h3>Registered successfuly, redirecting to login page.</h3>
                </motion.div>
            )}
        </motion.div>
    );
};

export default RegisterForm;
