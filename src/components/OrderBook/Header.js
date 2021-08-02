import React, { useState } from "react";
import classes from "./Header.module.css";
import { useDispatch } from "react-redux";
import { fetchBookData, closeConnection } from "../../store/socket-action";
import { orderBookActions } from "../../store/orderBook-slice";

let precision = 0;

const Header = () => {
  const dispatch = useDispatch();
  const [disableBtn, setDisableBtn] = useState({
    increment: false,
    decrement: true,
  });

  const [connectionState, setConnectionState] = useState(true);

  const btnIncreasePrecHandler = () => {
    dispatch(orderBookActions.clearItems());
    precision++;
    dispatch(fetchBookData("P" + precision));
    if (precision === 4) {
      setDisableBtn({
        increment: true,
        decrement: false,
      });
    } else if (precision === 0) {
      setDisableBtn({
        increment: false,
        decrement: true,
      });
    } else {
      setDisableBtn({
        increment: false,
        decrement: false,
      });
    }
  };

  const btnDecreasePrecHandler = () => {
    dispatch(orderBookActions.clearItems());
    precision--;
    dispatch(fetchBookData("P" + precision));
    if (precision === 4) {
      setDisableBtn({
        increment: true,
        decrement: false,
      });
    } else if (precision === 0) {
      setDisableBtn({
        increment: false,
        decrement: true,
      });
    } else {
      setDisableBtn({
        increment: false,
        decrement: false,
      });
    }
  };

  const btnDisconnectHandler = () => {
    setConnectionState(false);
    dispatch(orderBookActions.clearItems());
    closeConnection();
    precision = 0;
  };
  const btnConnectHandler = () => {
    setConnectionState(true);
    setDisableBtn({
      increment: false,
      decrement: true,
    });
    dispatch(fetchBookData("P0"));
    precision = 0;
  };

  return (
    <div className={classes.header}>
      <div>Order book BTC/USD</div>
      <div className={classes.panelPrecision}>
        <button
          disabled={disableBtn.increment}
          onClick={btnIncreasePrecHandler}
        >
          +
        </button>
        <button
          disabled={disableBtn.decrement}
          onClick={btnDecreasePrecHandler}
        >
          -
        </button>
      </div>
      <div>
        <button disabled={connectionState} onClick={btnConnectHandler}>
          Connect
        </button>
        <button disabled={!connectionState} onClick={btnDisconnectHandler}>
          Disconnect
        </button>
      </div>
    </div>
  );
};

export default Header;
