import React from "react";
import OrderBookDetail from "../OrderBookDetail";
import { useSelector } from "react-redux";

const OrderBookAsk = () => {
  const askItems = useSelector((state) => state.orderBook.askItems);
  let slicedAskItems = [];
  if (askItems.length > 15) {
    slicedAskItems = askItems.slice(0, 15);
  }
  // console.log("OrderBookAsk", askItems);
  return <OrderBookDetail bid={false} items={slicedAskItems} />;
};

export default OrderBookAsk;
