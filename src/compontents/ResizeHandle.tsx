import { PanelResizeHandle } from "react-resizable-panels";

export default function ResizeHandle() {
    return <PanelResizeHandle>
        <div className='h-3 flex justify-center items-center gap-1'>
            <div className='bg-primary-300 w-1 h-1 rounded-full'></div>
            <div className='bg-primary-300 w-1 h-1 rounded-full'></div>
            <div className='bg-primary-300 w-1 h-1 rounded-full'></div>
        </div>
    </PanelResizeHandle>;
}