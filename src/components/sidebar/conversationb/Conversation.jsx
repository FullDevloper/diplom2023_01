import React from 'react'
import { useSelector } from 'react-redux'
import Coversationm from './Coversationm'
const Conversation = () => {
    const {conversations}=useSelector((state)=> state.chat)
  return (
    <div className='convos scrollbar'>

        {conversations && conversations.map((convo)=>(
<Coversationm convo={convo} key={convo._id}/>
        )) } 
    </div>
  )
}

export default Conversation