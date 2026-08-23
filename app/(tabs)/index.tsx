import { useCameraPermissions } from 'expo-camera';
import * as Location from 'expo-location';
import { useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

export default function CaptureScreen() {
  const [ cameraPermission, requestCameraPermission ] = useCameraPermissions();
  const [ locationStatus, setLocationStatus ] = useState<string | null>(null);

  async function requestLocationPermission() {
    const { status } = await Location.requestForegroundPermissionsAsync();
    setLocationStatus(status);
  }

  // validacion del estado de la camara y persmisos

  if (!cameraPermission) {
    return (
    <View style={styles.center}>
    <View><Text> Cargando permisos...</Text></View>
    </View>
    );
  }

  // Si el usuario denega los permisos de la camara, se le muestra un mensaje

  if (!cameraPermission.granted) {
    return (
      <View style={styles.center}>
        <Text style ={styles.message}>
          Necesitamos permisos de la cámara para poder tomar y guardar fotos. 
        </Text>
        <Button title="Conceder permisos de cámara" onPress={requestCameraPermission} />
      </View>
    );
  }

  return (
    <View style={styles.center}>
      <Text> Permiso para cámara concedido</Text>
      <Button title="Conceder permisos de ubicación" onPress={requestLocationPermission} />
      {locationStatus &&  <Text> Permiso de ubicación: {locationStatus}</Text> } 
    </View>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  message: { textAlign: 'center', marginBottom: 20},
});

