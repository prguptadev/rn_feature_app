import React, { useState, useEffect } from "react";
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
import MapPreview from "./MapPreview";

const LocationPicker = (props) => {
  const pickedLocation = props.navigation.getParam("pickedLocation");
  // console.log(pickedLocation);
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
      setPickedloc({
        lat: mylocation.coords.latitude,
        lng: mylocation.coords.longitude,
      });
      props.onLocationTaken({
        lat: mylocation.coords.latitude,
        lng: mylocation.coords.longitude,
      });
      // props.onLocationTaken(mylocation);
    } catch (err) {
      console.log(err);
      Alert.alert("couldn't fetch Location!", "try reset for location", [
        { text: "OKAY!", style: "default" },
      ]);
    }
    setisfetched(false);

    //const imagess = await
  };
  const pickOnMapHandler = () => {
    props.navigation.navigate("Map");
  };

  const { onLocationTaken } = props;

  useEffect(() => {
    if (pickedLocation) {
      setPickedloc(pickedLocation);
      onLocationTaken(pickedLocation);
    }
  }, [pickedLocation]);
  return (
    <View style={styles.imagePicker}>
      <MapPreview
        style={styles.imagePreview}
        location={pickedloc}
        onPress={pickOnMapHandler}
      >
        {!!isfetched ? (
          <ActivityIndicator size="large" color={Colors.primary} />
        ) : (
          <Text>No location picker yet.</Text>
        )}
      </MapPreview>

      {/* {!!isfetched ? (
          <ActivityIndicator size="large" color={Colors.primary} />
        ) : !!pickedloc ? (
          <View>
            <Text>latitude= {pickedloc.lat}</Text>
            <Text>longitude= {pickedloc.lng}</Text>
          </View>
        ) : (
          <Text>No location picker yet.</Text>
        )} */}

      <View style={styles.actions}>
        <Button
          title="Get User Location"
          color={Colors.primary}
          onPress={takeLocationHandler}
        />
        <Button
          title="Pick on Map"
          color={Colors.primary}
          onPress={pickOnMapHandler}
        />
      </View>
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
    height: 160,
    marginBottom: 10,
    //  justifyContent: "center",
    // alignItems: "center",
    borderColor: "#ccc",
    borderWidth: 1,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
});

export default LocationPicker;
