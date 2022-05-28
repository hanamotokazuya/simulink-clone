import { Behavior } from "../behavior";
import { useStateContext } from "../context/StateContext";
import React, { useState, useEffect } from "react";
import paletteIcon from "../../public/border_all_black_24dp.svg";
import playIcon from "../../public/play_arrow_black_24dp.svg";
import Image from "next/image";

/**
 * 実行機能などを埋め込んだメニューバー
 */
const MenuBar: React.FC = () => {
  const [endTime, setEndTime] = useState(String(Behavior.endTime));
  const [samplingTime, setSamplingTime] = useState(String(Behavior.samplingTime));
  const {
    state: { status },
    action,
  } = useStateContext();
  const handleExec = () => {
    action({ type: "CHANGE_STATUS", status: "START" });
    Behavior.endTime = Number(endTime);
    Behavior.samplingTime = Number(samplingTime);
  };
  useEffect(() => {
    if (status === "START") {
      // console.log("START");
      action({ type: "CHANGE_STATUS", status: "INITIALIZING" });
    } else if (status === "INITIALIZING") {
      // console.log("INITIALIZING");
      Behavior.init();
      action({ type: "CHANGE_STATUS", status: "CHECKING" });
    } else if (status === "CHECKING") {
      // console.log("CHECKING");
      Behavior.check();
      if (Behavior.errorMessages.length === 0) {
        action({ type: "CHANGE_STATUS", status: "RUNNING" });
      } else {
        // console.log(Behavior.errorMessages);
        action({ type: "CHANGE_STATUS", status: "ERROR" });
      }
    } else if (status === "RUNNING") {
      // console.log("RUNNNING");
      Behavior.run();
      action({ type: "CHANGE_STATUS", status: "FINISHED" });
    }
  }, [status, action]);
  // const handleChangeEndTime = (target: string) => !isNaN(Number(target)) && Number(target) > 0 setEndTime(num);
  // const handleChangeSamplingTime = (target: string) => !isNaN(num) && setSamplingTime(num);

  return (
    <div className="h-8 bg-gray-200 flex items-center z-50 pl-4">
      <div className="w-8 h-8 cursor-pointer mr-4" onClick={handleExec}>
        <Image src={playIcon} width={32} height={32} alt="playIcon" />
      </div>
      {/* <div className="w-8 h-8 cursor-pointer">
        <Image src={paletteIcon} width={32} height={32} alt="paletteIcon" />
      </div> */}
      <div className="mr-2">終了時間:</div>
      <input
        type="number"
        className="w-8"
        value={endTime}
        onChange={(e) => setEndTime(e.target.value)}
      />
      <div className="mr-2">[s]</div>
      <div className="mr-2">サンプリング時間: </div>
      <input
        type="number"
        className="w-8"
        value={samplingTime}
        onChange={(e) => setSamplingTime(e.target.value)}
      />
      <div>[s]</div>
    </div>
  );
};

export default MenuBar;
