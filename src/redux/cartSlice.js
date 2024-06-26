import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cartCount",
  initialState: {
    totalDistinctItems: 0,
    totalRewardEarned:0
  },
  
  reducers: {
    setTotalDistinctItems: (state, action) => {
      state.totalDistinctItems = action.payload;
    },
    setTotalRewardEarns: (state, action) => {
      state.totalRewardEarned = action.payload;
    },
  },
});

export const { setTotalDistinctItems,setTotalRewardEarns } = cartSlice.actions;
export default cartSlice.reducer;
