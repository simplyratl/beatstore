import Home from './pages/Home';
import Navbar from './components/Navbar';
import AudioPlayer from './components/AudioPlayer';
import { BrowserRouter as Router, Outlet, Route, Routes } from 'react-router-dom';
import Beats from './pages/Beats';
import Register from './pages/Register';
import CategoryPage from './pages/CategoryPage';
import BeatSingle from './pages/BeatSingle';
import Login from './pages/Login';
import { useContext, useEffect } from 'react';
import { Context } from './context/Context';
import Checkout from './pages/Checkout';
import BoughPage from './pages/BoughPage';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import Contact from './pages/Contact';
import SearchPage from './pages/SearchPage';
import Profile from './pages/Profile';
import { ParallaxProvider } from 'react-scroll-parallax';
import { AnimatePresence } from 'framer-motion';



const Defaults = () => {

    const { isPlaying, currentBeat } = useContext(Context);


    return (
        <>
            <Navbar />
            {currentBeat &&
                <AnimatePresence>
                    <AudioPlayer />
                </AnimatePresence>
            }

            <Outlet />
        </>
    );
};

function App() {
    const { user, setUser } = useContext(Context);


    useEffect(() => {
        const token = user?.token;

        setUser(JSON.parse(localStorage.getItem('user')));
    }, []);

    return (
        <PayPalScriptProvider options={{ 'client-id': process.env.REACT_APP_PAYPAL_CLIENT }}>
            <ParallaxProvider>
                <Router>
                    <Routes>
                        <Route element={<Defaults />}>
                            <Route exact path='/' element={<Home />} />
                        </Route>
                        <Route element={<Defaults />}>
                            <Route path='/beats' element={<Beats />} />
                        </Route>
                        <Route element={<Defaults />}>
                            <Route path='/category/:category' element={<CategoryPage />} />
                        </Route>
                        <Route element={<Defaults />}>
                            <Route path='/beat/:name/:id' element={<BeatSingle />} />
                        </Route>
                        <Route element={<Defaults />}>
                            <Route path='/checkout' element={<Checkout />} />
                        </Route>
                        <Route element={<Defaults />}>
                            <Route path='/checkout/:id' element={<BoughPage />} />
                        </Route>
                        <Route element={<Defaults />}>
                            <Route path='/search/:query' element={<SearchPage />} />
                        </Route>
                        <Route element={<Defaults />}>
                            <Route path='/contact' element={<Contact />} />
                        </Route>
                        <Route element={<Defaults />}>
                            <Route path='/profile/:username' element={<Profile />} />
                        </Route>
                        <Route path='/register' element={<Register />} />
                        <Route path='/login' element={<Login />} />
                    </Routes>
                </Router>
            </ParallaxProvider>
        </PayPalScriptProvider>
    );
}

export default App;
