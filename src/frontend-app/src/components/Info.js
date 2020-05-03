import React from "react";
import styled from "styled-components";

const Info = styled.section`
  background-color: #efefef;
  width: 100%;
  margin: 0;
  padding: 60px 25px;
`;

export default ({ status }) => {
  return (
    <Info >
      <svg
        width="30"
        height="44"
        viewBox="0 0 30 44"
        fill="none"
        stroke={status.isWatering ? "#8fd7ff" : "#e5e5e5"}
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M15.0853 3C17.0794 5.3333 20.1227 9.38481 22.6688 13.8539C25.2099 18.3143 27.2778 23.228 27.2778 27.2746C27.2778 32.2937 25.9426 35.735 23.7355 37.9203C21.5295 40.1045 18.4863 41 15.1389 41C11.7912 41 8.74781 40.099 6.54179 37.9019C4.33493 35.7039 3 32.2426 3 27.1942C3 23.1253 5.01151 18.2394 7.49795 13.8076C9.98888 9.36772 12.977 5.3479 14.9713 3.0005L15.0282 3.04969L15.0853 3ZM15.0294 3.61964C17.0059 5.97595 19.8718 9.8381 22.286 14.0758C24.8212 18.5256 26.8364 23.3523 26.8364 27.2746C26.8364 32.2165 25.523 35.5265 23.4263 37.6024C21.3286 39.6793 18.4127 40.5546 15.1389 40.5546C11.8654 40.5546 8.94967 39.6743 6.8519 37.5849C4.75496 35.4964 3.44141 32.1661 3.44141 27.1942C3.44141 23.2469 5.40263 18.4464 7.8821 14.027C10.2441 9.81695 13.0577 5.98491 15.0294 3.61964Z"
          // stroke="#E5E5E5"
          stroke-width="4.22222"
        />
        <path
          d="M13.3231 15.5582C12.0001 17.1481 9.39644 21.1062 9.56582 24.2196"
          // stroke="#E5E5E5"
          stroke-width="3.16667"
        />
      </svg>
      {status.isWatering && <p>Watering</p>}

      {status.cycleInProgress && <p>Cycle in progress</p>}

      {status.timeRemaining > 0 && <p>Time Remaining : {status.timeRemaining / 1000} seconds</p>}
    </Info>
  );
};
