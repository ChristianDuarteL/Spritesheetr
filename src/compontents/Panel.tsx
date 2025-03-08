import { PropsWithChildren, ReactNode } from "react";
import cx from "../lib/cx";

export interface PanelProps {
    title: ReactNode;
    collapsed?: boolean;
    className?: string;
}

export default function Panel(props: PropsWithChildren<PanelProps>) {
    return <section className='noisy-background flex flex-col border border-background-950/25 rounded-lg h-full'>
        <header className={`py-2 px-2 flex items-center ${!props.collapsed ? "border-b border-background-950/25" : "flex-1"}`}>
            {props.title}
        </header>
        <div className={cx("flex-1 flex flex-col p-2 px-2", !props.collapsed ? "overflow-auto" : "hidden", props.className)}>
            {props.children}
        </div>
    </section>;
}