import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./views/Login";
import HomeView from "./views/homeView";
import { useEffect, useState } from "react";
import LoadingPage from "./views/loadingPage";
import HomePresenter from "./presenters/homePresenter";
import LoadingPageTwo from "./views/loadingPageTwo";

function App() {
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/homeView" element={<HomePresenter />}></Route>
        <Route path="/loadingPage" element={<LoadingPage />}></Route>
        <Route path="/fetchingData" element={<LoadingPageTwo />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
