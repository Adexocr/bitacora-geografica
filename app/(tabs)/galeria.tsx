import { FlatList, Image, StyleSheet, Text, View } from 'react-native';
import { usePhotos } from '../../context/PhotosContext';

export default function GaleriaScreen() {
  const { photos } = usePhotos();

  if (photos.length === 0) {
    return (
      <View style={styles.center}>
        <Text style={styles.emptyText}>Todavía no capturaste ninguna foto.</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={photos}
      keyExtractor={(item) => item.id}
      contentContainerStyle={{ padding: 16 }}
      renderItem={({ item }) => (
        <View style={styles.card}>
          <Image source={{ uri: item.uri }} style={styles.image} />
          <View style={styles.info}>
            <Text style={styles.description}>{item.description || 'Sin descripción'}</Text>
            <Text style={styles.coords}>
              📍 {item.latitude.toFixed(5)}, {item.longitude.toFixed(5)} // Esto hace que se redondee las coordenadas a 5 decimales. 
            </Text>
            <Text style={styles.date}>{item.takenAt}</Text>
          </View>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  emptyText: { color: '#666' },
  card: { backgroundColor: '#F5F5F5', borderRadius: 16, marginBottom: 16, overflow: 'hidden' },
  image: { width: '100%', height: 200 },
  info: { padding: 12 },
  description: { fontSize: 15, fontWeight: '600', marginBottom: 4 },
  coords: { fontSize: 13, color: '#666' },
  date: { fontSize: 12, color: '#999', marginTop: 4 },
});