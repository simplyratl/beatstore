import React, { useState } from "react";
import { HiOutlineMail } from "react-icons/hi";
import { AiOutlineInstagram, AiOutlineFacebook, AiOutlineTwitter } from "react-icons/ai";
import { motion, AnimatePresence } from "framer-motion";
import emailjs from "@emailjs/browser";
import "../style/dist/contact.min.css";

const Contact = (e) => {
    const [notificationText, setNotificationText] = useState("");
    const [notification, setNotification] = useState(false);
    const [lock, setLock] = useState(false);
    const [counterSent, setCounterSent] = useState(0);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    const sendEmail = (e) => {
        e.preventDefault();
        setNotificationText("Sending...");
        setNotification(true);

        console.log(counterSent);

        if (counterSent === 3) {
            setLock(true);

            setTimeout(() => {
                setNotification(false);
            }, 2500);

            setNotificationText("Can't send more than 3 messages a day.");
            setNotification(true);

            return;
        }

        if (name.length === 0 || email.length === 0 || message.length === 0) {
            setTimeout(() => {
                setNotification(false);
            }, 2500);

            setNotificationText("You have to write credientals to send the message.");
            setNotification(true);
            return;
        }

        emailjs.sendForm("service_gde2yr4", "template_jpg9cbb", e.target, "DpNsu2ce7T4UzYt7Y").then(
            (result) => {
                setTimeout(() => {
                    setNotification(false);
                }, 2500);

                setNotificationText("The messsage has been sent successfuly.");
                setNotification(true);
                setCounterSent(counterSent + 1);
            },
            (error) => {
                setTimeout(() => {
                    setNotification(false);
                }, 2500);

                setNotificationText("The message was not sent.");
                setNotification(true);
            }
        );
    };

    return (
        <>
            <AnimatePresence>
                <motion.div
                    className="contact-container"
                    initial={{ opacity: 0, transform: "translateY(-20%)" }}
                    animate={{ opacity: 1, transform: "translateY(0%)" }}
                    exit={{ opacity: 0, transform: "translateY(-20%)" }}
                >
                    <div className="contact-wrapper">
                        <div className="left">
                            <h1>Contact me.</h1>

                            <span className="desc">
                                Fill up the form and ask question about anything you want to know about bying
                                beats on this site.
                            </span>

                            <a href="mailto: ratlbeatz@gmail.com" className="email">
                                <HiOutlineMail className="icon" />
                                ratlbeatz@gmail.com
                            </a>

                            <div className="social-media">
                                <a href="#">
                                    <AiOutlineInstagram className="icon" />
                                </a>
                                <a href="#">
                                    <AiOutlineTwitter className="icon" />
                                </a>
                                <a href="#">
                                    <AiOutlineFacebook className="icon" />
                                </a>
                            </div>
                        </div>

                        <form onSubmit={sendEmail}>
                            <div className="row">
                                <label>Your name</label>
                                <input
                                    type="text"
                                    name="name"
                                    autoComplete="off"
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>

                            <div className="row">
                                <label>Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    autoComplete="off"
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>

                            <div className="row">
                                <label>Message</label>
                                <textarea
                                    cols="30"
                                    rows="10"
                                    name="message"
                                    onChange={(e) => setMessage(e.target.value)}
                                ></textarea>
                            </div>

                            <div className="row">
                                <button disabled={lock}>Send Message</button>
                            </div>
                        </form>
                    </div>
                </motion.div>
            </AnimatePresence>

            <AnimatePresence>
                {notification && (
                    <motion.div
                        className="notification-container"
                        initial={{ opacity: 0, bottom: 0 }}
                        animate={{ opacity: 1, bottom: 100 }}
                        exit={{ opacity: 0, bottom: 0 }}
                    >
                        <span>{notificationText}</span>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Contact;
