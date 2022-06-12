import React from "react";
import { Header } from "../components";
import Footer from "../components/Footer/Footer";
import {Outlet} from "react-router-dom"

const MainLayout = () => {
    return (
        <>
        <div className="wrapper">
            <Header/>
            <div className="content">
            <Outlet/>
            </div>
            <Footer/>
        </div>
       
        </>
    )
}

export default MainLayout;