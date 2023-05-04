import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./views/Login";
import HomeView from "./views/homeView";
import { useEffect, useState } from "react";
import LoadingPage from "./views/loadingPage";

function App() {

  /* return token ? <HomeView code={token} /> : <Login />; */
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/homeView" element={<HomeView />}></Route>
        <Route path="/loadingPage" element={<LoadingPage />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
