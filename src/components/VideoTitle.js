import React from 'react'

const VideoTitle = ({title,overview}) => {
  return (
    <div className='w-screen aspect-ratio pt-[20%] px-6 md:px-24 absolute text-white bg-gradient-to-r from-black'>
        <h1 className='text-2xl md:text-6xl font-bold'>{title}</h1>
        <p className='hidden md:inline-block py-6 text-lg w-1/4'>{overview}</p>
        <div className='my-4 md:my-0'>
            <button className='bg-white rounded-lg text-black py-1 md:py-4 md:px-16 px-3 text-xl hover:bg-opacity-80'>▶Play</button>
            <button className='hidden md:inline-block bg-gray-600 bg-opacity-50 mx-2 rounded-lg text-white p-4 px-16 text-xl'>ℹ More Info</button>
        </div>
    </div>
  )
}

export default VideoTitle