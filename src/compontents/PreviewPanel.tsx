import { useEffect, useRef } from "react";
import { useImages } from "../providers/images";


export default function PreviewPanel() {
    const { images } = useImages();
    const canvasRef = useRef<HTMLCanvasElement>(null);
    
    useEffect(() => {
        if (!canvasRef.current) return;
        const ctx = canvasRef.current.getContext("2d");
        if(!ctx) return;
        const imagesArr = Object.entries(images);
        if (imagesArr.length === 0) return;
        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        const imageSizes = new Map();
        for (const [, image] of imagesArr) {
            if(imageSizes.has(image.width)){
                imageSizes.set(image.width, imageSizes.get(image.width) + 1);
                continue;
            }
            imageSizes.set(image.width, 1);
        }
        let maxCount = 0, maxCountWidth = 0;
        for (const [width, count] of imageSizes.entries()) {
            if (count > maxCount) {
                maxCount = count;
                maxCountWidth = width;
            }
        }
        const width = Math.round(Math.sqrt(maxCount)) * maxCountWidth;
        let heightInRow = imagesArr[0][1].height;
        let x = 0, y = heightInRow;
        for (const [, image] of imagesArr) {
            x += image.width;
            if (x > width || heightInRow != image.height) {
                x = image.width;
                heightInRow = image.height;
                y += heightInRow;
            }
        }

        console.log(width, heightInRow, y, maxCountWidth, maxCount)
        canvasRef.current.width = width;
        canvasRef.current.height = y;

        x = 0;
        y = 0;
        heightInRow = imagesArr[0][1].height;
        for (const [, image] of imagesArr) {
            if (x + image.width >= width || heightInRow != image.height) {
                x = 0;
                heightInRow = image.height;
                y += heightInRow;
                ctx.drawImage(image.image_element, 0, 0, image.width, image.height, x, y, image.width, image.height);
            }else{
                ctx.drawImage(image.image_element, 0, 0, image.width, image.height, x, y, image.width, image.height);
                x += image.width;
            }
        }

    }, [images]);


    return (
        <div className="flex items-center justify-center h-full">
            <canvas className="max-w-full max-h-full" ref={canvasRef} />
        </div>
    );
}