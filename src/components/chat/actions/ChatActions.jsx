import React,{useState,useRef} from 'react'
import { useDispatch, useSelector } from "react-redux";
import EmojiPicker from './EmojiPicker';
import Attachments from '../attach/Attachments';
import { SendIcon } from "../../../svg";
import { ClipLoader } from "react-spinners";
import Input from './Input';
import { sendMessage } from '../../../features/chatSlice';
const ChatActions = () => {
    const dispatch = useDispatch();
    const [showPicker, setShowPicker] = useState(false);
    const textRef = useRef();
    const [message, setMessage] = useState("");
    const [showAttachments, setShowAttachments] = useState(false);
    const [loading, setLoading] = useState(false);
    const { activeConversation, status } = useSelector((state) => state.chat);
    const { user } = useSelector((state) => state.user);
    const { token } = user;
    const values={
      message,
      convo_id:activeConversation.existed_conversation._id,
      token,
      
    }
    const SendMessageHandler=async(e)=>{
      e.preventDefault()
      setLoading(true)
      await dispatch(sendMessage(values));
// console.log(showAttachments)
      setMessage("")
      setLoading(false)
    }
    return (
    <form onSubmit={(e)=>SendMessageHandler(e)} className="dark:bg-dark_bg_2 h-[60px] w-full flex items-center absolute bottom-0 py-2 px-4 select-none"
    >
<div className="w-full flex items-center gap-x-2">
<ul className="flex gap-x-2">

<EmojiPicker
     textRef={textRef}
     message={message}
     setMessage={setMessage}
     showPicker={showPicker}
     setShowPicker={setShowPicker}
     setShowAttachments={setShowAttachments}
/>
<Attachments setShowAttachments={setShowAttachments} setShowPicker={setShowPicker} showAttachments={showAttachments}/>
</ul>
<Input message={message} setMessage={setMessage} textRef={textRef}/>
<button type="submit" className="btn">
          {status === "loading" && loading ? (
            <ClipLoader color="#E9EDEF" size={25} />
          ) : (
            <SendIcon className="dark:fill-dark_svg_1" />
          )}
        </button>
</div>

    </form>
  )
}

export default ChatActions