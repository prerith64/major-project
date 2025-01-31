import React, { useState } from 'react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-[#5A0073] p-4">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="text-white text-2xl font-bold"><img className='w-32 rounded-full'  src="https://w7.pngwing.com/pngs/337/291/png-transparent-indian-army-national-defence-academy-indian-military-academy-siachen-glacier-army-miscellaneous-logo-india.png" alt="" /></div>

        {/* Hamburger Menu (Mobile) */}
        <div className="sm:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-white focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={isOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
              ></path>
            </svg>
          </button>
        </div>

        {/* Links (Hidden on Mobile) */}
        <div className={`fixed top-0 right-0 h-full bg-[#5A0073] z-50 transform transition-transform duration-300 ${isOpen ? 'translate-x-0' : 'translate-x-full'} sm:translate-x-0 w-3/4 sm:w-auto sm:static sm:flex sm:items-center`}>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-center h-full">
            <button
              onClick={() => setIsOpen(false)}
              className="text-white self-end m-4 sm:hidden"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            </button>
            <ul className="flex sm:flex-row flex-col  gap-4 text-white text-lg sm:mt-0 p-4 sm:p-0 h-full sm:h-auto">
              <li>
                <a href="/" className="hover:text-gray-300 font-bold text-3xl">
                  Home
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-300 font-bold text-3xl">
                  About Us
                </a>
              </li>
              <li>
                <a href="/alert" className="hover:text-gray-300 font-bold text-3xl">
                  Alert
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
