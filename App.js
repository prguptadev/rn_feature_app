import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import PlacesNavigation from "./navigation/PlacesNavigation";
import { createStore, combineReducers, applyMiddleware } from "redux";
import PlacesReducer from "./store/reducers/places-action";
import { Provider } from "react-redux";
import ReduxThunk from "redux-thunk";
import { init } from "./helper/db";

init()
  .then(() => {
    console.log("DB connected");
  })
  .catch((err) => {
    console.log(" DB FAILED " + err);
  });

const rootReducer = combineReducers({
  places: PlacesReducer,
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

export default function App() {
  return (
    <Provider store={store}>
      <PlacesNavigation />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
