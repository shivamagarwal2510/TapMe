import React from 'react'
import Chat from '../components/Chat'
import Sidebar from '../components/Sidebar'

function Home() {
  return (
    <div className="bg-indigo-300 w-[100vw] h-[100vh] flex justify-center items-center">
      <div className='h-[80vh] w-[65vw] bg-white rounded-lg shadow-2xl flex overflow-hidden'>
        <Sidebar />
        <Chat />
      </div>
    </div>
  );
}

export default Home;
