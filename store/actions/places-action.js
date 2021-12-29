import * as FileSystem from "expo-file-system";
import { insertPlaces, fetchAll } from "../../helper/db";
import Place from "../../models/place";

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
        "dumy address",
        lat,
        lng
      );
      dispatch({
        type: ADD_PLACE,
        placeData: {
          id: response.insertId,
          title: title,
          imageuri: newPath,
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
