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
import { ArrangementProvider } from './providers/arrangement';
import ArrangementPanel from './compontents/ArrangementPanel';
import AppLogo from './compontents/AppLogo';
import { SettingsIcon } from 'lucide-react';
import { Transition } from '@headlessui/react';

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
    <ArrangementProvider>
      <div className='flex-1 flex w-full flex-col items-center background overflow-hidden'>
        <div className="flex justify-center flex-col flex-1 items-center w-full max-w-7xl relative h-full">
          <GetStartedTitle show={show} callback={callback} />
          <Transition show={true} appear={true} enter='duration-300 transition ease-[cubic-bezier(0.34,_1.4,_0.64,_1)]' enterFrom='blur-xl opacity-0 scale-150' enterTo='blur-none opacity-100 scale-100'>
            <div className='flex flex-col gap-4 flex-1 w-full max-w-7x py-4 z-10'>
              <div className='w-full flex-1 grid grid-cols-[1fr_2fr] gap-2'>
                <div className="flex flex-col gap-2">
                  <div className="flex gap-2 h-14 items-center p-2 justify-between">
                    <AppLogo className='h-10 text-primary-400'/>
                    <button onClick={callback} className='w-10 h-10 rounded-md transition-colors duration-150 flex items-center justify-center cursor-pointer text-primary-400 active:text-primary-300 hover:bg-primary-100 active:bg-primary-100/60'>
                      <SettingsIcon />
                    </button>
                  </div>
                  <PanelGroup direction='vertical'>
                    <ImagesPanel />
                    <ResizeHandle/> 
                    <ArrangementPanel />
                    <ResizeHandle/> 
                    <ResizablePanel title="Properties">
                    </ResizablePanel>
                  </PanelGroup>
                </div>
                <Panel title='View'>
                  <PreviewPanel />
                </Panel>
              </div>
            </div>
          </Transition>
        </div>
      </div>
    </ArrangementProvider>
  </ImageProvider>;
}

export default App
