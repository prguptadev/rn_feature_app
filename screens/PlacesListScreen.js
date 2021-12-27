import React from "react";
import { StyleSheet, View, Text, Platform } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeadersButton from "../components/HeadersButton";

const PlacesListScreen = (props) => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>ok this is it done </Text>
    </View>
  );
};

PlacesListScreen.navigationOptions = (navData) => {
  return {
    headerTitle: "ALL PLACES",
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeadersButton}>
        <Item
          title="add"
          iconName={Platform.OS === "android" ? "md-add" : "ios-add"}
          onPress={() => {
            navData.navigation.navigate("NewPlaces");
          }}
        />
      </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({});
export default PlacesListScreen;
