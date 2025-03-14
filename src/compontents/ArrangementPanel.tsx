import { useEffect, useState } from "react";
import arrangements from "../consts/arrangements";
import { useArrangement } from "../providers/arrangement";
import ResizablePanel from "./ResizablePanel";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "./Select";
import { safeParseInt, setGapComponent, setInsetsComponent } from "../lib/math";

export default function ArrangementPanel() {
    const { setArrangementFunction, padding, setPadding, margin, setMargin } = useArrangement();
    const [arrangement, setArrangement] = useState("by_coverage");

    useEffect(() => {
        setArrangementFunction(arrangements[arrangement].arrangementFunction);
    }, [arrangement, setArrangementFunction]);

    return (
        <ResizablePanel title="Arrangement">
            <div className="flex flex-col gap-2">
                <Select onValueChange={(e) => setArrangement(e)} value={arrangement}>
                    <SelectTrigger className="w-full bg-accent-200 outline-none border-accent-700">
                        <SelectValue placeholder="Select a fruit" />
                    </SelectTrigger>
                    <SelectContent className="bg-accent-200 border-accent-700">
                        <SelectGroup>
                            {Object.entries(arrangements).map(([k, v]) => <SelectItem className="data-[highlighted]:bg-accent-100" key={k} value={k}>{v.name}</SelectItem>)}
                        </SelectGroup>
                    </SelectContent>
                </Select>
                <div className="flex flex-col gap-2">
                    <label className="text-sm font-semibold text-accent-900">Padding:</label>
                    <div className="flex gap-2">
                        <input value={padding[0]} onChange={v => setPadding(setGapComponent(padding, 0, safeParseInt(v.target.value)))} type="number" className="w-full p-2 rounded-md bg-accent-200 border-1 border-accent-700 text-sm" placeholder="Horizontal"/>
                        <input value={padding[1]} onChange={v => setPadding(setGapComponent(padding, 1, safeParseInt(v.target.value)))} type="number" className="w-full p-2 rounded-md bg-accent-200 border-1 border-accent-700 text-sm" placeholder="Vertical"/> 
                    </div>
                </div>
                <div className="flex flex-col gap-2">
                    <label className="text-sm font-semibold text-accent-900">Margin:</label>
                    <div className="flex gap-2">
                        <input value={margin[0]} onChange={v => setMargin(setInsetsComponent(margin, 0, safeParseInt(v.target.value)))} type="number" className="w-full p-2 rounded-md bg-accent-200 border-1 border-accent-700 text-sm" placeholder="Horizontal"/>
                        <input value={margin[1]} onChange={v => setMargin(setInsetsComponent(margin, 1, safeParseInt(v.target.value)))} type="number" className="w-full p-2 rounded-md bg-accent-200 border-1 border-accent-700 text-sm" placeholder="Vertical"/> 
                    </div>
                    <div className="flex gap-2">
                        <input value={margin[2]} onChange={v => setMargin(setInsetsComponent(margin, 2, safeParseInt(v.target.value)))} type="number" className="w-full p-2 rounded-md bg-accent-200 border-1 border-accent-700 text-sm" placeholder="Horizontal"/>
                        <input value={margin[3]} onChange={v => setMargin(setInsetsComponent(margin, 3, safeParseInt(v.target.value)))} type="number" className="w-full p-2 rounded-md bg-accent-200 border-1 border-accent-700 text-sm" placeholder="Vertical"/> 
                    </div>
                </div>
            </div>
        </ResizablePanel>
    );
}