export default function Button({children, onClick}: {children: React.ReactNode, onClick: () => void}) {
    return <button className="h-9 px-4 py-2 inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium ring-offset-background-200 ring-primary-500 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-primary-500 text-white hover:bg-primary-400 active:bg-primary-300 active:ring-primary-300 cursor-pointer" onClick={onClick}> 
        {children}
    </button>
}