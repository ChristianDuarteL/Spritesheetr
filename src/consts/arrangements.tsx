import { Arrangement, ArrangementFunction, Gap, Size } from "../providers/arrangement";
import { Image } from "../types";

export const BY_COVERAGE: ArrangementFunction = {
    calculateSize: (images: [string, Image][], padding: Gap) => {
        const imageCountByWidth = new Map();
        const imageAreaByWidth = new Map();
        for (const [, image] of images) {
            if(imageCountByWidth.has(image.width)){
                imageCountByWidth.set(image.width, imageCountByWidth.get(image.width) + 1);
                imageAreaByWidth.set(image.width, imageAreaByWidth.get(image.width) + image.width * image.height);
                continue;
            }
            imageCountByWidth.set(image.width, 1);
            imageAreaByWidth.set(image.width, image.width * image.height);
        }
        let maxCount = 0, maxCountWidth = 0, maxArea = 0;
        let maxImageWidth = 0;
        for (const [width, count] of imageCountByWidth.entries()) {
            const area = imageAreaByWidth.get(width);
            if (area > maxArea) {
                maxCount = count;
                maxCountWidth = width;
                maxArea = area;
            }
            if(width > maxImageWidth){
                maxImageWidth = width;
            }
        }
        const count = Math.round(Math.sqrt(maxCount));
        const width = Math.max(count * maxCountWidth + padding[0] * (count - 1), maxImageWidth);
        let heightInRow = images[0][1].height;
        let x = 0, y = heightInRow;
        for (const [, image] of images) {
            x += image.width + padding[0];
            if (x > width || heightInRow != image.height) {
                x = image.width;
                heightInRow = image.height;
                y += heightInRow + padding[1];
            }
        }
        
        return {width, height: y};
    },
    arrangementCalculation: (images: [string, Image][], {width}: Size, padding: Gap) => {
        const arrangement: Arrangement = {};
        let x = 0;
        let y = 0;
        let heightInRow = images[0][1].height;
        for (const [key, image] of images) {
            if (x + image.width > width || heightInRow != image.height) {
                y += heightInRow + padding[1];
                x = image.width + padding[0];
                heightInRow = image.height;
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
                x += image.width + padding[0];
            }
        }
        return arrangement;
    }
}

export const SINGLE_ROW: ArrangementFunction = {
    calculateSize: (images: [string, Image][], padding: Gap) => {
        let width = -padding[0];
        let maxHeight = 0;
        for (const [, image] of images) {
            width += image.width + padding[0];
            if(image.height > maxHeight){
                maxHeight = image.height;
            }
        }
        return {width, height: maxHeight};
    },
    arrangementCalculation: (images: [string, Image][], _: Size, padding: Gap) => {
        const arrangement: Arrangement = {};
        let x = 0;
        for (const [key, image] of images) {
            arrangement[key] = {
                x,
                y: 0,
                width: image.width,
                height: image.height
            }
            x = x + image.width + padding[0];
        }
        return arrangement;
    }
}

export const SINGLE_COLUMN: ArrangementFunction = {
    calculateSize: (images: [string, Image][], padding: Gap) => {
        let height = -padding[1];
        let maxWidth = 0;
        for (const [, image] of images) {
            height += image.height + padding[1];
            if(image.height > maxWidth){
                maxWidth = image.width;
            }
        }
        return {height, width: maxWidth};
    },
    arrangementCalculation: (images: [string, Image][], _, padding: Gap) => {
        const arrangement: Arrangement = {};
        let y = 0;
        for (const [key, image] of images) {
            arrangement[key] = {
                y,
                x: 0,
                width: image.width,
                height: image.height
            }
            y = y + image.height + padding[1];
        }
        return arrangement;
    }
}


interface ArrangementFunctionData {
    name: string;
    arrangementFunction: ArrangementFunction;
}

const arrangements: {[key: string]: ArrangementFunctionData} = {
    by_coverage: {
        name: "By coverage",
        arrangementFunction: BY_COVERAGE
    },
    single_row: {
        name: "Single row",
        arrangementFunction: SINGLE_ROW
    },
    single_column: {
        name: "Single column",
        arrangementFunction: SINGLE_COLUMN
    },
};

export default arrangements;