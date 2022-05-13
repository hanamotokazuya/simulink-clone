import { Behavior } from "../behavior";
import { useState } from "react";

const Bar: React.FC = () => {
  const READY_COLOR = "bg-blue-400";
  const RUNNING_COLOR = "bg-red-400";
  const FINISHED_COLOR = "bg-green-400";
  const [execPhase, setExecPhase] = useState(READY_COLOR);
  const handleExec = () => {
    setExecPhase(RUNNING_COLOR);
    Behavior.run();
    setExecPhase(FINISHED_COLOR);
    console.log(Behavior.results);
  };

  return (
    <div className="fixed top-0 left- 0 w-full h-10 bg-gray-200 flex items-center z-50">
      <div className={`${execPhase} w-8 h-8 rounded-full`} onClick={handleExec}></div>
    </div>
  );
};

export default Bar;
