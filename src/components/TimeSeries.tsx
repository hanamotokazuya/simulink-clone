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
import { useLayoutEffect } from "react";
import { Behavior, Scope } from "../behavior";
import { useScopeSelector, closeScopeAction } from "../redux/scope";
import { useAppDispatch } from "../redux/stores";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const options = {
  responsive: true,
  elements: {
    point: {
      radius: 0,
    },
  },
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: false,
      text: "Chart.js Line Chart",
    },
  },
  scales: {
    r: {
      grid: {
        display: false,
      },
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

/**
 * Scopeブロックに対応した実行結果を表示するチャート
 */
const TimeSeries = () => {
  const { selectedScope } = useScopeSelector();
  const dispatch = useAppDispatch();
  useLayoutEffect(() => {
    if (selectedScope instanceof Scope) {
      if (Object.keys(Behavior.results).length > 0) {
        const result = Behavior.results[selectedScope.id];
        data.datasets[0].data = Behavior.time.map((t, i) => ({ x: String(t), y: result[i][0] }));
      }
    }
  }, [selectedScope]);
  return (
    <>
      {selectedScope instanceof Scope && (
        <div className="fixed top-0 left-0 z-50 flex justify-center w-screen">
          <div className="mt-10 bg-white w-4/5 border-2 border-black rounded">
            <div
              className="bg-green-400 text-right px-2 cursor-pointer"
              onClick={() => dispatch(closeScopeAction())}
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
