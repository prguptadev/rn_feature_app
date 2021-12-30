import React from "react";
import { StyleSheet, Text, View, Image, ScrollView } from "react-native";
import { useSelector } from "react-redux";
import MapPreview from "../components/MapPreview";

const PlaceDetailsScreen = (props) => {
  const placeTitle = props.navigation.getParam("placeTitle");
  const placeId = props.navigation.getParam("placeId");
  const selectedPlace = useSelector((state) =>
    state.places.places.find((plcId) => plcId.id === placeId)
  );

  return (
    <ScrollView contentContainerStyle={{ alignItems: "center" }}>
      <Image source={{ uri: selectedPlace.imageuri }} style={styles.image} />
      <View style={styles.locationcontainer}>
        <View>
          <Text style={styles.address} numberOfLines={2}>
            {selectedPlace.address}
          </Text>
        </View>
        <MapPreview
          location={{
            lat: selectedPlace.latitude,
            lng: selectedPlace.longitude,
          }}
          style={styles.mapview}
        ></MapPreview>
      </View>
    </ScrollView>
  );
};

PlaceDetailsScreen.navigationOptions = (navData) => {
  return {
    headerTitle: navData.navigation.getParam("placeTitle"),
  };
};

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 250,
  },
  locationcontainer: {},
  mapview: {
    justifyContent: "center",
    alignItems: "center",
  },
  address: {
    fontSize: 14,
    fontFamily: "bold",
  },
});

export default PlaceDetailsScreen;
