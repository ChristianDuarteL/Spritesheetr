import ImagePanelItem from "./ImagePanelItem";
import ResizablePanel from "./ResizablePanel";
import { useImages } from "../providers/images";
import { useCallback } from "react";
import {useDropzone} from 'react-dropzone'
import { PlusCircle, Upload } from "lucide-react";
import { makeFromFile } from "../lib/images";
import Button from "./Button";

export default function ImagesPanel() {
    const { images, renameImage, addImage, removeImage, hasImages } = useImages();

    const onDrop = useCallback((acceptedFiles: File[]) => {
        console.log(acceptedFiles)
        acceptedFiles.forEach(e => {
            makeFromFile(e).then(addImage)
        })
    }, [addImage]);

    const {getRootProps, getInputProps, isDragActive, open } = useDropzone({
        noClick: true,
        accept: {"image/*": []},
        autoFocus: false,
        noKeyboard: true,
        onDrop
    });

    return (
        <ResizablePanel title="Images" className="p-0">
            <div className="w-full min-h-full relative" {...getRootProps()}>
                <div className="w-full grid grid-cols-3 gap-4 p-4">
                    {Object.entries(images).map(([i, e]) => <ImagePanelItem key={i} id={i} image={e} setName={renameImage} delete={removeImage}/>)}
                    {hasImages ? <button onClick={open} className="p-2 rounded-md bg-accent-100 focus:bg-accent-50 focus:text-accent-400/80 active:text-accent-200 active:bg-accent-50/95 transition-colors shadow-md flex flex-col items-center justify-center text-accent-400 cursor-pointer">
                        <PlusCircle className="h-10 w-10"/>
                        <span className="uppercase text-sm font-semibold">Add more</span> 
                    </button> : null}
                </div>
                <input {...getInputProps()} className="hidden"/>
                { 
                    !hasImages && 
                    <div className="absolute w-full h-full top-0 left-0 bg-accent-300/40 flex items-center justify-center flex-col gap-2">
                        <Button onClick={open}>Browse</Button>
                        <span>Or drop your images here</span> 
                    </div>
                }
                {
                    isDragActive && 
                    <div className="absolute w-full h-full top-0 left-0 bg-accent-300/40 flex items-center justify-center flex-col gap-2">
                        <Upload className="h-10 w-10" />
                        <span>Drop your images here</span>
                    </div>
                }
            </div>
        </ResizablePanel>
    );
}