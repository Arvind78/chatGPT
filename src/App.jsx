import React, { useEffect, useState } from "react";
import apps from "./App.module.css";
import Navber from "./components/navber/Navber";
import { Route, Routes, useNavigate } from "react-router-dom";
import Home from "./components/home/Home";
import Login from "./components/login/Login";
import Signup from "./components/signup/Signup";
import axios from "axios";
import Chat from "./components/chat/Chat";
import { notification } from "antd";
const App = () => {
  const Nevigate = useNavigate();
  const [token,setToken] =useState("");
  const [api, contextHolder] = notification.useNotification();
  
useEffect(()=>{
  setToken(localStorage.getItem("chatgpt"))
 if(token){

 setTimeout(()=>{
  Nevigate("/chatgpt")
 },0)
 }
},[token])

  return (
    <div className={apps.contenars}>
      <div className={apps.navContenars}>
        <Navber />
      </div>
      <div className={apps.routeContenars}>
        <Routes>
          <Route path="/"  element={<Home />}/>
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />
             { (token)&& <Route path="chatgpt" element={<Chat/>} /> }

      
        </Routes>
      </div>
    </div>
  );
};

export default App;
