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
import { useLayoutEffect } from "react";
import { Behavior, Scope } from "../behavior";
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: false,
      text: "Chart.js Line Chart",
    },
  },
};

const data = {
  datasets: [
    {
      label: "Scope",
      data: {},
      borderColor: "rgb(255, 99, 132)",
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
  ],
};

const TimeSeries = () => {
  const { state, action } = useStateContext();
  useLayoutEffect(() => {
    if (state.selectedScope instanceof Scope) {
      if (Object.keys(Behavior.results).length > 0) {
        const result = Behavior.results[state.selectedScope.id];
        data.datasets[0].data = Behavior.time.map((t, i) => ({ x: String(t), y: result[i][0] }));
      }
    }
  }, [state.selectedScope]);
  return (
    <>
      {state.selectedScope instanceof Scope && (
        <div className="fixed top-0 left-0 z-50 flex justify-center w-screen">
          <div className="mt-10 bg-white w-4/5 border-2 border-black rounded">
            <div
              className="bg-green-400 text-right px-2 cursor-pointer"
              onClick={() => action({ type: "CLOSE_SCOPE" })}
            >
              ×
            </div>
            <Line options={options} data={data} />
          </div>
        </div>
      )}
    </>
  );
};
export default TimeSeries;
