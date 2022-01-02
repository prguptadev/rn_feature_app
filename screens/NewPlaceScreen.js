import React, { useCallback, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Button,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import Colors from "../constant/Colors";
import * as PlacesAction from "../store/actions/places-action";
import { useDispatch, useSelector } from "react-redux";
import ImagePicker from "../components/ImagePicker";
import LocationPicker from "../components/LocationPicker";

const NewPlaceScreen = (props) => {
  const dispatch = useDispatch();
  const allplace = useSelector((state) => state.places.places);
  //console.log(allplace);
  const [titleValue, setTitleValue] = useState("");
  const [selectedImage, SetselectedImage] = useState();
  const [selectedLocation, SetselectedLocation] = useState();

  const ImageTakenHandler = useCallback((imagePath) => {
    SetselectedImage(imagePath);
  }, []);

  const LocationTAkenHandler = useCallback((location) => {
    //console.log("dhsdhdkf---- " + location.lat);
    //console.log("dhsdhdkf---- " + location.lng);
    SetselectedLocation(location);
  }, []);

  const titleChangeHandler = (text) => {
    if (text.length !== 0) {
      setTitleValue(text);
    }
  };

  const savePlaceHandler = () => {
    if (titleValue.trim().length > 0) {
      dispatch(
        PlacesAction.addPlace(
          titleValue,
          selectedImage,
          selectedLocation.lat,
          selectedLocation.lng
        )
      );
      props.navigation.goBack();
    }
  };

  // console.log(selectedLocation.latitude);
  // console.log(selectedLocation.longitude);
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "android" ? "height" : "padding"}
    >
      <ScrollView>
        <View style={styles.screen}>
          <View style={styles.formcontrol}>
            <Text style={styles.label}>Title: </Text>
            <TextInput
              style={styles.input}
              onChangeText={titleChangeHandler}
              value={titleValue}
            />
            {!titleValue && (
              <Text
                style={{
                  color: "red",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {" "}
                Please enter String, Empty not allowed!!
              </Text>
            )}
            <ImagePicker onImageTaken={ImageTakenHandler} />
            <LocationPicker
              onLocationTaken={LocationTAkenHandler}
              navigation={props.navigation}
            />
            <Button
              title="Save Places"
              color={Colors.primary}
              onPress={savePlaceHandler}
            />
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

NewPlaceScreen.navigationOptions = (navData) => {
  return {
    headerTitle: "Add New Place",
  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    margin: 30,
    padding: 10,
  },
  label: {
    fontSize: 18,
    marginBottom: 15,
  },
  formcontrol: {
    width: "100%",
  },
  input: {
    paddingHorizontal: 5,
    paddingVertical: 5,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    //  marginBottom: 30,
  },
});
export default NewPlaceScreen;
