import React, { useEffect } from 'react'
import { Sidebar } from '../components/sidebar/index'
import { useDispatch, useSelector } from 'react-redux'
import { getConversations } from '../features/chatSlice';
import { ChatContainer, ChatHome } from '../components/chat';
const Home = () => {
  const dispatch =useDispatch();
  const {user}=useSelector((state)=>state.user)
  const  {activeConversation}=useSelector((state)=>state.chat)
  
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

export default Home