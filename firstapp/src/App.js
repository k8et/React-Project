import Header from "./components/headerComponent/Header";
import React from "react";
import {Route, Routes} from "react-router-dom";
import Home from "./components/page/Home";
import About from "./components/page/About";
import Contact from "./components/page/Contact";
import {Notfoundpage} from "./components/page/Notfoundpage";
import './index.css';





function App() {
  return (
    <div className="App">
        <Header/>
            <Routes>
                <Route className={'page'} index path="/" element={<Home />} />
                <Route path="about" element={<About />} />
                <Route path="contact" element={<Contact />} />
                <Route path="*" element={<Notfoundpage />} />
            </Routes>
    </div>
  );
}

export default App;
