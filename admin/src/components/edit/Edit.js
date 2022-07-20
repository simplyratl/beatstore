import React, { useState } from "react";
import { IoCloseSharp } from "react-icons/io5";
import { HiPhotograph } from "react-icons/hi";
import "./edit.scss";
import axios from "axios";

const Edit = ({ setOpened, beat }) => {
    const [beatState, setBeatState] = useState(null);
    const [title, setTitle] = useState(beat?.title);
    const [tags, setTags] = useState(beat?.tags);
    const [img, setImg] = useState(beat?.img);
    const [imageUrl, setImageUrl] = useState("");
    const [bpm, setBpm] = useState(beat?.bpm);
    const [key, setKey] = useState(beat?.key);
    const [primary_mood, setPrimary_Mood] = useState(beat?.primary_mood);
    const [secondary_mood, setSecondary_Mood] = useState(beat?.secondary_mood);
    const [mp3_tagged, setmp3_tagged] = useState(beat?.mp3_tagged);
    const [waw_untagged, setWaw_untagged] = useState(beat?.waw_untagged);
    const [stems, setStems] = useState(beat?.stems);
    const [basic_price, setBasic_Price] = useState(beat?.basic_licence);
    const [premium_price, setPremium_Price] = useState(beat?.premium_licence);
    const [vip_price, setVip_Price] = useState(beat?.vip_licence);

    const [notification, setNotification] = useState(false);
    const [notificationText, setNotificationText] = useState("");

    const updateBeat = async () => {
        setNotificationText("Updating...");
        setNotification(true);

        try {
            const res = await axios({
                method: "PUT",
                url: `https://elegant-mandarine-91231.herokuapp.com/beat/${beat._id}`,
                data: {
                    title: title,
                    tags: tags,
                    bpm: bpm,
                    key: key,
                    primary_mood: primary_mood,
                    secondary_mood: secondary_mood,
                    basic_licence: basic_price,
                    premium_licence: premium_price,
                    vip_licence: vip_price,
                },
                headers: {
                    token: `Bearer ${JSON.parse(localStorage.getItem("user")).accessToken}`,
                },
            });

            setTimeout(() => {
                setNotification(false);
            }, 2500);

            setNotificationText("Beat updated succesffuly.");
            setNotification(true);

            return res;
        } catch (error) {
            setTimeout(() => {
                setNotification(false);
            }, 2500);

            setNotificationText("Updating profile failed.");
            setNotification(true);
        }
    };

    return (
        <div className="edit-container">
            <div className="edit-wrapper">
                <div className="top-bar">
                    <div className="image">
                        <img src={beat?.img} alt="" />

                        <HiPhotograph className="photo" />
                    </div>
                    <h1>{beat?.title}</h1>
                </div>

                <div className="edit-inputs">
                    <div className="row">
                        <h4>TITLE</h4>
                        <input
                            type="text"
                            name="title"
                            autoComplete="off"
                            defaultValue={beat?.title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>
                    <div className="row">
                        <h4>TAGS (5)</h4>
                        <input
                            type="text"
                            name="tags"
                            autoComplete="off"
                            defaultValue={beat?.tags.join(", ")}
                            onChange={(e) => setTags(e.target.value)}
                        />
                    </div>

                    <div className="row">
                        <h4>BPM</h4>
                        <input
                            type="text"
                            name="bpm"
                            autoComplete="off"
                            defaultValue={beat?.bpm}
                            onChange={(e) => setBpm(e.target.value)}
                        />
                    </div>
                    <div className="row">
                        <h4>KEY</h4>
                        <input
                            type="text"
                            name="key"
                            autoComplete="off"
                            defaultValue={beat?.key}
                            onChange={(e) => setKey(e.target.value)}
                        />
                    </div>

                    <div className="row">
                        <h4>Primary Mood</h4>
                        <input
                            type="text"
                            name="primary_mood"
                            autoComplete="off"
                            defaultValue={beat?.primary_mood}
                            onChange={(e) => setPrimary_Mood(e.target.value)}
                        />
                    </div>

                    <div className="row">
                        <h4>Secondary Mood</h4>
                        <input
                            type="text"
                            name="secondary_mood"
                            autoComplete="off"
                            defaultValue={beat?.secondary_mood}
                            onChange={(e) => setSecondary_Mood(e.target.value)}
                        />
                    </div>
                    <div className="row">
                        <h4>Basic Price</h4>
                        <input
                            type="text"
                            name="basic_price"
                            autoComplete="off"
                            defaultValue={beat?.basic_licence}
                            onChange={(e) => setBasic_Price(e.target.value)}
                        />
                    </div>

                    <div className="row">
                        <h4>Premium Price</h4>
                        <input
                            type="text"
                            name="premium_price"
                            autoComplete="off"
                            defaultValue={beat?.premium_licence}
                            onChange={(e) => setPremium_Price(e.target.value)}
                        />
                    </div>

                    <div className="row">
                        <h4>VIP Price</h4>
                        <input
                            type="text"
                            name="vip_price"
                            autoComplete="off"
                            defaultValue={beat?.vip_licence}
                            onChange={(e) => setVip_Price(e.target.value)}
                        />
                    </div>

                    <div className="row">
                        <button type="button" onClick={() => updateBeat()}>
                            Update
                        </button>
                    </div>
                </div>

                <span className="close" onClick={() => setOpened(false)}>
                    <IoCloseSharp />
                </span>
            </div>

            {notification && (
                <div className="notification-container">
                    <span>{notificationText}</span>
                </div>
            )}
        </div>
    );
};

export default Edit;
