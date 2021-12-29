import React from "react";
import { StyleSheet, Text, View } from "react-native";

const PlaceDetailsScreen = (props) => {
  const placeTitle = props.navigation.getParam("placeTitle");
  const placeId = props.navigation.getParam("placeId");
  return (
    <View>
      <Text>{placeId} </Text>
    </View>
  );
};

PlaceDetailsScreen.navigationOptions = (navData) => {
  return {
    headerTitle: navData.navigation.getParam("placeTitle"),
  };
};

const styles = StyleSheet.create({});

export default PlaceDetailsScreen;
