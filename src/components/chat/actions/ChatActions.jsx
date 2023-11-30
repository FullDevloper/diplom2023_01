import React,{useState,useRef} from 'react'
import { useDispatch, useSelector } from "react-redux";
import EmojiPicker from './EmojiPicker';
import Attachments from '../attach/Attachments';
import { SendIcon } from "../../../svg";
import { ClipLoader } from "react-spinners";
import Input from './Input';
const ChatActions = () => {
    // const dispatch = useDispatch();
    const [showPicker, setShowPicker] = useState(false);
    const textRef = useRef();
    const [message, setMessage] = useState("");
    const [showAttachments, setShowAttachments] = useState(false);
    const [loading, setLoading] = useState(false);
    const { activeConversation, status } = useSelector((state) => state.chat);
    // const { user } = useSelector((state) => state.user);
//   const { token } = user;
    return (
    <form className="dark:bg-dark_bg_2 h-[60px] w-full flex items-center absolute bottom-0 py-2 px-4 select-none"
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
<Attachments/>
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