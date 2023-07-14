import React from 'react';
import {SafeAreaView, StyleSheet, Text} from 'react-native';
import MapView, {
  enableLatestRenderer,
  PROVIDER_GOOGLE,
} from 'react-native-maps';

enableLatestRenderer();

export default function App() {
  const [zoomLevel, setZoomLevel] = React.useState(0);
  const mapViewRef = React.useRef<MapView>(null);

  const onRegionChange = React.useCallback(async () => {
    const camera = await mapViewRef.current?.getCamera();
    if (camera?.zoom) {
      setZoomLevel(camera.zoom);
    }
  }, []);

  return (
    <>
      <MapView
        onRegionChange={onRegionChange}
        provider={PROVIDER_GOOGLE}
        ref={mapViewRef}
        showsMyLocationButton={true}
        showsUserLocation={true}
        style={styles.flex}
        zoomEnabled={true}
      />
      <SafeAreaView pointerEvents="box-none" style={StyleSheet.absoluteFill}>
        <Text>{zoomLevel}</Text>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
});
