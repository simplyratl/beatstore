import React, { useState } from 'react';
import { HiOutlineMail } from 'react-icons/hi';
import { AiOutlineInstagram, AiOutlineFacebook, AiOutlineTwitter } from 'react-icons/ai';
import { motion, AnimatePresence } from 'framer-motion';
import emailjs from '@emailjs/browser';
import '../style/dist/contact.min.css';

const Contact = (e) => {
    const [notificationText, setNotificationText] = useState('');
    const [notification, setNotification] = useState(false);

    const sendEmail = (e) => {
        e.preventDefault();
        setNotificationText('Sending...');
        setNotification(true);

        emailjs.sendForm('service_gde2yr4', 'template_jpg9cbb', e.target, 'DpNsu2ce7T4UzYt7Y').then(
            (result) => {
                setTimeout(() => {
                    setNotification(false);
                }, 2500);

                setNotificationText('The messsage has been sent successfuly.');
                setNotification(true);
            },
            (error) => {
                setTimeout(() => {
                    setNotification(false);
                }, 2500);

                setNotificationText('The message was not sent.');
                setNotification(true);
            }
        );
    };

    return (
        <>
            <AnimatePresence>
                <motion.div className='contact-container' initial={{ opacity: 0, transform: 'translateY(-20%)' }} animate={{ opacity: 1, transform: 'translateY(0%)' }} exit={{ opacity: 0, transform: 'translateY(-20%)' }}>
                    <div className='contact-wrapper'>
                        <div className='left'>
                            <h1>Contact me.</h1>

                            <span className='desc'>
                                Fill up the form and ask question about anything you want to know about bying
                                beats on this site.
                            </span>

                            <a href='mailto: ratlbeatz@gmail.com' className='email'>
                                <HiOutlineMail className='icon' />
                                ratlbeatz@gmail.com
                            </a>

                            <div className='social-media'>
                                <a href='#'>
                                    <AiOutlineInstagram className='icon' />
                                </a>
                                <a href='#'>
                                    <AiOutlineTwitter className='icon' />
                                </a>
                                <a href='#'>
                                    <AiOutlineFacebook className='icon' />
                                </a>
                            </div>
                        </div>

                        <form onSubmit={sendEmail}>
                            <div className='row'>
                                <label>Your name</label>
                                <input type='text' name='name' autoComplete='off' />
                            </div>

                            <div className='row'>
                                <label>Email</label>
                                <input type='email' name='email' autoComplete='off' />
                            </div>

                            <div className='row'>
                                <label>Message</label>
                                <textarea cols='30' rows='10' name='message'></textarea>
                            </div>

                            <div className='row'>
                                <button>Send Message</button>
                            </div>
                        </form>
                    </div>
                </motion.div>

                <AnimatePresence>
                    {notification && (
                        <motion.div
                            className='notification-container'
                            initial={{ opacity: 0, bottom: 0 }}
                            animate={{ opacity: 1, bottom: 100 }}
                            exit={{ opacity: 0, bottom: 0 }}
                        >
                            <span>{notificationText}</span>
                        </motion.div>
                    )}
                </AnimatePresence>
            </AnimatePresence>
        </>
    );
};

export default Contact;
