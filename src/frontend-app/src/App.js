import React, { useEffect, useState } from "react";
import axios from "axios";

import Header from "./components/Header";
import Info from "./components/Info";
import Form from "./components/Form";

import "./App.css";

function App() {
  const [status, setStatus] = useState({
    isWatering: false,
    cycleInProgress: false,
    timeRemaining: 0,
  });

  useEffect(() => {
    setInterval(getStatus, 1000);
  }, []);

  const getStatus = async () => {
    const { data } = await axios.get("/status");
    setStatus(data);
  };

  return (
    <div>
      <Header />
      <Info status={status} />
      <Form isWatering={status.isWatering} />
    </div>
  );
}

export default App;
