import React from 'react'

const Footer = () => {
  return (
    <div className='bg-[#5A0073] w-full relative bottom-0 mt-[50px] h-full text-white text-3xl p-[100px]'>
      <div className='flex flex-wrap gap-12' >
       <div className='flex-1 '>
       <h1 className='text-4xl font-bold border-[#8200A6] border-b-4 inline ' >About us</h1>
       <p  className='text-justify'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui consectetur necessitatibus voluptate.</p>
       </div>
       <div className='flex-1'>
           <h1 className='text-4xl font-bold border-[#8200A6] border-b-4 inline' >Use full Links</h1>
          <ul>
            <li><a href="">Home</a></li>
            <li><a href="">About us</a></li>
          </ul>
       </div>
       <div className='flex-1'>
           <h1  className='text-4xl font-bold border-[#8200A6] border-b-4 inline' >contact</h1>
          <ul>
            <li> Phone:91+ 8088456821</li>
            <li>any@gmail.com</li>
            <li>linkdin.com</li>
          </ul>
       </div>
      </div>
    </div>
  )
}

export default Footer
