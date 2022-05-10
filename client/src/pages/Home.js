import React from 'react';
import Beatstars from '../components/Home/Beatstars';
import Hero from '../components/Hero';
import LicenseHelp from '../components/Home/LicenseHelp';

const Home = () => {
    return (
        <div>
            <Hero />
            <Beatstars />
            <LicenseHelp />
        </div>
    );
};

export default Home;
