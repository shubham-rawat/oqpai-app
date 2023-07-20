import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "S J Patra",
  email: "sj@email.com",
  mobile: "+91 7654768934",
  location: {
    pickup: "",
    drop: "",
  },
  dateTime: {
    pickup: "",
    drop: "",
  },
  bags: "",
  isLoggedIn: false,
};

//user slice
export const userDataSlice = createSlice({
  name: "userData",
  initialState,
  reducers: {
    setUserData: (state, action) => {
      state.email = action.payload.email;
      state.name = action.payload.name;
      state.isLoggedIn = true;
    },
    setLocation: (state, action) => {
      state.location.pickup = action.payload.pickup;
      state.location.drop = action.payload.drop;
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
      state.dateTime.drop = "";
      state.dateTime.drop = "";
      state.bags = "";
      state.isLoggedIn = false;
    },
  },
});

// reducer actions
export const { setUserData, setLocation, setDateTime, removeUserData } =
  userDataSlice.actions;

export default userDataSlice.reducer;
