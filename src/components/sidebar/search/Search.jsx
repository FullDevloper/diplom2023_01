import React, { useState } from 'react'
import { FilterIcon, ReturnIcon, SearchIcon } from "../../../svg";
// import { Axios } from 'axios';
import {useSelector} from "react-redux"
import axios from "axios"
const Search = ({searchLength,setSearchResults}) => {
const {user}=useSelector((state)=>state.user);
const {token}=user;
  const [show,setShow]=useState(false)
    const handleSearch =async(e)=>{
      console.log(e.target.value)
      if( e.target.value && e.key === "Enter")
      {
      try{
        const {data}=await axios.get(`http://localhost:8001/api/v1/user?search=${e.target.value}`,{
          headers:{
            Authorization:`Bearer ${token}`
          }
        })
        setSearchResults(data)
      }catch(error)
      {
        console.log("err",error)
      }
      }
      else{
        setSearchResults([])
      }

    }
    console.log(searchLength)
  return (
    <div className="h-[49px] py-1.5">
    {/*Container*/}
    <div className="px-[10px]">
      {/*Search input container*/}
      <div className="flex items-center gap-x-2">
        <div className="w-full flex dark:bg-dark_bg_2 rounded-lg pl-2">
          {show || searchLength > 0 ? (
            <span
              className="w-8 flex items-center justify-center rotateAnimation cursor-pointer"
              onClick={() =>setSearchResults([])}
            >
              <ReturnIcon  className="fill-green_1 w-5" />
            </span>
          ) : (
            <span className="w-8 flex items-center justify-center ">
              <SearchIcon className="dark:fill-dark_svg_2 w-5" />
            </span>
          )}
          <input
            type="text"
            placeholder="Шинэ харилцагч хайх"
            className="input"
            onFocus={() => setShow(true)}
            onBlur={() => searchLength == 0 && setShow(false)}
            onKeyDown={(e) => handleSearch(e)}
          />
        </div>
        <button className="btn">
          <FilterIcon className="dark:fill-dark_svg_2" />
        </button>
      </div>
    </div>
  </div>
  )
}

export default Search