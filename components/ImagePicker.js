import React, { useState } from "react";
import { View, Button, Text, StyleSheet, Image, Alert } from "react-native";
import Colors from "../constant/Colors";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";

const ImgPicker = (props) => {
  const [pickedImg, setPickedImg] = useState();
  const verifyPermission = async () => {
    const result = await Permissions.askAsync(Permissions.CAMERA);
    if (result.status !== "granted") {
      Alert.alert(
        "Insufficent Permission!",
        "You need to grant permission to use this app",
        [{ text: "OKAY!", style: "default" }]
      );
      return false;
    }
    return true;
  };

  const takeImageHandler = async () => {
    const hasPermission = await verifyPermission();
    if (!hasPermission) {
      return;
    }
    const image = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5,
    });
    //console.log(image.uri);
    setPickedImg(image.uri);
    props.onImageTaken(image.uri);
  };
  return (
    <View style={styles.imagePicker}>
      <View style={styles.imagePreview}>
        {!pickedImg && <Text>No image picker yet.</Text>}
        <Image source={{ uri: pickedImg }} style={styles.image} />
      </View>
      <Button
        title="Take Image"
        color={Colors.primary}
        onPress={takeImageHandler}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  imagePicker: {
    alignItems: "center",
    paddingTop: 40,
    paddingBottom: 20,
  },
  imagePreview: {
    width: "100%",
    height: 200,
    marginBottom: 10,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#ccc",
    borderWidth: 1,
  },
  image: {
    width: "100%",
    height: "100%",
  },
});

export default ImgPicker;
