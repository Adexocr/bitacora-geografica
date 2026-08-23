import { Stack } from 'expo-router';
import { PhotosProvider } from '../context/PhotosContext';

export default function RootLayout() {
    return (
        <PhotosProvider>
            <Stack screenOptions={{ headerShown: false }}/>
        </PhotosProvider>
    );
  }
