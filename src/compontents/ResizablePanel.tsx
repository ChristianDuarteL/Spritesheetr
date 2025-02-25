import { Panel as ResizablePanelsPanel } from "react-resizable-panels";
import Panel, { PanelProps } from "./Panel";
import { PropsWithChildren, useState } from "react";

export default function ResizablePanel({children, ...props}: PropsWithChildren<PanelProps>) {
    const [collapsed, setCollapsed] = useState(false);

    return <ResizablePanelsPanel minSize={15} collapsedSize={5} collapsible={true} onCollapse={() => setCollapsed(true)} onExpand={() => setCollapsed(false)}> 
        <Panel {...props} collapsed={collapsed}>
            {children}
        </Panel>
    </ResizablePanelsPanel>;
}