import { orderBookActions } from "./orderBook-slice";
import { tickerActions } from "./ticker-slice";

let socket;
let connectionState = false;

const createConnection = () => {
  socket = new WebSocket("wss://api-pub.bitfinex.com/ws/2");
  connectionState = true;
};

export const fetchBookData = (precision) => {
  return (dispatch) => {
    let bookChannelId = undefined;
    let tickerChannelId = undefined;

    if (connectionState) {
      let msg = JSON.stringify({
        event: "subscribe",
        channel: "book",
        symbol: "tBTCUSD",
        prec: precision,
        freq: "F0",
        len: "25",
        subId: "test",
      });
      socket.send(msg);
      // console.log(msg);
      bookChannelId = undefined;
      return;
    }

    createConnection();

    socket.onopen = (event) => {
      // setTimeout(() => {
      //   socket.close();
      // }, 60000);
      console.log("Connected to network");
      let msg = JSON.stringify({
        event: "subscribe",
        channel: "book",
        symbol: "tBTCUSD",
        prec: precision,
        freq: "F1",
        len: "25",
        subId: "test",
      });
      socket.send(msg);
      msg = JSON.stringify({
        event: "subscribe",
        channel: "ticker",
        symbol: "tBTCUSD",
      });
      socket.send(msg);
    };

    socket.onerror = (error) => {
      console.log("WebSocket Error: " + error);
    };

    socket.onmessage = (event) => {
      if (!bookChannelId || !tickerChannelId) {
        const socketData = JSON.parse(event.data);
        if (
          socketData.channel === "book" &&
          socketData.event === "subscribed"
        ) {
          bookChannelId = socketData.chanId;
          return;
        } else if (
          socketData.channel === "ticker" &&
          socketData.event === "subscribed"
        ) {
          tickerChannelId = socketData.chanId;
          return;
        }
      }
      if (bookChannelId) {
        const socketData = JSON.parse(event.data);
        //console.log(bookChannelId, socketData["0"]);
        if (bookChannelId === socketData["0"] && socketData["1"] !== "hb") {
          //console.log(socketData["1"]);
          dispatch(orderBookActions.loadItems(socketData["1"]));
        }
      }
      if (tickerChannelId) {
        const socketData = JSON.parse(event.data);
        //console.log(bookChannelId, socketData["0"]);
        if (tickerChannelId === socketData["0"] && socketData["1"] !== "hb") {
          //console.log(socketData["1"]);
          dispatch(tickerActions.loadTickerData(socketData["1"]));
        }
      }
    };

    socket.onclose = (event) => {
      console.log("disconnected from network");
      bookChannelId = undefined;
      tickerChannelId = undefined;
      connectionState = false;
    };
  };
};

export const closeConnection = () => {
  socket.close();
};
