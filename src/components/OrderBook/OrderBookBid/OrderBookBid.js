import React from "react";
import OrderBookDetail from "../OrderBookDetail";
import { useSelector } from "react-redux";

const OrderBookBid = () => {
  const bidItems = useSelector((state) => state.orderBook.bidItems);
  let slicedBidItems = [];
  if (bidItems.length > 15) {
    slicedBidItems = bidItems.slice(0, 15);
  }
  // console.log("OrderBookBid", bidItems);
  return <OrderBookDetail bid={true} items={slicedBidItems} />;
};

export default OrderBookBid;
