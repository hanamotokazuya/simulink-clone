import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { useStateContext } from "../context/StateContext";
import { useEffect } from "react";
import { Behavior } from "../behavior";
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Chart.js Line Chart",
    },
  },
  LinearScale: {
    x: {
      type: "timeseries",
      unit: "second",
    },
  },
};

const data = {
  datasets: [
    {
      label: "Dataset 1",
      data: {},
      borderColor: "rgb(255, 99, 132)",
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
  ],
};

const TimeSeries = () => {
  const { state, action } = useStateContext();
  useEffect(() => {
    if (state.selectedScope !== undefined) {
      if (Object.keys(Behavior.results).length > 0) {
        const result = Behavior.results[state.selectedScope.id];
        data.datasets[0].data = Behavior.time.map((t, i) => ({ x: String(t), y: result[i][0] }));
      }
    }
  }, [state.selectedScope]);
  return (
    <>
      {state.selectedScope !== undefined && (
        <>
          <div className="w-20, h-20 bg-green-400" onClick={() => action({ type: "CLOSE_SCOPE" })}>
            x
          </div>
          <Line options={options} data={data} />
        </>
      )}
    </>
  );
};
export default TimeSeries;
