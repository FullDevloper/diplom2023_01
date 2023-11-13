import React,{useState} from 'react'
// import {  useSelector } from 'react-redux/es/hooks/useSelector'
import { useDispatch, useSelector } from "react-redux";
import { ChatIcon, CommunityIcon, DotsIcon, StoryIcon } from "../../../svg";
export default function SidebarHeader() {
  const {user} =useSelector((state)=>state.user)
  const [showMenu, setShowMenu] = useState(false);
  const [showCreateGroup, setShowCreateGroup] = useState(false);
    return (
    <div className='h-[50px] dark:bg-dark_bg_2 flex items-center p16'>
      <div className='w-full flex items-center justify-between'>
        <button className='btn'>
            <img src={user.picture} alt={user.name} height={300} width={300} className="w-full h-full rounded-full object-cover"/>

        </button>
        <ul className="flex items-center gap-x-2 5">
            <li>
              <button className="btn">
                <CommunityIcon className="dark:fill-dark_svg_1" />
              </button>
            </li>
            <li>
              <button className="btn">
                <StoryIcon className="dark:fill-dark_svg_1" />
              </button>
            </li>
            <li>
              <button className="btn">
                <ChatIcon className="dark:fill-dark_svg_1" />
              </button>
            </li>
            <li
              className="relative"
              
            >
              <button className={`btn ${showMenu ? "bg-dark_hover_1" : ""}`}>
                <DotsIcon className="dark:fill-dark_svg_1" />
              </button>
              
            </li>
          </ul>
      </div>
    </div>
  )
}