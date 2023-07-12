import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  authToken: "",
};

//user slice
export const userAuthSlice = createSlice({
  name: "userAuth",
  initialState,
  reducers: {
    setAuth: (state, action) => {
      state.authToken = action.payload.authToken;
    },
    removeAuth: (state, action) => {
      state.authToken = "";
    },
  },
});

// reducer actions
export const { setAuth, removeAuth } = userAuthSlice.actions;

export default userAuthSlice.reducer;
