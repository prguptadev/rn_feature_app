import React, { useState, useCallback, useEffect } from "react";
import { StyleSheet } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeadersButton from "../components/HeadersButton";
import MapView, { Marker } from "react-native-maps";

const MapScreen = (props) => {
  const readonly = props.navigation.getParam("readOnly");
  const initialLocation = props.navigation.getParam("initialLocation");

  const [selectedLocation, setSelectedLocation] = useState(initialLocation);
  // console.log(selectedLocation);
  const mapRegion = {
    latitude: initialLocation ? initialLocation.lat : 37.77,
    longitude: initialLocation ? initialLocation.lng : -122.43,
    latitudeDelta: 0.09222,
    longitudeDelta: 0.0422,
  };
  const selectLocationHandler = (event) => {
    // console.log(event.nativeEvent.coordinate.latitude);
    if (readonly) {
      return;
    }
    setSelectedLocation({
      lat: event.nativeEvent.coordinate.latitude,
      lng: event.nativeEvent.coordinate.longitude,
    });
  };

  let markedCoordinats;
  if (selectedLocation) {
    markedCoordinats = {
      latitude: selectedLocation.lat,
      longitude: selectedLocation.lng,
    };
  }

  const saveSlectedLocationHandler = useCallback(() => {
    if (!selectedLocation) {
      //could be alert
      return;
    }
    props.navigation.navigate("NewPlaces", {
      pickedLocation: selectedLocation,
    });
  }, [selectedLocation]);

  useEffect(() => {
    props.navigation.setParams({
      savedLocation: saveSlectedLocationHandler,
    });
  }, [saveSlectedLocationHandler]);

  return (
    <MapView
      style={styles.map}
      region={mapRegion}
      onPress={selectLocationHandler}
    >
      {markedCoordinats && (
        <Marker title="picked location" coordinate={markedCoordinats}></Marker>
      )}
    </MapView>
  );
};

MapScreen.navigationOptions = (navData) => {
  const saveFn = navData.navigation.getParam("savedLocation");
  const readonly = navData.navigation.getParam("readOnly");

  if (readonly) {
    return;
  }
  return {
    headerTitle: "Map",
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeadersButton}>
        <Item
          title="add"
          iconName={Platform.OS === "android" ? "md-save" : "ios-save"}
          onPress={saveFn}
        />
      </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({
  map: { flex: 1 },
});
export default MapScreen;
