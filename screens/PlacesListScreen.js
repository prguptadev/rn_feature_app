import React from "react";
import { StyleSheet, View, Text, FlatList, Platform } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeadersButton from "../components/HeadersButton";
import { useDispatch, useSelector } from "react-redux";
import PlaceItem from "../components/PlaceItem";

const PlacesListScreen = (props) => {
  const allplace = useSelector((state) => state.places.places);

  const renderPlace = (itemData) => {
    return (
      <PlaceItem
        image={null}
        title={itemData.item.title}
        address={null}
        onSelect={() => {
          props.navigation.navigate("PlaceDetails", {
            placeTitle: itemData.item.title,
            placeId: itemData.item.id,
          });
        }}
      />
    );
  };

  return (
    <FlatList
      data={allplace}
      keyExtractor={(item) => item.id}
      renderItem={renderPlace}
    />
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
