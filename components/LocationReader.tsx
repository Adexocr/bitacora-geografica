import * as Location from 'expo-location';

export async function getCurrentCoordinates(): Promise<{ latitude: number; longitude: number } | null> {
    const { status } = await Location.getForegroundPermissionsAsync();
    if (status !== 'granted') return null;

    const location = await Location.getCurrentPositionAsync({});
    return {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
    };
}
// Esta funcion es asincrona y devuelve las coordenadas o null si no habia permiso. 