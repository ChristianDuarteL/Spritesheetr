import React, { createContext, ReactNode, useCallback, useContext, useReducer } from "react";
import { Image } from "../types";
import { v1 as uuid } from "uuid";

type KeyType = string;

interface RenameImageAction {
    type: "RENAME_IMAGE",
    payload: {
        id: KeyType;
        newName: string;
    }
}

interface AddImageAction {
    type: "ADD_IMAGE",
    payload: {
        image: Image;
    }
}

interface RemoveImageAction {
    type: "REMOVE_IMAGE",
    payload: {
        id: KeyType
    }
}

type State = Record<KeyType, Image>;

type Action =   | RenameImageAction
                | RemoveImageAction
                | AddImageAction;

const imageReducer = (state: State, action: Action) => {
    switch(action.type) {
        case "RENAME_IMAGE":
            return {...state, [action.payload.id]: {
                ...state[action.payload.id],
                name: action.payload.newName
            }}
        case "ADD_IMAGE":
            return {
                ...state,
                [uuid()]: action.payload.image
            }
        case "REMOVE_IMAGE": {
            const m = {
                ...state
            };
            delete m[action.payload.id];
            console.log(m)
            return m;
        }
    }
}

interface ImageContextType {
    images: State;
    renameImage: (id: KeyType, newName: string) => void;
    addImage: (image: Image) => void;
    removeImage: (id: KeyType) => void;
}

const ImageContext = createContext<ImageContextType | undefined>(undefined);

export const ImageProvider: React.FC<{ children?: ReactNode | undefined }> = ({children}) => {
    const [images, dispatch] = useReducer(imageReducer, {});
    
    const renameImage = useCallback((id: KeyType, newName: string) => {
        dispatch({
            type: 'RENAME_IMAGE',
            payload: {
                id,
                newName
            }
        })
    }, [])

    const addImage = useCallback((image: Image) => {
        dispatch({
            type: "ADD_IMAGE",
            payload: {
                image
            }
        })
    }, [])

    const removeImage = useCallback((id: KeyType) => {
        dispatch({
            type: "REMOVE_IMAGE",
            payload: {
                id
            }
        })
    }, []) 

    return (<ImageContext.Provider value={{images, renameImage, addImage, removeImage}}>
        {children}
    </ImageContext.Provider>)
}

export const useImages = (): ImageContextType => {
    const context = useContext(ImageContext);
    if (!context) {
        throw new Error("useImages must be used within a ImageProvider");
    }
    return context;
};