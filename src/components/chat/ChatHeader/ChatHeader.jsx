import React from 'react'
import {useSelector} from "react-redux"
import {capitalize} from "../../../utils/string"
import {
    CallIcon,
    DotsIcon,
    SearchLargeIcon,
    
  } from "../../../svg";
const ChatHeader = () => {
    const {activeConversation} =useSelector((state)=>state.chat)
  return (
    <div className="h-[59px] dark:bg-dark_bg_2 flex items-center p16 select-none">
    {/*Container*/}
    <div className="w-full flex items-center justify-between">
      {/*left*/}
      <div className="flex items-center gap-x-4">
        {/*Conversation image*/}
        <button className="btn">
          <img
            src={require("../../../avatars/3.png")}
            alt=""
            className="w-full h-full rounded-full object-cover"
          />
        </button>
        {/*Conversation name and online status*/}
        <div className="flex flex-col">
          <h1 className="dark:text-white text-md font-bold">
           {activeConversation.existed_conversation.name}
           {capitalize(activeConversation.existed_conversation.name.split(" ")[0])}
          </h1>
          <span className="text-xs dark:text-dark_svg_2">
               online
            </span>
        </div>
      </div>
      {/*Right*/}
      <ul className="flex items-center gap-x-2.5">
        {1 == 1 ? (
          <li >
          
          </li>
        ) : null}
        {1 == 1 ? (
          <li>
            <button className="btn">
              <CallIcon />
            </button>
          </li>
        ) : null}
        <li>
          <button className="btn">
            <SearchLargeIcon className="dark:fill-dark_svg_1" />
          </button>
        </li>
        <li>
          <button className="btn">
            <DotsIcon className="dark:fill-dark_svg_1" />
          </button>
        </li>
      </ul>
    </div>
  </div>
  )
}

export default ChatHeader