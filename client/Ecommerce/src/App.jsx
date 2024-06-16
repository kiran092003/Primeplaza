import React from "react";
import { Routes, Route, Outlet } from "react-router-dom";
import Signin from "./components/login";
import Home from "./components/Home/home";
import Signup from "./components/signup";
import Men from "./components/catogarie/men";

function App() {

  return (
    <>
      <Routes>
      <Route path="/userlogin" element={<Signin/>}/>
      <Route path="/" element={<Home/>}/>
      <Route path="/signup" element={<Signup/>}/>
      <Route path="/men" element={<Men/>}/>
      </Routes>
    </>
  )
}

export default App;
