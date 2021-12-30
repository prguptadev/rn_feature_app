import Place from "../../models/place";
import { ADD_PLACE, FETCH_ALL_DATA } from "../actions/places-action";

const initialState = {
  places: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ALL_DATA: {
      return {
        places: action.places.map(
          (plc) =>
            new Place(
              plc.id.toString(),
              plc.title,
              plc.imageuri,
              plc.address,
              plc.lat,
              plc.lng
            )
        ),
      };
    }
    case ADD_PLACE: {
      const newPlace = new Place(
        action.placeData.id.toString(),
        action.placeData.title,
        action.placeData.imageuri,
        action.placeData.address,
        action.placeData.lat,
        action.placeData.lng
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
