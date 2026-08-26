import { useCameraPermissions } from 'expo-camera';
import * as Location from 'expo-location';
import { useState } from 'react';
import { Alert, Button, StyleSheet, Text, TextInput, View } from 'react-native';
import Camera from '../../components/Camera';
import { getCurrentCoordinates } from '../../components/LocationReader';
import { usePhotos } from '../../context/PhotosContext';


export default function CaptureScreen() {
  const [ cameraPermission, requestCameraPermission ] = useCameraPermissions();
  const [ pendingUri, setPendingUri] = useState<string | null>(null);
  const [ description, setDescription] = useState('');
  const { addPhoto } = usePhotos();


  async function handleCapture(uri: string) {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Ubicación no disponible', 'La foto se guardará sin coordenadas de ubicación.');
    }
    setPendingUri(uri);
  }

  async function handleSave() {
    if (!pendingUri) return;
    const coords = await getCurrentCoordinates();

    addPhoto({ 
      id: Date.now().toString(),
      uri: pendingUri, 
      latitude: coords?.latitude ?? 0,
      longitude: coords?.longitude ?? 0,
      description,
      takenAt: new Date().toLocaleString(),
    });

    setPendingUri(null);
    setDescription('');
    Alert.alert('Foto guardada', 'La foto ha sido guardada exitosamente.');
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

  if (pendingUri) {
    return (
      <View style={styles.center}>
        <Text style={styles.message}>Agrega una descripción para la foto:</Text>
        <TextInput
          style={styles.input}
          placeholder=" Ej: Atardecer en Puntarenas, Puntarenas "
          value={description}
          onChangeText={setDescription}
        />
        <Button title="Guardar foto" onPress={handleSave} />
      </View>
  );
}

return <Camera onCapture={handleCapture} />;
}


const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  message: { textAlign: 'center', marginBottom: 20},
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 5, padding: 10, width: '100%', marginBottom: 20 },
});

