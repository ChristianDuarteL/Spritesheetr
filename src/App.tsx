import { useCallback, useState } from 'react';
import './App.css'
import GetStartedTitle from './GetStartedTitle'
import { get, set } from './lib/localstorage';
import Panel from './compontents/Panel';
import ResizablePanel from './compontents/ResizablePanel'; 
import { PanelGroup } from 'react-resizable-panels';
import ResizeHandle from './compontents/ResizeHandle';
import ImagesPanel from './compontents/ImagesPanel';
import { ImageProvider } from './providers/images';
import PreviewPanel from './compontents/PreviewPanel';

function App() {
  const [show, setShow] = useState(() => {
    return get('showInitialScreen', import.meta.env.VITE_SHOW_INITIAL_SCREEN === 'true');
  });
  const callback = useCallback(() => {
    setShow(false);
    if (import.meta.env.VITE_SAVE_INITIAL_SCREEN === 'true')
      set('showInitialScreen', false);
  }, []);

  return <ImageProvider>
    <div className='flex-1 flex w-full flex-col items-center background'>
      <div className="flex justify-center flex-col flex-1 items-center w-full max-w-7xl relative h-full">
        <GetStartedTitle show={show} callback={callback} />
        {!show && <div className='flex flex-col gap-4 flex-1 w-full max-w-7x py-4'>
          <div className='w-full flex-1 grid grid-cols-[1fr_2fr] gap-2'>
            <PanelGroup direction='vertical'>
              <ImagesPanel />
              <ResizeHandle/> 
              <ResizablePanel title="Arrangement">
              </ResizablePanel>
              <ResizeHandle/> 
              <ResizablePanel title="Properties">
              </ResizablePanel>
            </PanelGroup>
            <Panel title='View'>
              <PreviewPanel />
            </Panel>
          </div>
        </div>}
      </div>
    </div>
  </ImageProvider>;
}

export default App
