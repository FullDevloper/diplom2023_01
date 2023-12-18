import React from 'react'
import { useSelector } from 'react-redux'
import Coversationm from './Coversationm'
const Conversation = () => {
    const {conversations,activeConversation}=useSelector((state)=> state.chat)
    // console.log(activeConversation,"aaa")
    console.log("Conversations",conversations)
  return (
    <div className='convos scrollbar'>

        {conversations  && conversations
        // .filter((c)=>c.latestMessage || c._id === activeConversation.existed_conversation._id)
        .map((convo,index)=>(
<Coversationm convo={convo} index={index+1} key={convo._id}/>
        )) } 
    </div>
  )
}

export default Conversation