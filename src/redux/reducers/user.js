import { createSlice } from "@reduxjs/toolkit";

const initialFiltersState = {
  user: {},
};

const userSlice = createSlice({
  name: "user",
  initialState: initialFiltersState,
  reducers: {
    setUserReducer: (state, action) => ({
      ...state,
      user: action.payload,
    }),
    clearUserReducer: (state) => ({
      ...state,
      user: {},
    }),
  },
});

export const { setUserReducer, clearUserReducer } = userSlice.actions;
export default userSlice.reducer;
