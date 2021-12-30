import * as FileSystem from "expo-file-system";
import { insertPlaces, fetchAll } from "../../helper/db";
import Place from "../../models/place";
import ENV from "../../env";

export const ADD_PLACE = "ADD_PLACE";
export const FETCH_ALL_DATA = "FETCH_ALL_DATA";

export const findAll = () => {
  return async (dispatch) => {
    try {
      const response = await fetchAll();
      // console.log(response.rows._array);
      dispatch({ type: FETCH_ALL_DATA, places: response.rows._array });
    } catch (err) {
      console.log(err);
      throw err;
    }
  };
};

export const addPlace = (title, image, lat, lng) => {
  return async (dispatch) => {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${
        ENV().googleApiKey
      }`
    );
    if (!response.ok) {
      throw new Error("Something got wrong-- FECTH DISTANCE");
    }
    const resData = await response.json();
    if (!resData.results) {
      throw new Error("wrong addresss");
    }
    // console.log(resData.results[0].formatted_address);

    const fileName = image.split("/").pop();
    const newPath = FileSystem.documentDirectory + fileName;
    try {
      await FileSystem.moveAsync({
        from: image,
        to: newPath,
      });
      const response = await insertPlaces(
        title,
        newPath,
        resData.results[0].formatted_address,
        lat,
        lng
      );
      // console.log(response);
      dispatch({
        type: ADD_PLACE,
        placeData: {
          id: response.insertId,
          title: title,
          imageuri: newPath,
          address: resData.results[0].formatted_address,
          lat: lat,
          lng: lng,
        },
      });
    } catch (err) {
      console.log(err);
      throw err;
    }
  };
};
