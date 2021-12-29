import Place from "../../models/place";
import { ADD_PLACE } from "../actions/places-action";

const initialState = {
  places: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_PLACE: {
      const newPlace = new Place(
        new Date().toString(),
        action.placeData.title,
        action.placeData.imageuri
      );
      return {
        places: state.places.concat(newPlace),
      };
    }

    default:
      return state;
  }
  return state;
};
