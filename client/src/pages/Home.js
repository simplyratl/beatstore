import React from "react";
import Hero from "../components/Hero";

const LicenseHelp = React.lazy(() => import("../components/Home/LicenseHelp"));
const MusicPlatform = React.lazy(() => import("../components/Home/MusicPlatform"));
const BuyNow = React.lazy(() => import("../components/Home/BuyNow"));
const FeaturesScrolling = React.lazy(() => import("../components/Home/FeaturesScrolling"));
const GetBeats = React.lazy(() => import("../components/Home/GetBeats"));
const Artists = React.lazy(() => import("../components/Home/Artists"));
const Footer = React.lazy(() => import("../components/Footer"));
const ThreeDAnimation = React.lazy(() => import("../components/Home/ThreeDAnimation"));

const Home = () => {
    return (
        <>
            <Hero />
            <React.Suspense fallback="Loading...">
                <LicenseHelp />
            </React.Suspense>
            <React.Suspense fallback="Loading...">
                <MusicPlatform />
            </React.Suspense>
            <React.Suspense fallback="Loading...">
                <BuyNow />
            </React.Suspense>
            <React.Suspense fallback="Loading...">
                <GetBeats />
            </React.Suspense>
            <React.Suspense fallback="Loading...">
                <FeaturesScrolling />
            </React.Suspense>
            <React.Suspense fallback="Loading...">
                <Artists />
            </React.Suspense>
            <React.Suspense fallback="Loading...">
                <ThreeDAnimation />
            </React.Suspense>
            <React.Suspense fallback="Loading...">
                <Footer />
            </React.Suspense>
        </>
    );
};

export default React.memo(Home);
