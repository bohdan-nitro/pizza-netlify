import React from 'react';

import { Header } from "./components";
import { Home, Cart } from "./pages";
import { Route, Routes } from "react-router-dom";
import ThanksPage from "./components/ThanksPage";


function App() {

    return (

        <div className="wrapper">
            <Header />
                <div className="content">
                <Routes>
                    <Route path="/cart" element={<Cart/>} exact />
                    </Routes>
                </div>
            <Routes>
                <Route path="/" element={<Home/>} exact />
            </Routes>
            <Routes>
                <Route path="thanks" element={<ThanksPage/>} exact />
            </Routes>
        </div>

    );
}

export default App;
