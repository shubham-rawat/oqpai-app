import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  email: "",
  mobile: "",
  location: {
    pickup: "",
    drop: "",
    pickupCoords: { latitude: 0, longitude: 0 },
    dropCoords: { latitude: 0, longitude: 0 },
  },
  dateTime: {
    pickup: "",
    drop: "",
  },
  bags: "",
  isLoggedIn: false,
  fcmToken: "",
};

//user slice
export const userDataSlice = createSlice({
  name: "userData",
  initialState,
  reducers: {
    setUserData: (state, action) => {
      state.email = action.payload.email;
      state.name = action.payload.name;
      state.mobile = action.payload.mobile || "";
      state.isLoggedIn = action.payload.isLoggedIn;
    },
    setLocation: (state, action) => {
      state.location.pickup = action.payload.pickup;
      state.location.drop = action.payload.drop;
      state.location.pickupCoords = action.payload.pickupCoords;
      state.location.dropCoords = action.payload.dropCoords;
    },
    setDateTime: (state, action) => {
      state.dateTime.pickup = action.payload.pickupDateTime;
      state.dateTime.drop = action.payload.dropDateTime;
      state.bags = action.payload.bags;
    },
    removeUserData: (state, action) => {
      state.email = "";
      state.name = "";
      state.location.pickup = "";
      state.location.drop = "";
      state.dateTime.pickup = "";
      state.dateTime.drop = "";
      state.bags = "";
      state.isLoggedIn = false;
    },
    clearFormData: (state, action) => {
      state.location.pickup = "";
      state.location.drop = "";
      state.dateTime.pickup = "";
      state.dateTime.drop = "";
      state.bags = "";
    },
    setToken: (state, action) => {
      state.fcmToken = action.payload.fcmToken;
    },
  },
});

// reducer actions
export const {
  setUserData,
  setLocation,
  setDateTime,
  removeUserData,
  clearFormData,
  setToken,
} = userDataSlice.actions;

export default userDataSlice.reducer;
