import { PropsWithChildren, ReactNode } from "react";
import cx from "../lib/cx";

export interface PanelProps {
    title: ReactNode;
    collapsed?: boolean;
    className?: string;
}

export default function Panel(props: PropsWithChildren<PanelProps>) {
    return <section className='noisy-background flex flex-col border border-background-300 rounded-lg h-full overflow-hidden'>
        <header className={`py-2 px-2 flex items-center ${!props.collapsed ? "border-b border-background-300" : "flex-1"}`}>
            {props.title}
        </header>
        <div className={cx("flex-1 flex flex-col p-2 px-2 scrollbar-bg-background-100 scrollbar-fg-background-300 scrollbar", !props.collapsed ? "overflow-auto" : "hidden", props.className)}>
            {props.children}
        </div>
    </section>;
}