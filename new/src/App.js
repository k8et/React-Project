import { Routes, Route, Link } from 'react-router-dom';

import {About} from "./components/About";
import {Homepage} from "./components/Homepage";
import {Blogpage} from "./components/Blogpage";
import {Notfoundpage} from "./components/Notfoundpage";

function App() {
    return (
        <>
            <header>
                <Link to="/">Home</Link>
                <Link to="/posts">Blog</Link>
                <Link to="/about">About</Link>
            </header>
            <Routes>
                <Route path="/" element={<Homepage />} />
                <Route path="/about" element={<About />} />
                <Route path="/posts" element={<Blogpage />} />
                <Route path="*" element={<Notfoundpage />} />
            </Routes>
        </>
    );
}

export default App;