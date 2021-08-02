import React from "react";
import Card from "../UI/Card";
import Header from "./Header";
import classes from "./OrderBook.module.css";
import OrderBookBid from "./OrderBookBid/OrderBookBid";
import OrderBookAsk from "./OrderBookAsk/OrderBookAsk";

const OrderBook = () => {
  return (
    <Card>
      <Header />
      <div className={classes.orderBook__body}>
        <OrderBookBid />
        <OrderBookAsk />
      </div>
    </Card>
  );
};

export default OrderBook;
