import { useEffect, useState, useRef } from "react";
import { StyleSheet, TouchableOpacity, View, Text, Image } from "react-native";
import { Camera } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import { AntDesign } from "@expo/vector-icons";

export default function TakePicture({ photo, setPhoto, pictureSaved }) {
  const [permissions, setPermissions] = useState({ camera: null, media: null });
  const camRef = useRef();

  // get permissions on mount
  useEffect(() => {
    (async () => {
      const cameraPermission = await Camera.requestCameraPermissionsAsync();
      const mediaPermission = await MediaLibrary.requestPermissionsAsync();
      setPermissions({
        camera: cameraPermission.status,
        media: mediaPermission.status,
      });
    })();
  }, []);

  // check for permissions
  if (permissions.camera === undefined) {
    return <Text>Requesting Permissions...</Text>;
  } else if (!permissions.camera) {
    return <Text>Please Provide Permissions Though Settings</Text>;
  }

  // click picture handler
  const clickPicture = async () => {
    let options = {
      quality: 1,
      base64: true,
      exif: false,
    };
    let newPhoto = await camRef.current.takePictureAsync(options);
    setPhoto(newPhoto);
  };

  // if photo clicked
  if (photo) {
    const retakePicture = () => {
      setPhoto(null);
    };

    const savePicture = () => {
      MediaLibrary.saveToLibraryAsync(photo.uri).then(() => {
        setPhoto(undefined);
      });
      pictureSaved();
    };

    return (
      <View style={styles.previewContainer}>
        <Image
          style={styles.preview}
          source={{ uri: "data:image/jpg;base64," + photo.base64 }}
        />
        <View style={styles.actionButtons}>
          <TouchableOpacity onPress={retakePicture} style={styles.cameraBtn}>
            <AntDesign name="closecircle" size={60} color="gray" />
          </TouchableOpacity>
          <TouchableOpacity onPress={savePicture} style={styles.cameraBtn}>
            <AntDesign name="checkcircle" size={60} color="gray" />
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <Camera style={styles.camera} ref={camRef}>
      <TouchableOpacity onPress={clickPicture} style={styles.cameraBtn} />
    </Camera>
  );
}
const styles = StyleSheet.create({
  camera: {
    height: "90%",
    width: "100%",
    borderRadius: 18,
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    padding: "10%",
  },
  cameraBtn: {
    width: 70,
    height: 70,
    bottom: 0,
    borderRadius: 35,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  previewContainer: {
    height: "90%",
    width: "100%",
    borderRadius: 18,
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  preview: {
    height: "100%",
    width: "100%",
    borderRadius: 18,
    flex: 1,
  },
  actionButtons: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    padding: "10%",
    justifyContent: "space-between",
    position: "absolute",
    bottom: 0,
  },
});
