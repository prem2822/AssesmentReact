import React from "react";
import classes from "./OrderBookItem.module.css";

const OrderBookItem = (props) => {
  return (
    <li className={classes.orderBookItem}>
      <div>{props.count}</div>
      <div>{Number(props.amount).toFixed(3)}</div>
      <div>{Number(props.total).toFixed(3)}</div>
      <div>{props.price}</div>
    </li>
  );
};

export default OrderBookItem;
