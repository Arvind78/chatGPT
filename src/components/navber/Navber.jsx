import React, { useEffect, useState } from 'react'
import menu from "./Navber.module.css"
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Avatar } from 'antd';
 
const Navber = () => {
  const user = useSelector((state)=>state.user)
 

  return (
    <header  className={menu.header}>
        <div className={menu.logo}> 
        <NavLink to={"/"}>
           <img src={"/vite.svg"} alt="" height={"35px"} width={"35px"} />
          CHAT-GPT
          
          </NavLink> 
        </div>
   {
   (user)? <div> <Avatar src="https://img.icons8.com/color/48/circled-user-male-skin-type-3--v1.png" size={45} /> <span style={{textTransform:"capitalize",color:"#00a67e"}}><i><b>{user?.firstName}</b> </i></span> </div>:
        <nav>
            <NavLink to={"/login"} className={menu.anchor}>Login</NavLink>
            <NavLink to={"/signup"} className={menu.anchor}>Signup</NavLink>
        </nav>
         }
    </header>
  )
}

export default Navber