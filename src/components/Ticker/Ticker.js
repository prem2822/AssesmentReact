import React from "react";
import classes from "./Ticker.module.css";
import Card from "../UI/Card";
import { useSelector } from "react-redux";

const Ticker = () => {
  const tickerData = useSelector((state) => state.ticker.tickerData);
  const tradePercentClass = `${classes.trade_percent} ${
    tickerData.bid
      ? classes["trade_percent--bid"]
      : classes["trade_percent--ask"]
  }`;
  const arrowClass = `${
    tickerData.bid ? classes["arrow-up"] : classes["arrow-down"]
  }`;
  return (
    <Card className={classes.ticker}>
      <div className={classes.ticker__icon__holder}>
        <img
          className={classes.ticker__icon}
          alt="Logo"
          src="https://cdn.worldvectorlogo.com/logos/bitcoin-1.svg"
        ></img>
      </div>
      <div className={classes.ticker__items}>
        <div>
          BTC<span className={classes.soft_text}>/</span>USD
        </div>
        <div>{tickerData.lastPrice}</div>
        <div>
          <span className={classes.soft_text}>VOL </span> {tickerData.volume}
          <span
            style={{ textDecoration: "underline" }}
            className={classes.soft_text}
          >
            BTC
          </span>
        </div>
        <div className={tradePercentClass}>
          ({tickerData.dailyChangeRelative}%)
          <div className={arrowClass}></div>
          {tickerData.dailyChange}
        </div>
        <div>
          <span className={classes.soft_text}>LOW </span> {tickerData.low}
        </div>
        <div>
          <span className={classes.soft_text}>HIGH </span> {tickerData.high}
        </div>
      </div>
    </Card>
  );
};

export default Ticker;
