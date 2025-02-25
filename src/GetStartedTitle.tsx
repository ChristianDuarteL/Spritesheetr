import { Transition } from "@headlessui/react";
import { memo } from "react";

interface GetStartedTitleProps {
    show: boolean;
    callback: () => void;
}

function GetStartedTitle({
    show,
    callback
}: GetStartedTitleProps) {
    return <div className='overflow-hidden absolute top-0 left-0 w-full h-full'>
        <Transition show={show} enter='transform ease-out duration-300 transition' enterFrom='translate-y-full' enterTo='translate-y-0' leave='transform ease-in duration-300 transition' leaveFrom='translate-y-0' leaveTo='-translate-y-full'>
            <div className='flex items-center justify-center h-screen flex-col gap-4'>
                <div className='text-center flex flex-col gap-2'> 
                    <h1 className='text-5xl font-bold text-primary-400'>Spritesheetr</h1>
                    <p className='text-2xl text-primary-300'>A tool to create spritesheets from images</p>
                </div>
                <button onClick={callback} className='bg-secondary-600 text-white px-6 py-3 rounded-full cursor-pointer transition hover:bg-secondary-700 hover:shadow-lg shadow-sm active:bg-secondary-800 active:shadow-none'>
                    Get spriting
                </button>
            </div>
        </Transition>
    </div>;
}

export default memo(GetStartedTitle);