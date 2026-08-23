import { createContext, useContext, useState, ReactNode } from 'react';
import { Photo } from '../types/Photo';

type PhotosContextType = {
    photos: Photo[];
    addPhoto: (photo: Photo) => void;

};

const PhotosContext = createContext<PhotosContextType | undefined>(undefined);

export function PhotosProvider({ children }: { children: ReactNode }) {
    const [photos, setPhotos] = useState<Photo[]>([]);

    const addPhoto = (photo: Photo) => {
        setPhotos([...photos, photo]);
    };

}

return (
    <PhotosContext.Provider value={{ photos, addPhoto }}>
        {children}
    </PhotosContext.Provider>
);
}

export function usePhotos() {
    const context = useContext(PhotosContext);
    if (!context) {
        throw new Error('usePhotos must be used within a PhotosProvider');
    }
    return context;
}
