import React from "react";
import { formatToLocalTime } from "../main/service";

function LocalTime({ weather: { dt, timezone, name } }) {
  return (
    <div>
      <div className="flex items-center justify-center my-6">
        <p className="text-white text-xl font-extralight">
          {formatToLocalTime(dt, timezone)}
        </p>
      </div>

      <div className="flex items-center justify-center my-3">
        <p className="text-white text-3xl font-medium">{`${name}`}</p>
      </div>
    </div>
  );
}

export default LocalTime;
