import React from "react";
import { Routes, Route, Outlet } from "react-router-dom";
import Signin from "./components/login";
import Home from "./components/Home/home";
import Emailverify from "./components/emailverify";
import Men from "./components/catogarie/men";
import Women from "./components/catogarie/women";
import Kids from "./components/catogarie/kids";
import Card from "./components/card/card";
import Cart from "./components/card/cart";
import About from "./components/elements/About";
import Signup from "./components/Singup";

function App() {

  return (
    <>
      <Routes>
      <Route path="/userlogin" element={<Signin/>}/>
      <Route path="/" element={<Home/>}/>
      <Route path="/emailverify" element={<Emailverify/>}/>
      <Route path="/men" element={<Men/>}/>
      <Route path="/women" element={<Women/>}/>
      <Route path="/kids" element={<Kids/>}/>
      <Route path="/card/:id" element={<Card/>}/>
      <Route path="/cart" element={<Cart/>}/>
      <Route path="/about" element={<About/>}/>
      <Route path="/signup" element={<Signup/>}/>
      </Routes>
    </>
  )
}

export default App;
