import React from 'react'

const CardComp = ({name,src,onClick}) => {
  return (
    <div className='flex-row   h-[300px] w-[300px]  rounded-sm  shadow-lg p-5 hover:scale-[110%] hover:bg-purple-50 hover:text-purple-900 text-center  '  onClick={onClick}>
      <img className='h-3/4 w-full bg-contain' src={src} alt="monitor" />
      <h1 className='text-3xl font-bold p-4'>{name}</h1>
    </div>
  )
}

export default CardComp
