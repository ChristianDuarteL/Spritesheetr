import { createContext, useContext, useEffect, useState } from "react";
import { useImages } from "./images";
import { Image } from "../types";
import { SINGLE_COLUMN } from "../consts/arrangements";

type Insets = [number, number, number, number];

export type Gap = [number, number];

export interface Box {
    x: number;
    y: number;
    width: number;
    height: number;
}

export type Arrangement = Record<string, Box>;

export interface Size {
    width: number;
    height: number;
}

interface ArrangementContextType {
    autoArrange: boolean;
    setArrangementFunction: (arrangementFunction: ArrangementFunction) => void;
    setAutoArrange: (autoArrange: boolean) => void;
    arrangement: Arrangement;
    margin: Insets;
    setMargin: (margin: Insets) => void;
    padding: Gap;
    setPadding: (gap: Gap) => void;
    calculatedSize: Size;
}

export interface ArrangementFunction {
    calculateSize: (images: [string, Image][], padding: Gap) => Size;
    arrangementCalculation: (images: [string, Image][], size: Size, padding: Gap) => Arrangement;
}

const defaultArrangementFunction: ArrangementFunction = SINGLE_COLUMN;

const ArrangementContext = createContext<ArrangementContextType | undefined>(undefined);

export const ArrangementProvider: React.FC<{ children?: React.ReactNode | undefined }> = ({children}) => {
    const [ autoArrange, setAutoArrange ] = useState(true);
    const [ margin, setMargin ] = useState<Insets>([0, 0, 0, 0]);
    const [ padding, setPadding ] = useState<Gap>([0, 0]);
    const [ arrangement, setArrangement ] = useState<Arrangement>({});
    const [ calculatedSize, setCalculatedSize ] = useState<Size>({width: 0, height: 0});
    const [ arrangementFunction, setArrangementFunction ] = useState<ArrangementFunction>(defaultArrangementFunction);

    const { images } = useImages();

    useEffect(() => {
        if (autoArrange) {
            const imagesArr = Object.entries(images);
            if (imagesArr.length === 0) return;
            const size = arrangementFunction.calculateSize(imagesArr, padding);
            setCalculatedSize(size);
            setArrangement(arrangementFunction.arrangementCalculation(imagesArr, size, padding));
        }
    }, [autoArrange, images, margin, padding, arrangementFunction])

    return <ArrangementContext.Provider value={{
        autoArrange,
        setAutoArrange,
        margin,
        setMargin,
        padding,
        setPadding,
        arrangement,
        calculatedSize,
        setArrangementFunction
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