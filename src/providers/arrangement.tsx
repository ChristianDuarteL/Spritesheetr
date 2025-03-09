import { createContext, useContext, useEffect, useState } from "react";
import { useImages } from "./images";

type NumberOrAuto = number | "auto";

type Insets = [number, number, number, number];

type Gap = [number, number];

interface Box {
    x: number;
    y: number;
    width: number;
    height: number;
}

type Arrangement = Record<string, Box>;

interface Size {
    width: number;
    height: number;
}

interface ArrangementContextType {
    autoArrange: boolean;
    setAutoArrange: (autoArrange: boolean) => void;
    arrangement: Arrangement;
    width: NumberOrAuto;
    setWidth: (width: NumberOrAuto) => void;
    height: NumberOrAuto;
    setHeight: (height: NumberOrAuto) => void;
    margin: Insets;
    setMargin: (margin: Insets) => void;
    padding: Gap;
    setPadding: (gap: Gap) => void;
    calculatedSize: Size;
}

const ArrangementContext = createContext<ArrangementContextType | undefined>(undefined);

export const ArrangementProvider: React.FC<{ children?: React.ReactNode | undefined }> = ({children}) => {
    const [ autoArrange, setAutoArrange ] = useState(true);
    const [ width, setWidth ] = useState<NumberOrAuto>("auto");
    const [ height, setHeight ] = useState<NumberOrAuto>("auto");
    const [ margin, setMargin ] = useState<Insets>([0, 0, 0, 0]);
    const [ padding, setPadding ] = useState<Gap>([0, 0]);
    const [ arrangement, setArrangement ] = useState<Arrangement>({});
    const [ calculatedSize, setCalculatedSize ] = useState<Size>({width: 0, height: 0});

    const { images } = useImages();

    useEffect(() => {
        if (autoArrange) {
            const imagesArr = Object.entries(images);
            if (imagesArr.length === 0) return;
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

            setCalculatedSize({width, height: y});

            setArrangement(() => {
                const arrangement: Arrangement = {};
                let x = 0;
                let y = 0;
                let heightInRow = imagesArr[0][1].height;
                for (const [key, image] of imagesArr) {
                    if (x + image.width > width || heightInRow != image.height) {
                        x = image.width;
                        heightInRow = image.height;
                        y += heightInRow;
                        arrangement[key] = {
                            x: 0,
                            y,
                            width: image.width,
                            height: image.height
                        }
                    }else{
                        arrangement[key] = {
                            x,
                            y,
                            width: image.width,
                            height: image.height
                        }
                        x += image.width;
                    }
                }
                return arrangement;
            })
        }
    }, [autoArrange, images, margin, padding])

    return <ArrangementContext.Provider value={{
        autoArrange,
        setAutoArrange,
        width,
        setWidth,
        height,
        setHeight,
        margin,
        setMargin,
        padding,
        setPadding,
        arrangement,
        calculatedSize
    }}>
        {children}
    </ArrangementContext.Provider>
}

export const useArrangement = (): ArrangementContextType => {
    const context = useContext(ArrangementContext);
    if (!context) {
        throw new Error("useArrangement must be used within a ArrangementProvider");
    }
    return context;
};