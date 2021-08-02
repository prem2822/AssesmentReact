import { configureStore } from "@reduxjs/toolkit";
import orderBookSlice from "./orderBook-slice";
import tickerSlice from "./ticker-slice";

const store = configureStore({
  reducer: { orderBook: orderBookSlice.reducer, ticker: tickerSlice.reducer },
});

export default store;
