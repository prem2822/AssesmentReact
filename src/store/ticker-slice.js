import { createSlice } from "@reduxjs/toolkit";

const initialTickerState = {
  tickerData: {
    dailyChange: 0,
    dailyChangeRelative: 0,
    lastPrice: 0,
    volume: 0,
    high: 0,
    low: 0,
    bid: true,
  },
};

const tickerSlice = createSlice({
  name: "ticker",
  initialState: initialTickerState,
  reducers: {
    loadTickerData(state, action) {
      if (action.payload.length > 0) {
        state.tickerData.dailyChange = Math.abs(action.payload[4]).toFixed(2);
        state.tickerData.dailyChangeRelative = (
          Math.abs(action.payload[5]) * 100
        ).toFixed(2);
        state.tickerData.lastPrice = action.payload[6].toFixed(2);
        state.tickerData.volume = action.payload[7].toFixed(0);
        state.tickerData.high = action.payload[8].toFixed(2);
        state.tickerData.low = action.payload[9].toFixed(2);
        state.tickerData.bid = action.payload[4] > 0;
      }
    },
  },
});

export const tickerActions = tickerSlice.actions;
export default tickerSlice;
