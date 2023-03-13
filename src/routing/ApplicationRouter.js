import React from "react";
import LandingPage from "../pages/landing-page/landing-page";
import ItemsPage from "../pages/items-page/items-page.js";
import FoodbanksPage from "../pages/foodbanks-page/foodbanks-page";
import FoodbankItemsPage from "../pages/foodbank-items-page/foodbank-items-page";
import AboutPage from "../pages/about-page/about-page";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import FoodbankParcelsPage from "../pages/foodbank-parcels-page/foodbank-parcels-page";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import ErrorComponent from "../components/Error/ErrorComponent";

function ApplicationRouter() {
    return (
        <>
            <Router basename="/">
                <Navbar />
                <Routes>
                    <Route path="/" element={<LandingPage />} />
                    <Route path='foodbanks' element={< FoodbanksPage />} />
                    <Route path='items' element={< ItemsPage />} />
                    <Route path="items/:id" element={<FoodbankItemsPage />} />
                    <Route path="parcels/:id" element={<FoodbankParcelsPage />} />
                    <Route path='about' element={< AboutPage />} />
                    <Route path="*" element={<ErrorComponent/>} />
                </Routes>
                <Footer/>
            </Router>
        </>
    )
}

export default ApplicationRouter;