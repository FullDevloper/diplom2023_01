import React, { useEffect } from 'react'
import { Sidebar } from '../components/sidebar/index'
import { useDispatch, useSelector } from 'react-redux'
import { getConversations } from '../features/chatSlice';
import { ChatContainer, ChatHome } from '../components/chat';
import SocketContext from '../context/SocketContext';
const Home = ({socket}) => {
  const dispatch =useDispatch();
  const {user}=useSelector((state)=>state.user)
  const  {activeConversation}=useSelector((state)=>state.chat)
  useEffect(()=>{
    socket.emit("join",user._id)
  },[user])
  useEffect(()=>{
    if(user?.token)
    {
      dispatch(getConversations(user.token))
    }
  },[user])
  console.log(activeConversation.existed_conversation,"aaa")
  return (
    <div className="h-screen dark:bg-dark_bg_1 flex items-center  justify-center py-[19px]  overflow-hidden">
      <div className='container flex py-[19px] h-screen'>
        <Sidebar/>
        {
         activeConversation.existed_conversation && activeConversation.existed_conversation._id ?  <ChatContainer/>:<ChatHome/>
        }
        
        </div>
      </div>
  )
}

const HomeWithSocket=(props)=>(
  <SocketContext.Consumer>
    {
    (socket)=><Home {...props} socket={socket}/>
    }

  </SocketContext.Consumer>
  
)
export default HomeWithSocket;