import React, { useContext, useEffect, useState } from 'react';
import storage from '../../firebase';
import {
    ref,
    uploadBytes,
    bytesTransferred,
    totalBytes,
    getDownloadURL,
    uploadBytesResumable,
} from 'firebase/storage';
import { v4 } from 'uuid';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import { BeatContext } from '../../context/beatContext/BeatContext';
import 'react-circular-progressbar/dist/styles.css';

import './addform.scss';
import { createBeat } from '../../context/beatContext/apiCalls';

const AddForm = () => {
    const [beat, setBeat] = useState(null);
    const [title, setTitle] = useState(null);
    const [tags, setTags] = useState(null);
    const [img, setImg] = useState(null);
    const [imageUrl, setImageUrl] = useState('');
    const [bpm, setBpm] = useState(null);
    const [key, setKey] = useState(null);
    const [primary_mood, setPrimary_Mood] = useState(null);
    const [secondary_mood, setSecondary_Mood] = useState(null);
    const [mp3_tagged, setmp3_tagged] = useState(null);
    const [waw_untagged, setWaw_untagged] = useState(null);
    const [stems, setStems] = useState(null);
    const [uploaded, setUploaded] = useState(1);
    const [showImageBtn, setShowImageBtn] = useState();
    const [uploadPercent, setUploadPercent] = useState(50);
    const [uploadLoading, setUploadLoading] = useState(false);

    const [status, setStatus] = useState('');

    const { dispatch } = useContext(BeatContext);

    const handleChange = (e) => {
        const value = e.target.value;

        setBeat({ ...beat, [e.target.name]: value });
    };

    const getTags = () => {
        if (tags) {
            let array = tags.split(',');

            setBeat((prev) => {
                return { ...prev, ['tags']: array };
            });
        }
    };

    useEffect(() => {
        if (tags) {
            getTags();
        }
    }, [tags]);

    const uploadImage = (e) => {
        const fileName = `${img.name.split(' ').join('_')}-(${v4()})`;

        const storageRef = ref(storage, `images/${fileName}`);

        const uploadTask = uploadBytesResumable(storageRef, img);

        uploadTask.on(
            'state_changed',
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setUploadLoading(true);
                if (uploadPercent < parseInt(progress)) {
                    setUploadPercent(parseInt(progress));
                }
                switch (snapshot.state) {
                    case 'paused':
                        console.log('Upload is paused');
                        break;
                    case 'running':
                        // console.log('Upload is running');
                        break;
                }
            },
            (error) => {
                console.log('unsuccessful');
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    setBeat((prev) => {
                        return { ...prev, ['img']: downloadURL };
                    });
                    setImageUrl(downloadURL);
                    setUploadLoading(false);
                });
            }
        );
    };

    const upload = (items) => {
        items.forEach((item) => {
            const fileName = `${item.file?.name.split(' ').join('_')}-(${item.label})`;

            const storageRef = ref(storage, `items/${fileName + v4()}`);

            const uploadTask = uploadBytesResumable(storageRef, item.file);

            uploadTask.on(
                'state_changed',
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    setUploadLoading(true);
                    if (uploadPercent < parseInt(progress)) {
                        setUploadPercent(parseInt(progress));
                    }
                    switch (snapshot.state) {
                        case 'paused':
                            console.log('Upload is paused');
                            break;
                        case 'running':
                            // console.log('Upload is running');
                            break;
                    }
                },
                (error) => {
                    console.log('unsuccessful');
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        // console.log('File available at ' + downloadURL);

                        setBeat((prev) => {
                            return { ...prev, [item.label]: downloadURL };
                        });
                        setUploaded((prev) => prev + 1);
                        setUploadLoading(false);

                        setTimeout(() => {
                            setStatus('Beats uploaded to server successfuly.');
                        }, [2000]);

                        setStatus('');
                    });
                }
            );
        });
    };

    const handleUpload = (e) => {
        e.preventDefault();

        if (!img || !mp3_tagged || !waw_untagged) {
            alert('Morate dodati svako polje za upload.');
            return;
        }

        upload([
            { file: mp3_tagged, label: 'mp3_tagged' },
            { file: waw_untagged, label: 'waw_untagged' },
            { file: stems ? stems : null, label: 'stems' },
        ]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        createBeat(beat, dispatch, setStatus);
    };

    return (
        <>
            <div className='form-container-upper'>
                <form>
                    <h1 style={{ margin: '1.6rem 0' }}>Add Beat</h1>

                    <div className='row'>
                        <h4>TITLE*</h4>
                        <input type='text' name='title' autoComplete='off' onChange={handleChange} />
                    </div>
                    <div className='row'>
                        <h4>TAGS* (5)</h4>
                        <input
                            type='text'
                            name='tags'
                            autoComplete='off'
                            onChange={(e) => setTags(e.target.value)}
                        />
                    </div>
                    <div className='row'>
                        <div className='tags'>
                            <div className='tag'>jack harlow</div>
                            <div className='tag'>jack harlow</div>
                        </div>
                    </div>

                    <div className='row'>
                        <h4>BPM*</h4>
                        <input type='text' name='bpm' autoComplete='off' onChange={handleChange} />
                    </div>
                    <div className='row'>
                        <h4>KEY*</h4>
                        <input type='text' name='key' autoComplete='off' onChange={handleChange} />
                    </div>

                    <div className='row'>
                        <h4>Primary Mood*</h4>
                        <input type='text' name='primary_mood' autoComplete='off' onChange={handleChange} />
                    </div>

                    <div className='row'>
                        <h4>Secondary Mood*</h4>
                        <input type='text' name='secondary_mood' autoComplete='off' onChange={handleChange} />
                    </div>

                    <div className='row'>
                        <div className='upload-beats'>
                            <div className='artwork-container'>
                                {imageUrl && <img src={imageUrl} className='artwork' />}
                            </div>
                            <small>Preferred: 1000x1000px, Minimum: 500x500px</small>

                            <input
                                type='file'
                                className='btn'
                                placeholder='Upload Picture'
                                onChange={(e) => setImg(e.target.files[0])}
                            />

                            {img &&
                                (imageUrl.length < 3 ? (
                                    <button type='button' onClick={uploadImage}>
                                        Upload Picture
                                    </button>
                                ) : null)}

                            {imageUrl.length > 3 && <span>Image added.</span>}
                        </div>
                    </div>

                    <h2>Add Audio Files</h2>

                    <div className='row'>
                        <h4>Tagged Beat</h4>
                        <input
                            type='file'
                            className='btn'
                            name='tagged_mp3'
                            placeholder='Tagged MP3'
                            onChange={(e) => setmp3_tagged(e.target.files[0])}
                        />
                    </div>
                    <div className='row'>
                        <h4>Untagged Waw</h4>
                        <input
                            type='file'
                            className='btn'
                            name='untagged_waw'
                            placeholder='Un-Tagged WAW'
                            onChange={(e) => setWaw_untagged(e.target.files[0])}
                        />
                    </div>
                    <div className='row'>
                        <h4>Track Stems</h4>
                        <input
                            type='file'
                            className='btn'
                            name='stems'
                            placeholder='Stems'
                            onChange={handleChange}
                        />
                    </div>

                    <div className='row' style={{ marginTop: 48 }}>
                        <h4>BASIC LICENCE*</h4>
                        <input
                            type='number'
                            name='basic_licence'
                            placeholder='Basic Licence'
                            autoComplete='off'
                            onChange={handleChange}
                        />
                        <h4>PREMIUM LICENCE*</h4>
                        <input
                            type='number'
                            name='premium_licence'
                            placeholder='Premium Licence'
                            autoComplete='off'
                            onChange={handleChange}
                        />
                        <h4>STEMS</h4>
                        <input
                            type='number'
                            name='stem_licence'
                            placeholder='Stems'
                            autoComplete='off'
                            onChange={handleChange}
                        />
                    </div>

                    <div className='status'>
                        <span style={{ fontSize: '1.4rem', margin: '14px 0', display: 'block' }}>
                            {status}
                        </span>
                    </div>

                    {uploaded >= 4 ? (
                        <button type='button' onClick={handleSubmit} className='btn-primary'>
                            Add Beat
                        </button>
                    ) : (
                        <button type='button' onClick={handleUpload} className='btn-primary'>
                            Upload
                        </button>
                    )}
                </form>
            </div>

            {uploadLoading ? (
                <div className='uploading-screen'>
                    <div className='circle'>
                        <CircularProgressbar
                            value={uploadPercent}
                            text={`${uploadPercent}%`}
                            styles={buildStyles({
                                // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                                strokeLinecap: 'butt',

                                // Text size
                                textSize: '16px',

                                // How long animation takes to go from one percentage to another, in seconds
                                pathTransitionDuration: 0.5,

                                // Can specify path transition in more detail, or remove it entirely
                                // pathTransition: 'none',

                                // Colors
                                pathColor: `rgba(62, 152, 199, ${uploadPercent / 100})`,
                                textColor: '#7451f8',
                                trailColor: '#7451f8',
                            })}
                        />
                    </div>
                </div>
            ) : null}
        </>
    );
};

export default AddForm;
