import React, { useEffect } from 'react'
import ChatHeader from './ChatHeader/ChatHeader'
import ChatMessages from './messages/ChatMessages'
import {useSelector,useDispatch} from "react-redux"
import { checkOnlineStatus } from '../../utils/chat'
import { getConversationMessages } from '../../features/chatSlice'
import ChatActions from './actions/ChatActions'
const ChatContainer = ({onlineUsers,typing}) => {
  const dispatch=useDispatch()
const {activeConversation,files}=useSelector((state)=>state.chat)
const {user}=useSelector((state)=>state.user)
const {token}=user;
const values={
  token,
  convo_id:activeConversation.existed_conversation._id
}
console.log(activeConversation,"sss")
useEffect(()=>{
if(activeConversation.existed_conversation?._id)
{
  dispatch(getConversationMessages(values))
}
},[activeConversation])
  return (
    <div className="relative w-full h-full border-l dark:border-l-dark_border_2 select-none overflow-hidden ">
<div>
<ChatHeader   online={
            activeConversation.existed_conversation.isGroup
              ? false
              : checkOnlineStatus(onlineUsers, user, activeConversation.existed_conversation.users)
          }/>

{files.length > 0 ? (
       <>s</>
        ) : (
          <>
            {/*Chat messages*/}
            <ChatMessages typing={typing} />
            {/* Chat Actions */}
            <ChatActions />
          </>
        )}


</div>

      
    </div>
  )
}

export default ChatContainer