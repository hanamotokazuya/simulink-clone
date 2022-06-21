import { Behavior } from "../behavior";
import React, { useState, useEffect } from "react";
import paletteIcon from "../../public/border_all_black_24dp.svg";
import helpIcon from "../../public/help_outline_black_24dp.svg";
import playIcon from "../../public/play_arrow_black_24dp.svg";
import Image from "next/image";
import Link from "next/link";
import { changeStatusAction, useStatusSelector } from "../redux/status";
import { useAppDispatch } from "../redux/stores";

/**
 * 実行機能などを埋め込んだメニューバー
 */
const MenuBar: React.FC = () => {
  const [endTime, setEndTime] = useState(String(Behavior.endTime));
  const [samplingTime, setSamplingTime] = useState(String(Behavior.samplingTime));
  const { status } = useStatusSelector();
  const dispatch = useAppDispatch();
  const handleExec = () => {
    dispatch(changeStatusAction("START"));
    Behavior.endTime = Number(endTime);
    Behavior.samplingTime = Number(samplingTime);
  };
  useEffect(() => {
    if (status === "START") {
      // console.log("START");
      dispatch(changeStatusAction("INITIALIZING"));
    } else if (status === "INITIALIZING") {
      // console.log("INITIALIZING");
      Behavior.init();
      dispatch(changeStatusAction("CHECKING"));
    } else if (status === "CHECKING") {
      // console.log("CHECKING");
      Behavior.check();
      if (Behavior.errorMessages.length === 0) {
        dispatch(changeStatusAction("RUNNING"));
      } else {
        // console.log(Behavior.errorMessages);
        dispatch(changeStatusAction("ERROR", Behavior.errorMessages));
      }
    } else if (status === "RUNNING") {
      // console.log("RUNNNING");
      Behavior.run();
      dispatch(changeStatusAction("FINISHED"));
    }
  }, [status, dispatch]);

  return (
    <div className="w-screen min-w-max h-10 bg-gray-200 flex items-center z-50 pl-4">
      <div className="font-bold text-2xl mr-4">Simulink Clone</div>
      <div className="w-8 h-8 cursor-pointer mr-4" onClick={handleExec}>
        <Image src={playIcon} width={32} height={32} alt="playIcon" />
      </div>
      {/* <div className="w-8 h-8 cursor-pointer">
        <Image src={paletteIcon} width={32} height={32} alt="paletteIcon" />
      </div> */}
      <div>終了時間：</div>
      <input
        type="number"
        max="100"
        min="0"
        className="w-14"
        value={endTime}
        onChange={(e) => setEndTime(e.target.value)}
      />
      <div className="mr-2">[s]</div>
      <div>サンプリング時間：</div>
      <input
        type="number"
        min="0.01"
        step="0.01"
        className="w-14"
        value={samplingTime}
        onChange={(e) => setSamplingTime(e.target.value)}
      />
      {/* <div className="mr-6">[s]</div> */}
      {/* <Link href="/help/howTo"> */}
      {/* <a className="flex items-center" target="_blank"> */}
      {/* <Image src={helpIcon} width={24} height={24} alt="helpIcon" /> */}
      {/* </a> */}
      {/* </Link> */}
    </div>
  );
};

export default MenuBar;
