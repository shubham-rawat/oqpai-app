import React, { useEffect, useRef, useState } from "react";
import { View, StyleSheet, Text, Alert, TextInput } from "react-native";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { useDispatch } from "react-redux";
import * as Location from "expo-location";
import {
  DROP_MARKER_COLOR,
  MAP_STYLE,
  PICKUP_MARKER_COLOR,
} from "../constants/MapConstants";
import { setDateTime, setLocation } from "../store/userDataSlice";
import { getFontSize } from "../utils/FontScaling";
import Button from "../components/Button";
import { concatAsCSV } from "../utils/TextUtils";
import { updateRequest } from "../apis/userApi";
import { LOCATION_NOT_SET } from "../constants/ErrorMessages";

export default function UpdateDestination({ navigation, route }) {
  const { orderData, currentRequestId } = route.params;
  const pickup = orderData?.pickup_text_address;
  const [region, setRegion] = useState(null);
  const [pickupCoordinates, setPickupCoordinates] = useState(null);
  const [dropCoordinates, setDropCoordinates] = useState(null);
  const pickupGooglePlacesRef = useRef(null);
  const dropGooglePlacesRef = useRef(null);

  const dispatch = useDispatch();

  const sendLocation = async () => {
    const drop = dropGooglePlacesRef.current?.getAddressText();
    if (!drop || !pickup) {
      Alert.alert("Missing Data", LOCATION_NOT_SET);
    } else {
      try {
        const res = await updateRequest({
          request_id: currentRequestId,
          destination_text_address: drop,
          destination_latitude: dropCoordinates.latitude,
          destination_longitude: dropCoordinates.longitude,
        });
        console.log(res);
        dispatch(
          setLocation({
            pickup,
            drop,
            pickupCoords: pickupCoordinates,
            dropCoords: dropCoordinates,
          })
        );
        dispatch(
          setDateTime({
            pickupDateTime: new Date(orderData?.pickup_date),
            dropDateTime: new Date(orderData?.destination_date),
            bags: orderData?.number_of_bags,
          })
        );
        await navigation.navigate("OrderSummary", {
          cost: res.Total_Cost,
          tax: res.Tax,
          requestId: res.Request_ID,
        });
      } catch (error) {
        alert("Something went wromg!");
      }
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          console.log("Location permission denied.");
          return;
        }

        const location = await Location.getCurrentPositionAsync({});
        const { latitude, longitude } = location.coords;

        setRegion({
          latitude: latitude + 0.01,
          longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        });

        // Setting default location for pickup marker
        setPickupCoordinates({
          latitude: parseFloat(orderData?.pickup_latitude),
          longitude: parseFloat(orderData?.pickup_longitude),
        });

        pickupGooglePlacesRef.current?.setAddressText(pickup);

        // Setting default location for drop marker
        setDropCoordinates({
          // Adding 0.01 to simulate a slightly different location
          latitude: latitude + 0.01,
          longitude,
        });
      } catch (error) {
        console.error("Error fetching current location:", error);
      }
    })();
  }, []);

  const handleLocationSelect = async (data, details, markerType) => {
    try {
      const { geometry } = details;
      const { location } = geometry;
      const { lat, lng } = location;

      setRegion({
        latitude: location.lat,
        longitude: location.lng,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });

      if (markerType === "pickup") {
        setPickupCoordinates({
          latitude: lat,
          longitude: lng,
        });
      } else if (markerType === "drop") {
        setDropCoordinates({
          latitude: lat,
          longitude: lng,
        });
      }
    } catch (error) {
      console.error("Error fetching location:", error);
    }
  };

  const handleMarkerDragEnd = async (event, markerType) => {
    const { latitude, longitude } = event.nativeEvent.coordinate;
    // Get the location details based on the marker coordinates
    const locationDetails = {
      geometry: {
        location: {
          lat: latitude,
          lng: longitude,
        },
      },
    };
    // const { name, street, city, district, country, region, postalCode } =
    const address = await Location.reverseGeocodeAsync({
      latitude,
      longitude,
    });
    // concat address
    const addressText = concatAsCSV([
      address[0].name,
      address[0].streetNumber,
      address[0].street,
      address[0].district,
      address[0].city,
      address[0].region,
      address[0].country,
    ]);
    // Update the coords & location text in GooglePlacesAutocomplete
    if (markerType === "pickup") {
      setPickupCoordinates({
        latitude: latitude,
        longitude: longitude,
      });
      pickupGooglePlacesRef.current?.setAddressText(addressText);
    } else if (markerType === "drop") {
      setDropCoordinates({
        latitude: latitude,
        longitude: longitude,
      });
      dropGooglePlacesRef.current?.setAddressText(addressText);
    }
  };

  return (
    <View style={styles.formContainer}>
      <Text style={{ fontSize: getFontSize(24), marginBottom: 10 }}>
        Update your drop location
      </Text>
      <TextInput
        style={styles.googlePlacesTextInput}
        value={pickup}
        editable={false}
      />
      <View style={styles.locationInputContainer}>
        <GooglePlacesAutocomplete
          ref={dropGooglePlacesRef}
          placeholder="Drop-off at"
          onPress={(data, details) =>
            handleLocationSelect(data, details, "drop")
          }
          fetchDetails={true}
          query={{
            key: "AIzaSyAh7xnanPpSQXrq7Y3qC2Phi19JkTV7Bmc",
            language: "en",
            components: "country:in",
          }}
          styles={{
            container: styles.googlePlacesContainer,
            listView: styles.googlePlacesListView,
            textInputContainer: styles.googlePlacesTextInputContainer,
            textInput: styles.googlePlacesTextInput,
          }}
        />
      </View>
      <Button
        label={"Continue"}
        height={60}
        theme="primary"
        onPress={sendLocation}
      />
      <View style={styles.mapContainer}>
        {region ? (
          <MapView
            provider={PROVIDER_GOOGLE}
            style={styles.map}
            region={region}
            onRegionChangeComplete={setRegion}
            customMapStyle={MAP_STYLE}
            loadingEnabled
          >
            {pickupCoordinates && (
              <Marker
                pinColor={PICKUP_MARKER_COLOR}
                coordinate={pickupCoordinates}
                title="Pickup"
                // draggable
                onDragEnd={(event) => handleMarkerDragEnd(event, "pickup")}
              />
            )}
            {dropCoordinates && (
              <Marker
                pinColor={DROP_MARKER_COLOR}
                coordinate={dropCoordinates}
                title="Drop"
                draggable
                onDragEnd={(event) => handleMarkerDragEnd(event, "drop")}
              />
            )}
          </MapView>
        ) : (
          <Text>Loading Map</Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  formContainer: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
    width: "100%",
    alignItems: "stretch",
    paddingHorizontal: 20,
    backgroundColor: "fff",
    paddingTop: 70,
  },
  locationInputContainer: {
    marginBottom: 65,
  },
  mapContainer: {
    width: "100%",
    height: "auto",
    aspectRatio: 1 / 1,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    marginTop: 20,
  },
  map: {
    width: "100%",
    height: "100%",
  },
  googlePlacesContainer: {
    flex: 0,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
  },
  googlePlacesListView: {
    backgroundColor: "#fff",
  },
  googlePlacesTextInputContainer: {
    backgroundColor: "rgba(0,0,0,0)",
    display: "flex",
    alignItems: "stretch",
  },
  googlePlacesTextInput: {
    height: 60,
    fontSize: getFontSize(16),
    borderRadius: 18,
    borderWidth: 0.5,
    paddingHorizontal: 10,
  },
});
