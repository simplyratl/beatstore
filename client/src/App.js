import Home from './pages/Home';
import Navbar from './components/Navbar';
import AudioPlayer from './components/AudioPlayer';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Beats from './pages/Beats';
import Register from './pages/Register';
import CategoryPage from './pages/CategoryPage';
import BeatSingle from './pages/BeatSingle';

function App() {

    return (
        <Router>
            <Navbar />
            <Routes>
                <Route exact path='/' element={<Home />} />
                <Route path='/beats' element={<Beats />} />
                <Route path='/register' element={<Register />} />
                <Route path='/category/:category' element={<CategoryPage />} />
                <Route path='/beat/:name/:id' element={<BeatSingle />} />
            </Routes>
            <AudioPlayer />
        </Router>
    );
}

export default App;
