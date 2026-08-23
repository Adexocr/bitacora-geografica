import { CameraView } from 'expo-camera';
import { useRef } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type Props = {
    onCapture: (uri: string) => void;
};

export default function Camera({ onCapture }: Props) {
    const cameraRef = useRef<CameraView>(null);

    async function takePicture() {
        if (!cameraRef.current) return;
        const photo = await cameraRef.current.takePictureAsync();
        if (photo) {
            onCapture(photo.uri);
        }
    }

    return (
        <View style={styles.container}>
            <CameraView ref={cameraRef} style={styles.camera} facing="back" />
            <TouchableOpacity style={styles.button} onPress={takePicture}>
                <Text style={styles.buttonText}>Capturar</Text>
            </TouchableOpacity>
        </View>
    );

}

const styles = StyleSheet.create({
    container: { flex: 1},
    camera: { flex: 1 },
    button: { backgroundColor: '#6C5CE7', padding: 15, alignItems: 'center' },
    buttonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
});

