import { ChangeEvent, memo } from "react";
import { Image } from "../types";
import { XIcon } from "lucide-react";

interface ImagePanelItemProps {
    id: string;
    image: Image;
    setName: (id: string, name: string) => void;
    delete: (id: string) => void;
}

function _ImagePanelItem(props: ImagePanelItemProps) {
    return (
        <div className="group p-2 rounded-md bg-accent-200 shadow-md flex flex-col gap-2 relative">
            <div className="aspect-square rounded-sm overflow-hidden bg-accent-50">
                <img className="w-full h-full object-contain" src={props.image.url}/>
            </div>
            <input className="hover:bg-accent-300/50 focus:bg-accent-300 rounded-sm p-1 text-sm outline-0" type="text" value={props.image.name} onChange={(element: ChangeEvent) => props.setName(props.id, (element.target as HTMLInputElement).value)}/>
            <div className="opacity-0 transform translate-y-2 group-hover:translate-y-0 group-hover:opacity-100 transition absolute -right-2 -top-2 rounded-full shadow-sm">
                <button className="bg-accent-50 p-1 rounded-full shadow-sm cursor-pointer" onClick={() => props.delete(props.id)}>
                    <XIcon></XIcon>
                </button>
            </div>
        </div>
    );
}

const ImagePanelItem = memo(_ImagePanelItem);

export default ImagePanelItem;