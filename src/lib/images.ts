import { Image } from "../types";

export const makeFromFile: (file: File) => Promise<Image> = (file: File) => {
    return new Promise((res, rej) => {
        try{
            
            const image = document.createElement('img');
            image.onload = () => {
                res({
                    file,
                    name: file.name.substring(0, file.name.lastIndexOf('.')),
                    image_element: image,
                    height: image.height,
                    width: image.width,
                    url: image.src
                })
            };
            
            image.onerror = () => {
                rej(new Error("Couldn't load the image"));
            }

            image.src = URL.createObjectURL(file)
        }catch(e){
            rej(e);
        }
    })
}