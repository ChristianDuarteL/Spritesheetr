import { useCallback, useState } from 'react';
import './App.css'
import GetStartedTitle from './GetStartedTitle'

function App() {
  const [show, setShow] = useState(true);
  const callback = useCallback(() => {
    setShow(false)
  }, []);

  return <div className='flex-1 flex w-full flex-col items-center bg-background-50'>
    <div className="flex justify-center flex-1 items-center w-full max-w-7xl relative h-full">
      <GetStartedTitle show={show} callback={callback} />
    </div>
  </div>
}

export default App
