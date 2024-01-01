import React from 'react'
import Navbar from "./Navbar.jsx";
import Search from "./Search.jsx";
import Chats from './Chats.jsx';
function Sidebar() {
  return (
    <div className='w-[20vw] h-[80vh] bg-[#3e3c61] '>
        <Navbar/>
        <Search/>
        <Chats/>
    </div>
  )
}

export default Sidebar
