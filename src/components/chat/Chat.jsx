import React, { useEffect, useState } from "react";
import chat from "./Chat.module.css"
import { Avatar, Button } from "antd";
import {AiOutlineSend} from "react-icons/ai"
import { useDispatch, useSelector } from "react-redux";
import ReactLoading from 'react-loading';
import axios from "axios";
import { logout } from "../../redux/userSlice";
import { useNavigate } from "react-router-dom";
import adsModel from "../../assets/adsModel.png"
const Chat =()=>{
  const user = useSelector((state)=>state.user)
  const [loading, setLoading] = useState(false);
  const [result,setResult] =useState("");
    const [prompt,setPrompt]= useState("");
    const [windowSize,setWindowSize]=useState(0);
    
   const dispatch = useDispatch();
   const nevigate = useNavigate()
    useEffect(()=>{
      setInterval(()=>{
        setWindowSize(window.innerWidth)
      },0)
    },[windowSize])
   
const chatgtpHandler =()=>{
  setLoading(true)
   axios.post("https://chatgptserver-tibl.onrender.com/api/chat",{prompt}).then((res)=>{
    const originalString =  res.data.result
    
      setResult(originalString)
      setLoading(false)

   }).catch((err)=>{
  setLoading(false)

    throw err

})
   setPrompt("")

}

const logoutHandler =()=>{

    dispatch(logout())
    localStorage.removeItem("chatgpt")
    nevigate("/")
}

    return(
        <>
      {(windowSize>700)?
        <div className={chat.chatMainContainer}>
         
             <div className={chat.sidenav}>
                <div  className={chat.inputBox}>
                    <div>
                       <a href="/">+ New Chat </a> 
                    </div>
             
                      <img src={adsModel} alt="" height={"300px"} />
           
                </div>
                <div  className={chat.logOut}>
                    <h3>Welcome to chatGPT</h3>
                    <div> <Avatar src="https://img.icons8.com/color/48/circled-user-male-skin-type-3--v1.png" size={45} /> <span style={{textTransform:"capitalize",color:"#00a67e"}}><i><b>{user?.firstName+" "+user?.lastName }</b> </i></span> </div>
                     <Button type="primary" style={{width:"70%",margin:"7px 0px"}} onClick={logoutHandler}>Logout</Button>
                </div>
            </div>
            <div className={chat.chatMain}>
                <h1 style={{textAlign:"center",color:"#cfd0d19d",padding:"10px 0px"}}>ChatGPT</h1>
               <div className={chat.chatsub}>
                <div className={chat.chatInfo} >
                    <section>
                        <div >
                            <h3>Give me idea</h3>
                            <p>for what to do with my kids'art</p>
                        </div>
                        <div>
                        <h3>Explain nostalgia</h3>
                            <p>to a kinderhartener</p>
                        </div>
                    </section>
                    <section id={chat.optionContainer}>  
                         <div>
                         <h3>Show me code snippet</h3>
                            <p>of a website's sticky header</p>
                         </div>
                        <div>  
                              <h3>Design a database schema</h3>
                            <p>for an online merch store</p>
                            </div>
                 </section>
                  
                </div>
                <div className={chat.chatRusult}>
                    {
                        result &&
                        <div className={chat.chatResultInfo}>
                        < Avatar src="https://img.icons8.com/color/48/circled-user-male-skin-type-3--v1.png" size={45} />
                    <div  >
                        
                       
                          <p style={{textAlign:"justify"}}>
                            <pre>
                          {result}
                          </pre>
                          </p>

                    </div>
                  
                </div>
                    }
                  
                
                </div>
                </div>
               
                <div className={chat.inputBtn}>
                <div className={chat.inputFields} >
                < Avatar src="https://img.icons8.com/color/48/circled-user-male-skin-type-3--v1.png" size={45} />
                    <input type="text" onChange={(e)=>setPrompt(e.target.value)} value={prompt} placeholder="write your queries..." />
                  {(!loading)?
                  <AiOutlineSend size={45} className={chat.sendIcon} onClick={chatgtpHandler}/>:

                   <ReactLoading type={"spin"} color={"green"} height={'20px'} width={'20px'} />
                  }
                </div>
                </div>
            </div> 

        </div>:
        <ResponsivChat prompt={prompt} 
        setPrompt={setPrompt} result={result} setResult={setResult} />
}

        </>
    )
}

export default Chat;





const ResponsivChat =({prompt,setPrompt,result,setResult})=>{
  const [loading, setLoading] = useState(false);

const chatgtpHandler =()=>{
  setLoading(true)
  axios.post("https://chatgptserver-tibl.onrender.com/api/chat",{prompt}).then((res)=>{
   
    setResult(res.data.result)
    setLoading(false)

  }).catch((err)=>{
 setLoading(false)

   throw err

})
  setPrompt("")

}
    return(
        <>
         <div  className={chat.MobileinputBox}>
                    <div > 
                

                       <p style={{textAlign:'center'}}> New Chat </p> 
                     
                    </div>
                </div>
                <div className={chat.chatResInfo} >
                    <section>
                        <div>
                            <h3>Give me idea</h3>
                            <p>for what to do with my kids'art</p>
                        </div>
                        <div>
                        <h3>Explain nostalgia</h3>
                            <p>to a kinderhartener</p>
                        </div>
                    </section>
                    <section>  
                         <div>
                         <h3>Show me code snippet</h3>
                            <p>of a website's sticky header</p>
                         </div>
                        <div>  
                              <h3>Design a database schema</h3>
                            <p>for an online merch store</p>
                            </div>
                 </section>
                  
                </div>

                <div className={chat.chatRusultM}>
                    { result &&
                    <div className={chat.chatResultInfoM}>
                            < Avatar src="https://img.icons8.com/color/48/circled-user-male-skin-type-3--v1.png" size={45} />
                        <div  >
                         <pre>
                        
                          {result}
                    
                          </pre>
                        </div>
                     
                    </div>
}
                </div>
                <div className={chat.inputBtn}>
              <div className={chat.inputFields} >
                < Avatar src="https://img.icons8.com/color/48/circled-user-male-skin-type-3--v1.png" size={45} />
                    <input type="text" onChange={(e)=>setPrompt(e.target.value)} value={prompt} placeholder="write your queries..." />
                  {(!loading)?
                  <AiOutlineSend size={50} className={chat.sendIcon} onClick={chatgtpHandler}/>:

                   <ReactLoading type={"spin"} color={"green"} height={'20px'} width={'20px'} />
                  }
                </div>
                </div>
        </>
    )
}
