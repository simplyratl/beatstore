import React from 'react';
import '../../style/dist/licensehelp.min.css';

const LicenceHelp = () => {
    return (
        <div className='license-help-container'>
            <div className='license-wrapper'>
                <h2>License for every budget</h2>

                <div className='licences'>
                    <div className='license'>
                        <span className='license-title'>BASIC</span>
                        <br />
                        <span className='license-title price'>$29.99</span>

                        <p className='license-description'>
                            If you only need high quality MP3 without tags and just starting out.
                        </p>

                        <ul>
                            <li>
                                <span className='license-option'>MP3</span>
                                <span className='license-option disabled'>WAW</span>
                                <span className='license-option disabled'>STEMS</span>
                                <span className='license-option'>Unlimited Free Downloads</span>
                                <span className='license-option'>Unlimited Video Streams</span>
                                <span className='license-option'>100000 Streams</span>
                                <span className='license-option'>1 Music Video</span>
                                <span className='license-option disabled'>Paid Perfromances</span>
                                <span className='license-option disabled'>Radio Distribution</span>
                                <span className='license-option disabled'>Radio Distribution</span>
                            </li>
                        </ul>
                    </div>
                    <div className='license'>
                        <span className='license-title'>PREMIUM</span>
                        <br />

                        <span className='license-title price'>$49.99</span>

                        <p className='license-description'>
                            Much higher quality and recommended for almost everybody.
                        </p>

                        <ul>
                            <li>
                                <span className='license-option'>MP3</span>
                                <span className='license-option'>WAW</span>
                                <span className='license-option disabled'>STEMS</span>
                                <span className='license-option'>Unlimited Free Downloads</span>
                                <span className='license-option'>Unlimited Video Streams</span>
                                <span className='license-option'>250000 Streams</span>
                                <span className='license-option'>2 Music Videos</span>
                                <span className='license-option'>Paid Perfromances</span>
                                <span className='license-option disabled'>Radio Distribution</span>
                                <span className='license-option disabled'>Radio Distribution</span>
                            </li>
                        </ul>
                    </div>
                    <div className='license favorite'>
                        <span className='license-title'>VIP</span>
                        <br />

                        <span className='license-title price'>$69.99</span>

                        <p className='license-description'>
                            Need to change arrangement or some parts of beat? Then this is perfect for you.
                        </p>

                        <ul>
                            <li>
                                <span className='license-option'>MP3</span>
                                <span className='license-option'>WAW</span>
                                <span className='license-option'>STEMS</span>
                                <span className='license-option'>Unlimited Free Downloads</span>
                                <span className='license-option'>Unlimited Video Streams</span>
                                <span className='license-option'>350000 Streams</span>
                                <span className='license-option'>2 Music Videos</span>
                                <span className='license-option'>Paid Perfromances</span>
                                <span className='license-option'>Radio Distribution</span>
                                <span className='license-option disabled'>Radio Distribution</span>
                            </li>
                        </ul>
                    </div>
                    <div className='license'>
                        <span className='license-title'>UNLIMITED</span>
                        <br />

                        <span className='license-title price'>$99.99</span>

                        <p className='license-description'>
                            You want beat only for you? No one can use this beat after you buy this license.
                            It's unique only to you.
                        </p>

                        <ul>
                            <li>
                                <span className='license-option'>MP3</span>
                                <span className='license-option'>WAW</span>
                                <span className='license-option'>STEMS</span>
                                <span className='license-option'>Unlimited Free Downloads</span>
                                <span className='license-option'>Unlimited Video Streams</span>
                                <span className='license-option'>500000 Streams</span>
                                <span className='license-option'>2 Music Videos</span>
                                <span className='license-option'>Paid Perfromances</span>
                                <span className='license-option'>Radio Distribution</span>
                                <span className='license-option'>Unique</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LicenceHelp;
