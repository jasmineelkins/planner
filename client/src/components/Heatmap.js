import React, { useEffect, useState } from "react";
import CalendarHeatmap from "react-calendar-heatmap";
import "react-calendar-heatmap/dist/styles.css";
import RouteButton from "./RouteButton";

function Heatmap({ completedTasks }) {
  // 1. count how many items are in completedTasks

  // console.log("Completed Tasks: ", completedTasks);
  // const [heatMap, setHeatMap] = useState([]);

  // useEffect(() => {
  //   let res = completedTasks.reduce(function (obj, v) {
  //     obj[v.date] = (obj[v.date] || 0) + 1;
  //     return obj;
  //   }, {});
  //   setHeatMap(res);
  // }, [completedTasks]);

  // console.log("Heatmap: ", heatMap);

  function groupBy(objectArray, property) {
    return objectArray.reduce(function (acc, obj) {
      let key = obj[property];
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(obj);
      return acc;
    }, {});
  }

  let heatMapObj = groupBy(completedTasks, "date");
  // console.log("heatmapobj", heatMapObj);

  const heatMapArray = Object.keys(heatMapObj).map((obj) => ({
    date: obj,
    count: heatMapObj[obj].length,
  }));
  // console.log(heatMapArray);

  return (
    <div className="heatmapContainer item6">
      <RouteButton path="heatmap" />

      <CalendarHeatmap
        startDate={new Date("2022-01-01")}
        endDate={new Date("2022-12-31")}
        values={heatMapArray}
        showWeekdayLabels={true}
        classForValue={(value) => {
          if (!value) {
            return "color-empty";
          }
          return `color-scale-${value.count}`;
        }}
      />
    </div>
  );
}

export default Heatmap;
