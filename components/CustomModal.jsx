import { Modal, StyleSheet, Pressable, View, Text } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

export default function CustomModal({
  modalName,
  isVisible,
  onClose,
  children,
}) {
  return (
    <Modal animationType="slide" transparent={true} visible={isVisible}>
      <View style={styles.modalContent}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{modalName}</Text>
          <Pressable onPress={onClose}>
            <MaterialIcons name="close" color="#000" size={24} />
          </Pressable>
        </View>
        <View style={styles.contentContainer}>{children}</View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContent: {
    height: "40%",
    width: "100%",
    backgroundColor: "#fff",
    borderTopRightRadius: 18,
    borderTopLeftRadius: 18,
    position: "absolute",
    bottom: 0,
  },
  titleContainer: {
    height: "16%",
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    color: "#000",
    fontSize: 24,
    fontWeight: "bold",
  },
  contentContainer: {
    width: "100%",
    height: "84%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "stretch",
    padding: 20,
  },
});
