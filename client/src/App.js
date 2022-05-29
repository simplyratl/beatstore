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

const Defaults = () => {
    return (
        <>
            <Navbar />
            <AudioPlayer />
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
                        <Route path='/contact' element={<Contact />} />
                    </Route>
                    <Route path='/register' element={<Register />} />
                    <Route path='/login' element={<Login />} />
                </Routes>
            </Router>
        </PayPalScriptProvider>
    );
}

export default App;
