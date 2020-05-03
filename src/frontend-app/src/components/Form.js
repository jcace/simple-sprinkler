import React, { useState } from "react";
import {
  Button,
  Checkbox,
  FormControlLabel,
  Select,
  MenuItem,
  InputLabel,
  Container,
} from "@material-ui/core";
import axios from "axios";

const Form = ({ isWatering }) => {
  const [cycleMode, setCycleMode] = useState(false);
  const [timeToWater, setTimeToWater] = useState(5);
  const [zoneToWater, setZoneToWater] = useState(1);

  const submitForm = async () => {
    if (isWatering) {
      await axios.delete("/water");
    } else if (cycleMode) {
      await axios.post("/cycle", { time: convertMinutesToMs(timeToWater) });
    } else {
      await axios.post("/water", {
        zone: zoneToWater,
        time: convertMinutesToMs(timeToWater),
      });
    }

    axios.post();
  };

  return (
    <Container>
      {!isWatering && (
        <div>
          <FormControlLabel
            control={
              <Checkbox
                checked={cycleMode}
                onChange={() => setCycleMode(!cycleMode)}
                name="cycle"
                color="primary"
                style={{ height: "50px" }}
              />
            }
            label="Cycle Mode"
          />

          {!cycleMode && (
            <div style={{ padding: "20px 0" }}>
              <InputLabel htmlFor="select-zone">Zone To Water</InputLabel>
              <Select
                native
                inputProps={{ id: "select-zone" }}
                value={zoneToWater}
                onChange={(e) => setZoneToWater(e.target.value)}
                style={{ width: "100%" }}
              >
                <option value={1}>Zone 1</option>
                <option value={2}>Zone 2</option>
                <option value={3}>Zone 3</option>
              </Select>
            </div>
          )}

          <div style={{ padding: "20px 0" }}>
            <InputLabel htmlFor="select-time">Time To Water</InputLabel>
            <Select
              native
              value={timeToWater}
              inputProps={{ id: "select-time" }}
              onChange={(e) => setTimeToWater(e.target.value)}
              style={{ width: "100%" }}
            >
              <option value={5}>5 Minutes</option>
              <option value={10}>10 Minutes</option>
              <option value={15}>15 Minutes</option>
            </Select>
          </div>
        </div>
      )}
      <Button
        variant="contained"
        color="primary"
        onClick={submitForm}
        style={{
          width: "100%",
          backgroundColor: "#486c80",
          marginTop: "25px",
        }}
      >
        {isWatering ? "Stop Watering" : "Go!"}
      </Button>
    </Container>
  );
};

const convertMinutesToMs = (minutes) => minutes * 60 * 1000;

export default Form;
