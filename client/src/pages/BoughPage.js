import React, { useState } from 'react';
import storage from '../firebasemain';
import { getDownloadURL, ref } from 'firebase/storage';

const BoughPage = () => {
    const [downloadLink, setDownloadLink] = useState('');

    getDownloadURL(
        ref(
            storage,
            'items/Jala_Brat_&amp;_Buba_Corelli_-_Mafia.mp3-(mp3_tagged)aadfa800-a17f-4d78-a7ec-65fa784795bb'
        )
    )
        .then((url) => {
            const xhr = new XMLHttpRequest();
            xhr.responseType = 'blob';
            xhr.onload = (e) => {
                const blob = xhr.response;
            };

            xhr.open('GET', url);
            xhr.setRequestHeader('Access-Control-Allow-Origin', '*');
            xhr.send();
            setDownloadLink(url);
        })
        .catch((err) => {
            console.log(err);
        });
    return (
        <div>
            <a href={downloadLink} target='_blank'>
                <button style={{ marginTop: 300 }}>Download</button>
            </a>
        </div>
    );
};

export default BoughPage;
