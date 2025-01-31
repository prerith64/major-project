import React from 'react'

const Card = ({name,value,Icon}) => {
  return (
    <div className='  bg-[#121212]  h-[300px] w-[300px]  rounded-sm  shadow-white shadow-lg p-5   ' >
      
      <div className='flex-col text-white flex gap-6 items-center'>
      <h1 className='text-3xl  font-bold  ' >{name}</h1>
      {Icon}
      <span className='text-5xl font-bold' >{value}</span>
      </div>
    </div>
  )
}

export default Card
