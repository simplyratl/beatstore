import React from 'react';
import Beatstars from '../components/Home/Beatstars';
import Hero from '../components/Hero';
import LicenseHelp from '../components/Home/LicenseHelp';
import MusicPlatform from '../components/Home/MusicPlatform';
import BuyNow from '../components/Home/BuyNow';
import GetBeats from '../components/Home/GetBeats';
import FeaturesScrolling from '../components/Home/FeaturesScrolling';
import Artists from '../components/Home/Artists';

const Home = () => {
    return (
        <>
            <Hero />
            {/* <Beatstars /> */}
            <LicenseHelp />
            <MusicPlatform />
            <BuyNow />
            <GetBeats />
            <FeaturesScrolling />
            <Artists />
        </>
    );
};

export default Home;
