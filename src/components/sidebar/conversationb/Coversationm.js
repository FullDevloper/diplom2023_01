import React from 'react'
import moment from 'moment/moment'

import { dateHandler } from '../../../utils/date'
import {useDispatch,useSelector} from "react-redux"
import {getConversationId,getConversationName} from "../../../utils/chat"
import {open_create_conversation} from "../../../features/chatSlice"
import SocketContext from '../../../context/SocketContext'
import {capitalize} from "../../../utils/string"
const Coversationm = ({convo,index,socket,online,typing}) => {
  // console.log("convos",convo)
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { activeConversation } = useSelector((state) => state.chat);
  const { token } = user;
  const values = {
    receiver_id: getConversationId(user, convo.users),
    isGroup: convo.isGroup ? convo._id : false,
    token,
  };
  const openConversation = async () => {

   const newConvo= await dispatch(open_create_conversation(values));
   console.log(newConvo,"convo")
    if(newConvo.payload.existed_conversation._id)
  {
    
    socket.emit("join conversation", newConvo.payload.existed_conversation._id);
  };
  }

  // const setActives =()=>{
  //   dispatch(setActiveConversation(convo))
  // }
  // console.log(user._id,"user")
  // console.log(convo.users)
 
  return (
    <div onClick={()=> openConversation()} className='list-none h-[72px] w-full dark:bg-dark_bg_1 hover:dark:bg-dark_bg_2 cursor-pointer dark:text-dark_text_1 px-[10px]'>
        <div className="relative w-full flex items-center justify-between py-[10px]">
        <div className='flex items-center gap-x-3'>
            <div className={`relative min-w-[50px] max-w-[50px] h-[50px] rounded-full overflow-hidden ${online ? 'online':""} `}>
            <img src={require(`../../../avatars/${index}.png`)} alt={convo.name} className='w-full h-full object-cover'/>
            </div>
            <div className='w-full flex flex-col'>

            <h1 className="font-bold flex items-center gap-x-2">

            {capitalize(getConversationName(user,convo.users))}
            </h1>
            <div>
              <div className='flex items-center gap-x-1 dark:text-dark_text_2'>

                <div className='flex-1  items-center gap-x-1 dark:text-dark_text_2'>
                {typing === convo._id ? (
                    <p className="text-green_1">чат бичиж байна ...</p>
                  ) : (
                    <p>
                    {convo.latestMessage?.message.length > 25
                      ? `${convo.latestMessage?.message.substring(0, 25)}...`
                      : convo.latestMessage?.message}
                  </p>
                  )}
             
                </div>
              </div>
            </div>
            </div>

        </div>
        <div className='flex flex-col gap-y-4 items-end text-xs'>
          <span className='dark:text-dark_text_2'>
            {dateHandler(convo.latestMessage?.createdAt)}
          </span>
          <span className='dark:text-dark_text_2'>
            {moment(convo.latestMessage?.createdAt).fromNow(true)}
          </span>
        </div>


        </div>

    </div>
  )
}
const ConversationWithContext=(props)=>(
  <SocketContext.Consumer>
    {
      (socket)=><Coversationm {...props} socket={socket}/>
    }
  </SocketContext.Consumer>
)
export default ConversationWithContext