import React from 'react'
import { useSelector } from 'react-redux'
import Coversationm from './Coversationm'
import { checkOnlineStatus } from '../../../utils/chat'
const Conversation = ({onlineUsers,typing}) => {
    const {conversations,activeConversation}=useSelector((state)=> state.chat)
    const {user}=useSelector((state)=>state.user)
    // console.log(activeConversation,"aaa")
    console.log("onlineUsers con",onlineUsers)
    console.log("Conversations",conversations)
  return (
    <div className='convos scrollbar'>

<ul>
        {conversations &&
          conversations
            .filter(
              (c) =>
                c.latestMessage ||
                c._id === activeConversation._id ||
                c.isGroup == true
            )
            .map((convo,index) => {
              let check = checkOnlineStatus(onlineUsers, user, convo.users);
              return (
                <Coversationm
                index={index+1}
                  convo={convo}
                  key={convo._id}
                  online={!convo.isGroup && check ? true : false}
                  typing={typing}
                />
              );
            })}
      </ul>
    </div>
  )
}

export default Conversation