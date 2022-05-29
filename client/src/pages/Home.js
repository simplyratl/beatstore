import React from 'react';
import Beatstars from '../components/Home/Beatstars';
import Hero from '../components/Hero';
import LicenseHelp from '../components/Home/LicenseHelp';
import MusicPlatform from '../components/Home/MusicPlatform';
import BuyNow from '../components/Home/BuyNow';

const Home = () => {
    return (
        <>
            <Hero />
            <Beatstars />
            <LicenseHelp />
            <MusicPlatform />
            <BuyNow />
        </>
    );
};

export default Home;
