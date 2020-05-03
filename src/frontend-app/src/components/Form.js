import React, { useState } from "react";
import {
  Button,
  Checkbox,
  FormControlLabel,
  Select,
  MenuItem,
  InputLabel,
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
    <div>
      {!isWatering && (
        <div>
          <FormControlLabel
            control={
              <Checkbox
                checked={cycleMode}
                onChange={() => setCycleMode(!cycleMode)}
                name="cycle"
                color="primary"
                style={{ width: "50px", height: "50px" }}
              />
            }
            label="Cycle Mode"
          />

          {!cycleMode && (
            <>
              <InputLabel htmlFor="select-zone">Zone To Water</InputLabel>
              <Select
                native
                inputProps={{ id: "select-zone" }}
                value={zoneToWater}
                onChange={(e) => setZoneToWater(e.target.value)}
              >
                <option value={1}>Zone 1</option>
                <option value={2}>Zone 2</option>
                <option value={3}>Zone 3</option>
              </Select>
            </>
          )}

          <InputLabel htmlFor="select-time">Time To Water</InputLabel>
          <Select
            native
            value={timeToWater}
            inputProps={{ id: "select-time" }}
            onChange={(e) => setTimeToWater(e.target.value)}
          >
            <option value={5}>5 Minutes</option>
            <option value={10}>10 Minutes</option>
            <option value={15}>15 Minutes</option>
          </Select>
        </div>
      )}
      <Button color="primary" onClick={submitForm}>
        {isWatering ? "Stop Watering" : "Go!"}
      </Button>
    </div>
  );
};

const convertMinutesToMs = (minutes) => minutes * 60 * 1000;

export default Form;
