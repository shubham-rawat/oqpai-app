import { useState, useEffect } from "react";
import { StyleSheet, View, Text } from "react-native";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import * as Location from "expo-location";
import {
  DROP_MARKER_COLOR,
  MAP_STYLE,
  PICKUP_MARKER_COLOR,
} from "../constants/MapConstants";

export default function MapComponent() {
  const [markers, setMarkers] = useState([]);
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          setErrorMsg("Permission to access location was denied");
          return;
        }

        let location = await Location.getCurrentPositionAsync({});
        setLocation(location.coords);
      } catch (error) {
        setErrorMsg(`Error getting location: ${error}`);
      }
    })();
  }, []);

  useEffect(() => {
    // Update the initial region once the location is available
    if (location) {
      setMarkers([
        {
          id: 1,
          title: "Pick Up",
          desc: "Pick up location",
          coordinate: {
            latitude: location.latitude,
            longitude: location.longitude,
          },
          color: PICKUP_MARKER_COLOR,
        },
        {
          id: 2,
          title: "Drop Off",
          desc: "Drop location",
          coordinate: {
            latitude: location.latitude + 0.001,
            longitude: location.longitude + 0.001,
          },
          color: DROP_MARKER_COLOR,
        },
      ]);
    }
  }, [location]);

  const handleMarkerDrag = (markerId, coordinate) => {
    // Update the position of the dragged marker
    setMarkers((prevMarkers) =>
      prevMarkers.map((marker) =>
        marker.id === markerId ? { ...marker, coordinate } : marker
      )
    );
  };

  return (
    <View style={styles.container}>
      {location ? (
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          provider={PROVIDER_GOOGLE}
          minZoomLevel={10}
          customMapStyle={MAP_STYLE}
          loadingEnabled={true}
        >
          {markers.map((marker) => (
            <Marker
              key={marker.id}
              coordinate={marker.coordinate}
              title={marker.title}
              pinColor={marker.color}
              draggable
              onDragEnd={(e) =>
                handleMarkerDrag(marker.id, e.nativeEvent.coordinate)
              }
            />
          ))}
        </MapView>
      ) : (
        <Text>Loading...</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "auto",
    aspectRatio: 1 / 1,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
  },
  map: {
    width: "100%",
    height: "100%",
    borderRadius: 20,
  },
});
