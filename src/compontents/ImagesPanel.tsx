import ImagePanelItem from "./ImagePanelItem";
import ResizablePanel from "./ResizablePanel";
import { useImages } from "../providers/images";
import { useCallback } from "react";
import {useDropzone} from 'react-dropzone'
import { Upload } from "lucide-react";
import { makeFromFile } from "../lib/images";

export default function ImagesPanel() {
    const { images, renameImage, addImage, removeImage } = useImages();

    const onDrop = useCallback((acceptedFiles: File[]) => {
        console.log(acceptedFiles)
        acceptedFiles.forEach(e => {
            makeFromFile(e).then(addImage)
        })
    }, [addImage]);

    const {getRootProps, getInputProps, isDragActive} = useDropzone({
        noClick: true,
        autoFocus: false,
        noKeyboard: true,
        onDrop
    });

    return (
        <ResizablePanel title="Images" className="p-0">
            <div className="w-full min-h-full relative" {...getRootProps()}>
                <div className="w-full grid grid-cols-3 gap-4 p-4">
                    {Object.entries(images).map(([i, e]) => <ImagePanelItem key={i} id={i} image={e} setName={renameImage} delete={removeImage}/>)}
                </div>
                <input {...getInputProps()} className="hidden"/>
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