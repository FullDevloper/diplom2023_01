import React ,{useState}from 'react'
import { SidebarHeader } from './header'
import { Notification } from './notification'
import {Search} from "./search"
import { Conversation } from './conversationb'
export default function Sidebar() {
  const [searchResults,setSearchResults]=useState([])
  // console.log(searchResults)
  return (
    <div className='w-[40%] h-full select-none'>
      <SidebarHeader/>
      {/*Мэдэгдэл*/}
      <Notification/>
      {/*Хайлт  */}
      <Search searchLength={searchResults.length}/>
      {/*Харилцан*/}
      <Conversation/>
    </div>
  )
}
