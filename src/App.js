import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

import { fetchBookData } from "./store/socket-action";
import Layout from "./components/Layout/Layout";
import Ticker from "./components/Ticker/Ticker";
import OrderBook from "./components/OrderBook/OrderBook";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchBookData("P0"));
  }, [dispatch]);

  return (
    <Layout>
      <Ticker />
      <OrderBook />
    </Layout>
  );
}

export default App;
