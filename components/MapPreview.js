import React from "react";
import { View, TouchableOpacity, StyleSheet, Image } from "react-native";
import ENV from "../env";

const MapPreview = (props) => {
  let imagePreviewUrl;
  if (props.location) {
    imagePreviewUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${
      props.location.lat
    },${
      props.location.lng
    }&zoom=15&size=600x500&maptype=roadmap&markers=color:red%7Clabel:A%7C${
      props.location.lat
    },${props.location.lng}&key=${ENV().googleApiKey}`;
    //  console.log(imagePreviewUrl);
  }

  return (
    <TouchableOpacity
      style={{ ...styles.imagePreview, ...props.style }}
      onPress={props.onPress}
    >
      {props.location ? (
        <Image source={{ uri: imagePreviewUrl }} style={styles.image} />
      ) : (
        props.children
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  imagePreview: {
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "100%",
  },
});

export default MapPreview;
