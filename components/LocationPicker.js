import React, { useState } from "react";
import {
  View,
  Button,
  Text,
  StyleSheet,
  Image,
  Alert,
  ActivityIndicator,
} from "react-native";
import Colors from "../constant/Colors";
//import * as ImagePicker from "expo-image-picker";
//import * as Permissions from "expo-permissions";
//import * as Camera from "expo-camera";
import * as Location from "expo-location";

const LocationPicker = (props) => {
  const [pickedloc, setPickedloc] = useState();
  const [isfetched, setisfetched] = useState();
  const verifyPermission = async () => {
    //const result = await Permissions.askAsync(Permissions.LOCATION_FOREGROUND);
    // const resultB = await Location.requestBackgroundPermissionsAsync();
    // if (resultB.status !== "granted") {
    //   Alert.alert(
    //     "Insufficent Permission!",
    //     "You need to grant permission to use this app",
    //     [{ text: "OKAY!", style: "default" }]
    //   );
    //   return false;
    // }

    const result = await Location.requestForegroundPermissionsAsync();
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

  const takeLocationHandler = async () => {
    const hasPermission = await verifyPermission();
    if (!hasPermission) {
      return;
    }
    setisfetched(null);
    try {
      setisfetched(true);
      const mylocation = await Location.getCurrentPositionAsync({
        timeout: 5000,
      });
      // console.log(mylocation);
      setPickedloc(mylocation);
      props.onLocationTaken(mylocation);
    } catch (err) {
      console.log(err);
      Alert.alert("couldn't fetch Location!", "try reset for location", [
        { text: "OKAY!", style: "default" },
      ]);
    }
    setisfetched(false);

    //const imagess = await
  };
  return (
    <View style={styles.imagePicker}>
      <View style={styles.imagePreview}>
        {!!isfetched ? (
          <ActivityIndicator size="large" color={Colors.primary} />
        ) : !!pickedloc ? (
          <View>
            <Text>latitude= {pickedloc.coords.latitude}</Text>
            <Text>longitude= {pickedloc.coords.longitude}</Text>
          </View>
        ) : (
          <Text>No image picker yet.</Text>
        )}
      </View>
      <Button
        title="Get User Location"
        color={Colors.primary}
        onPress={takeLocationHandler}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  imagePicker: {
    alignItems: "center",
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

export default LocationPicker;
