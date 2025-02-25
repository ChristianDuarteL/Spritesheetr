import { PropsWithChildren, ReactNode } from "react";

export interface PanelProps {
    title: ReactNode;
    collapsed?: boolean;
}

export default function Panel(props: PropsWithChildren<PanelProps>) {
    return <section className='noisy-background flex flex-col border border-background-950/25 rounded-lg h-full'>
        <header className={`py-2 px-3 flex items-center ${!props.collapsed ? "border-b border-background-950/25" : "flex-1"}`}>
            {props.title}
        </header>
        <div className={`flex-1 flex flex-col p-2 px-4 ${!props.collapsed ? "overflow-auto" : "hidden"}`}>
            {props.children}
        </div>
    </section>;
}