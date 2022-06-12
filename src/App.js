import React from 'react';

import { Header } from "./components";
import { Home, Cart, FullPizza } from "./pages";
import { Route, Routes } from "react-router-dom";
import ThanksPage from "./components/ThanksPage";
import MainLayout from './layouts/MainLayout';


function App() {

    return (
        
        //Версия с компонентом аутлет из реакт-роутер-дом которий является родителем для вложенних роутов нам нужен главний роут в котором будет лежать аутлет
        <Routes>
            <Route path='/' element={<MainLayout/>}>
            <Route path="cart" element={<Cart/>} exact />
            <Route path="" element={<Home/>} exact />
            <Route path="pizza/:userId" element={<FullPizza/>} />
            <Route path="thanks" element={<ThanksPage/>} exact />
            </Route>
        </Routes>
        // <div className="wrapper">
        //     <Header />
        //         <div className="content">
        //         <Routes>
        //             <Route path="/cart" element={<Cart/>} exact />
        //             <Route path="/" element={<Home/>} exact />
                    
        //         </Routes>
        //         </div>
        //     <Routes>
        //         <Route path="/pizza/:id" element={<FullPizza/>} />
        //         <Route path="/thanks" element={<ThanksPage/>} exact />
        //     </Routes>
        // </div>

    );
}

export default App;
