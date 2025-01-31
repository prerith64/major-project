import React, { useContext, useState } from 'react';
import { DataContext } from './DataContext.tsx';
import { Message } from 'semantic-ui-react';

const Alert = () => {
  const { data, Injured, message } = useContext(DataContext);
  const [state, setState] = useState(true);

  const handleDismiss = () => {
    setState(false);

    setTimeout(() => {
      setState(true);
    }, 2000);
  };

  return (
    <div className='p-3 bg-[#2C2C2C] text-2xl h-screen'>
      <h1 className='text-4xl font-bold text-red-600'>Messages</h1>
      {state  && (
        <Message
          error
          onDismiss={handleDismiss}
          header="Alert"
          content={message}
        />
      )}
    </div>
  );
};

export default Alert;
