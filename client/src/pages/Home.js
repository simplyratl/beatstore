import React from 'react';
import Beatstars from '../components/Home/Beatstars';
import Hero from '../components/Hero';
import LicenseHelp from '../components/Home/LicenseHelp';
import MusicPlatform from '../components/Home/MusicPlatform';
import BuyNow from '../components/Home/BuyNow';
import GetBeats from '../components/Home/GetBeats';
import FeaturesScrolling from '../components/Home/FeaturesScrolling';
import Artists from '../components/Home/Artists';
import EndSection from '../components/Home/EndSection';
import ThreeDAnimation from '../components/Home/ThreeDAnimation';
import Footer from '../components/Footer';

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
            {/* <EndSection /> */}
            <ThreeDAnimation />
            <Footer />
        </>
    );
};

export default Home;
