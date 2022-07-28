import { Button, CircularProgress } from "@mui/material";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import { chartModel } from "../Api/ChartModel";
import { chartDetails } from "../Api/Constant";
import { Chart, registerables } from "chart.js";
Chart.register(...registerables);

const Cryptochart = ({ id }) => {
  const [chartData, setChartData] = useState();
  const [days, setDays] = useState(1);
  const [flag, setflag] = useState(false);

  const getChartData = async () => {
    const { data } = await axios.get(chartDetails(id, days, "USD"));
    setflag(true);
    setChartData(data.prices);
  };

  useEffect(() => {
    getChartData();
  }, [days]);

  return (
    <div className="p-2 bg-slate-800 m-2 rounded-lg px-5 py-6  ring-1 ring-slate-900/5 shadow-xl mt-2 mb-10">
      {!chartData | (flag === false) ? (
        <CircularProgress style={{ color: "gold" }} size={200} thickness={1} />
      ) : (
        <>
          <Line
            data={{
              labels: chartData.map((coin) => {
                let date = new Date(coin[0]);
                let time =
                  date.getHours() > 12
                    ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                    : `${date.getHours()}:${date.getMinutes()} AM`;
                return days === 1 ? time : date.toLocaleDateString();
              }),

              datasets: [
                {
                  data: chartData.map((coin) => coin[1]),
                  label: `Price ( Past ${days} Days ) in ${"USD"}`,
                  borderColor: "#EEBC1D",
                },
              ],
            }}
            options={{
              elements: {
                point: {
                  radius: 1,
                },
              },
            }}
          />
          <div
            style={{
              display: "flex",
              marginTop: 20,
              justifyContent: "space-around",
              width: "100%",
            }}
          >
            {chartModel.map((day) => (
              <Button
                key={day.value}
                onClick={() => {
                  setDays(day.value);
                  setflag(false);
                }}
                selected={day.value === days}
              >
                {day.label}
              </Button>
            ))}
          </div>
        </>
      )}
    </div>

    ////
  );
};

export default Cryptochart;
