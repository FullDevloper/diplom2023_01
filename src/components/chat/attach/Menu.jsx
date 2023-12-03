import React from 'react'
import {   CameraIcon,
    ContactIcon,
    // DocumentIcon,
    DocumentIcon,
    PollIcon,
    StickerIcon, } from '../../../svg'
const Menu = () => {
  return (
    <ul className='cursor-pointer absolute bottom-14 openEmojiAnimation'>

        <li>
            <button type="button" className='rounded-full'>

                <PollIcon/>
            </button>
        </li>
        <li>
        <button type="button" className="bg-[#0EABF4] rounded-full">
          <ContactIcon />
        </button>
      </li>
      <DocumentIcon />
      <li>
        <button type="button" className="bg-[#D3396D] rounded-full">
          <CameraIcon />
        </button>
      </li>
      <li>
        <button type="button" className="rounded-full">
          <StickerIcon />
        </button>
      </li>
    </ul>
  )
}

export default Menu