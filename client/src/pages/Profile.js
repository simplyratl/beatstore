import axios from 'axios';
import React, { useContext, useEffect, useLayoutEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/authContext/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import storage from '../firebase';
import {
    ref,
    uploadBytes,
    bytesTransferred,
    totalBytes,
    getDownloadURL,
    uploadBytesResumable,
    uploadString,
} from 'firebase/storage';
import '../style/dist/profile.min.css';

const Profile = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const { user } = useContext(AuthContext);

    useLayoutEffect(() => {
        if (user === undefined || !user || location.pathname.split('/')[2] !== user.username) {
            navigate('/');
        }
    }, []);

    const [username, setUsername] = useState(user.username);
    const [email, setEmail] = useState(user.email);
    const [password, setPassword] = useState('');
    const [img, setImg] = useState('');

    const [imageUrl, setImageUrl] = useState('');

    const [notification, setNotification] = useState(false);
    const [notificationText, setNotificationText] = useState('');

    useEffect(() => {
        const uploadImage = () => {
            if (!img) {
                setTimeout(() => {
                    setNotification(false);
                    setNotificationText('');
                }, 1000);

                setNotification(true);
                setNotificationText('Error, file not found.');
                return;
            }

            const fileName = img.name;

            const storageRef = ref(storage, `images/users/${fileName}`);

            const uploadTask = uploadBytesResumable(storageRef, img);

            uploadTask.on(
                'state_changed',
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

                    setNotification(true);
                    setNotificationText(`${progress.toString()}% updating...`);

                    switch (snapshot.state) {
                        case 'paused':
                            console.log('Upload is paused');
                            break;
                        case 'running':
                            console.log('Upload is running');
                            break;
                    }
                },
                (error) => {
                    console.log('unsuccessful');
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        setImageUrl(downloadURL);
                        setNotification(false);
                        setNotificationText('');
                    });
                }
            );
        };

        uploadImage();
    }, [img]);

    const updateUser = async () => {
        setNotificationText('Updating...');
        setNotification(true);

        try {
            const passwordObject = {
                ...(password.length > 0 && { password: password }),
            };

            const profilePicObject = {
                ...(imageUrl.length > 0 && { profilePic: imageUrl }),
            };

            console.log(imageUrl);

            const res = await axios({
                method: 'PUT',
                url: `http://localhost:8800/user/${user._id}`,
                data: {
                    username: username,
                    email: email,
                    passwordObject,
                    profilePicObject,
                },
                headers: {
                    token: `Bearer ${JSON.parse(localStorage.getItem('user')).accessToken}`,
                },
            });

            setTimeout(() => {
                setNotification(false);
            }, 2500);

            setNotificationText('Profile updated succesffuly.');
            setNotification(true);

            return res;
        } catch (error) {
            setTimeout(() => {
                setNotification(false);
            }, 2500);

            setNotificationText('Updating profile failed.');
            setNotification(true);
        }
    };

    return (
        <>
            <motion.div
                className='profile-container'
                initial={{ opacity: 0, transform: 'translateY(-20%)' }}
                animate={{ opacity: 1, transform: 'translateY(0%)' }}
                exit={{ opacity: 0, transform: 'translateY(-20%)' }}
            >
                <h1>My profile</h1>
                <h4>Edit my profile</h4>

                <div className='edit-wrapper'>
                    <div className='row'>
                        <img
                            src={imageUrl.length === 0 ? user.profilePic : imageUrl}
                            className='profile-picture'
                        />

                        <input
                            type='file'
                            id='file'
                            name='file'
                            accept='image/*'
                            onChange={(e) => setImg(e.target.files[0])}
                        ></input>
                        <label htmlFor='file' className='choose-file-label'>
                            Choose a photo
                        </label>
                    </div>

                    <div className='row input'>
                        <label>Username</label>
                        <input
                            type='text'
                            defaultValue={user.username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div className='row input'>
                        <label>Email</label>
                        <input
                            type='email'
                            defaultValue={user.email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className='row input'>
                        <label>Password</label>
                        <input type='password' onChange={(e) => setPassword(e.target.value)} />
                    </div>

                    <div className='row'>
                        <button type='button' style={{ margin: 0 }} onClick={() => updateUser()}>
                            Save changes
                        </button>
                    </div>
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
        </>
    );
};

export default Profile;
