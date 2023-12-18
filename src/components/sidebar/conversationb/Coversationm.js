import React from 'react'
import moment from 'moment/moment'

import { dateHandler } from '../../../utils/date'
import {useDispatch,useSelector} from "react-redux"
<<<<<<< HEAD
import {getConversationId,getConversationName} from "../../../utils/chat"
import { capitalize } from '../../../utils/string'

import {open_create_conversation,setActiveConversation} from "../../../features/chatSlice"
const Coversationm = ({convo,index}) => {
=======
import {getConversationId} from "../../../utils/chat"
import {open_create_conversation} from "../../../features/chatSlice"
import SocketContext from '../../../context/SocketContext'
const Coversationm = ({convo,index,socket}) => {
>>>>>>> c7634528a6db4926755fa8ec24bf4c7572041f33
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  // const { activeConversation } = useSelector((state) => state.chat);
  const { token } = user;
  const values = {
    receiver_id: getConversationId(user, convo.users),
    isGroup: convo.isGroup ? convo._id : false,
    token,
  };
  const openConversation = async () => {
   await dispatch(open_create_conversation(values));
    socket.emit("join conversation", activeConversation.existed_conversation._id);
  };
  // const setActives =()=>{
  //   dispatch(setActiveConversation(convo))
  // }
  // console.log(user._id,"user")
  // console.log(user._id)
 
  return (
    <div onClick={openConversation} className='list-none h-[72px] w-full dark:bg-dark_bg_1 hover:dark:bg-dark_bg_2 cursor-pointer dark:text-dark_text_1 px-[10px]'>
        <div className="relative w-full flex items-center justify-between py-[10px]">
        <div className='flex items-center gap-x-3'>
            <div className='relative min-w-[50px] max-w-[50px] h-[50px] rounded-full overflow-hidden'>
            <img src={require(`../../../avatars/${index}.png`)} alt={convo.name} className='w-full h-full object-cover'/>
            </div>
            <div className='w-full flex flex-col'>

            <h1 className="font-bold flex items-center gap-x-2">

          {  capitalize(getConversationName(user, convo.users))}              </h1>
            <div>
              <div className='flex items-center gap-x-1 dark:text-dark_text_2'>

                <div className='flex-1  items-center gap-x-1 dark:text-dark_text_2'>

                <p>
                      {convo.latestMessage?.message.length > 25
                        ? `${convo.latestMessage?.message.substring(0, 25)}...`
                        : convo.latestMessage?.message}
                    </p>
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