import { createAppContainer } from "react-navigation";
import { Platform } from "react-native";
import { createStackNavigator } from "react-navigation-stack";
import MapScreen from "../screens/MapScreen";
import NewPlaceScreen from "../screens/NewPlaceScreen";
import PlaceDetailsScreen from "../screens/PlaceDetailsScreen";
import PlacesListScreen from "../screens/PlacesListScreen";
import Colors from "../constant/Colors";

const PlacesNavigator = createStackNavigator(
  {
    Places: PlacesListScreen,
    PlaceDetails: PlaceDetailsScreen,
    Map: MapScreen,
    NewPlaces: NewPlaceScreen,
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor:
          Platform.OS === "android" ? Colors.primary : Colors.primary,
      },
      headerTintColor: Platform.OS === "android" ? "white" : "white",
    },
  }
);

export default createAppContainer(PlacesNavigator);
