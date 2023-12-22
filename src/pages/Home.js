import React, { useEffect,useState } from 'react'
import { Sidebar } from '../components/sidebar/index'
import { useDispatch, useSelector } from 'react-redux'
import { getConversations,updateMessagesAndConversations } from '../features/chatSlice';
import { ChatContainer, ChatHome } from '../components/chat';
import SocketContext from '../context/SocketContext';
const Home = ({socket}) => {
  const dispatch =useDispatch();
  const [onlineUsers, setOnlineUsers] = useState([]);
  const {user}=useSelector((state)=>state.user)
  const  {activeConversation}=useSelector((state)=>state.chat)
  const [typing, setTyping] = useState(false);



  useEffect(()=>{
    socket.emit("join",user._id)
    socket.on("get-online-users", (users) => {
      console.log("onilne users",users)
      setOnlineUsers(users);
    });
  },[user])
  useEffect(()=>{
    if(user?.token)
    {
      dispatch(getConversations(user.token))
    }
  },[user])
  useEffect(() => {
    //lsitening to receiving a message
    socket.on("receive message", (message) => {
      dispatch(updateMessagesAndConversations(message));
      console.log(message)
    });
    // listening when a user is typing
    socket.on("typing", (conversation) => setTyping(conversation));
    socket.on("stop typing", () => setTyping(false));
  }, []);
  // console.log(activeConversation.existed_conversation,"aaa")
  return (
    <div className="h-screen dark:bg-dark_bg_1 flex items-center  justify-center py-[19px]  overflow-hidden">
      <div className='container flex py-[19px] h-screen'>
        <Sidebar onlineUsers={onlineUsers} typing={typing} />
        {
         activeConversation.existed_conversation && activeConversation.existed_conversation._id ?  <ChatContainer onlineUsers={onlineUsers} typing={typing}/>:<ChatHome/>
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