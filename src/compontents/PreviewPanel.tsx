import { useEffect, useRef } from "react";
import { useImages } from "../providers/images";
import { useArrangement } from "../providers/arrangement";


export default function PreviewPanel() {
    const { images } = useImages();
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const { arrangement, calculatedSize } = useArrangement();
    useEffect(() => {
        if (!canvasRef.current) return;
        const ctx = canvasRef.current.getContext("2d");
        if(!ctx) return;
        canvasRef.current.width = calculatedSize.width;
        canvasRef.current.height = calculatedSize.height;
        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        for (const [key, box] of Object.entries(arrangement)) {
            const image = images[key];
            if (!image) continue;
            ctx.drawImage(image.image_element, 0, 0, image.width, image.height, box.x, box.y, box.width, box.height);  
            console.log(box)
        }
    }, [images, calculatedSize, arrangement]);


    return (
        <div className="flex items-center justify-center h-full">
            <canvas className="max-w-full max-h-full" ref={canvasRef} />
        </div>
    );
}