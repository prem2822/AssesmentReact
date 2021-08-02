import { createSlice } from "@reduxjs/toolkit";

const initialBookState = {
  bidItems: [],
  askItems: [],
  bidCumulative: 0,
  askCumulative: 0,
};

let idSeq = 1;

const orderBookSlice = createSlice({
  name: "orderBook",
  initialState: initialBookState,
  reducers: {
    loadItems(state, action) {
      if (action.payload.length > 0) {
        if (typeof action.payload[0] === "object") {
          action.payload.forEach((item) => {
            //console.log(item);
            if (item[1] > 0) {
              if (item[2] > 0) {
                const bidItem = state.bidItems.find(
                  (item) => item.price === item[0]
                );
                if (bidItem) {
                  bidItem.count = item[1];
                  bidItem.amount = item[2];
                } else {
                  state.bidItems.push({
                    id: idSeq,
                    price: item[0],
                    count: item[1],
                    amount: item[2],
                    total: item[2],
                  });
                  idSeq++;
                }
              } else {
                const askItem = state.askItems.find(
                  (item) => item.price === item[0]
                );
                if (askItem) {
                  askItem.count = item[1];
                  askItem.amount = Math.abs(item[2]);
                } else {
                  state.askItems.push({
                    id: idSeq,
                    price: item[0],
                    count: item[1],
                    amount: Math.abs(item[2]),
                    total: Math.abs(item[2]),
                  });
                  idSeq++;
                }
              }
            } else if (item[1] === 0) {
              if (item[2] === 1) {
                state.bidItems = state.bidItems.filter(
                  (c) => c.price !== item[0]
                );
              } else if (item[2] === -1) {
                state.askItems = state.askItems.filter(
                  (c) => c.price !== item[0]
                );
              }
            }
          });
        } else {
          if (action.payload[1] > 0) {
            if (action.payload[2] > 0) {
              const bidItem = state.bidItems.find(
                (item) => item.price === action.payload[0]
              );
              if (bidItem) {
                bidItem.count = action.payload[1];
                bidItem.amount = action.payload[2];
              } else {
                state.bidItems.push({
                  id: idSeq,
                  price: action.payload[0],
                  count: action.payload[1],
                  amount: action.payload[2],
                  total: action.payload[2],
                });
                idSeq++;
              }
            } else {
              const askItem = state.askItems.find(
                (item) => item.price === action.payload[0]
              );
              if (askItem) {
                askItem.count = action.payload[1];
                askItem.amount = Math.abs(action.payload[2]);
              } else {
                state.askItems.push({
                  id: idSeq,
                  price: action.payload[0],
                  count: action.payload[1],
                  amount: Math.abs(action.payload[2]),
                  total: Math.abs(action.payload[2]),
                });
                idSeq++;
              }
            }
          } else if (action.payload[1] === 0) {
            if (action.payload[2] === 1) {
              // console.log(action.payload);
              state.bidItems = state.bidItems.filter(
                (c) => c.price !== action.payload[0]
              );
            } else if (action.payload[2] === -1) {
              state.askItems = state.askItems.filter(
                (c) => c.price !== action.payload[0]
              );
            }
          }
        }
      }

      state.bidItems.sort((a, b) => {
        if (a.price < b.price) return 1;
        if (a.price > b.price) return -1;
        return 0;
      });

      state.askItems.sort((a, b) => {
        if (a.price > b.price) return 1;
        if (a.price < b.price) return -1;
        return 0;
      });

      let cumulative = 0;

      state.bidItems.forEach((item) => {
        item.total = item.amount + cumulative;
        cumulative = item.total;
      });

      state.bidCumulative = cumulative;
      cumulative = 0;

      state.askItems.forEach((item) => {
        item.total = item.amount + cumulative;
        cumulative = item.total;
      });

      state.askCumulative = cumulative;
      cumulative = 0;
    },
    clearItems(state) {
      state.bidItems = [];
      state.askItems = [];
      state.bidCumulative = 0;
      state.askCumulative = 0;
    },
  },
});

export const orderBookActions = orderBookSlice.actions;
export default orderBookSlice;
