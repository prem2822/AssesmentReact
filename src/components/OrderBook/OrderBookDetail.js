import React from "react";
import classes from "./OrderBookDetail.module.css";
import OrderBookItem from "./OrderBookItem";

const OrderBookDetail = (props) => {
  const OrdBookDetHeadClass = `${classes.orderBookDetail__header} ${
    props.bid
      ? classes["orderBookDetail__header--bid"]
      : classes["orderBookDetail__header--ask"]
  }`;

  const OrdBookDetItemsClass = `${classes.orderBookDetail__items} ${
    props.bid
      ? classes["orderBookDetail__items--bid"]
      : classes["orderBookDetail__items--ask"]
  }`;

  // console.log("OrderBookDetail", props.items);

  return (
    <div className={classes.orderBookDetail}>
      <div className={OrdBookDetHeadClass}>
        <div>COUNT</div>
        <div>AMOUNT</div>
        <div>TOTAL</div>
        <div>PRICE</div>
      </div>
      <div className={classes.orderBookDetail__body}>
        <ul className={OrdBookDetItemsClass}>
          {props.items.map((item) => (
            <OrderBookItem
              key={item.id}
              count={item.count}
              amount={item.amount}
              total={item.total}
              price={item.price}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default OrderBookDetail;
