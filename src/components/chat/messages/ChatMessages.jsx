import React,{useEffect, useRef} from 'react'
import Message from './Message'
import Typing from './Typing'
import {useSelector} from "react-redux"
const ChatMessages = ({typing}) => {
  const {messages,activeConversation} =useSelector((state)=>state.chat)
  const {user} =useSelector((state)=>state.user)
  const endRef=useRef()
  useEffect(()=>{
    endRef.current.scrollIntoView({behavior:"smooth"})
  },[messages])
  return (
    <div className="mb-[60px] bg-[#1C2833]
    bg-cover bg-no-repeat
    ">
<div  className="scrollbar overflow_scrollbar overflow-auto py-2 px-[5%]">

{messages &&
          messages.map((message) => (
            <div key={message._id}>
              {/*Message files */}
              {/* {message.files.length > 0
                ? message.files.map((file) => (
                    <FileMessage
                      FileMessage={file}
                      message={message}
                      key={message._id}
                      me={user._id === message.sender._id}
                    />
                  ))
                : null} */}
              {/*Message text*/}
              {message.message.length > 0 ? (
                <Message
                  message={message}
                  key={message._id}
                  me={user._id === message.sender._id}
                />
              ) : null}
            </div>
          ))}
          {typing === activeConversation.existed_conversation._id ? <Typing /> : null}
          <div className='mt-2' ref={endRef}></div>
</div>

    </div>
  )
}

export default ChatMessages