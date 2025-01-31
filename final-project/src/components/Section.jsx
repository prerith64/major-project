import React from 'react';

const Section = ({ title, message, src, inverse }) => {
  return (
    <div className="w-full h-full flex bg-white p-10 font-semibold flex-wrap justify-center">
      <img
        className={`rounded-3xl flex w-full sm:w-[600px] ${inverse ? 'order-2 sm:order-1' : 'order-1 sm:order-2'}`}
        src={src}
        alt="Section image"
      />
      <div className={`flex-1 flex flex-col p-6 items-center gap-6 ${inverse ? 'order-1 sm:order-2 ml-0 sm:ml-12' : 'order-2 sm:order-1 ml-12 sm:ml-12'}`}>
        <h1 className="text-6xl font-bold">{title}</h1>
        <p className="text-3xl text-justify px-5">{message}</p>
      </div>
    </div>
  );
};

export default Section;
