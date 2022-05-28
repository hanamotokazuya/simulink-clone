import { Behavior } from "../behavior";
import { useStateContext } from "../context/StateContext";
import { useEffect } from "react";
import paletteIcon from "../../public/border_all_black_24dp.svg";
import playIcon from "../../public/play_arrow_black_24dp.svg";
import Image from "next/image";

const MenuBar: React.FC = () => {
  const {
    state: { status },
    action,
  } = useStateContext();
  const handleExec = () => {
    action({ type: "CHANGE_STATUS", status: "START" });
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

  return (
    <div className="h-8 bg-gray-200 flex items-center z-50 gap-2 pl-2">
      <div className="w-8 h-8 cursor-pointer" onClick={handleExec}>
        <Image src={playIcon} width={32} height={32} alt="playIcon" />
      </div>
      <div className="w-8 h-8 cursor-pointer">
        <Image src={paletteIcon} width={32} height={32} alt="paletteIcon" />
      </div>
    </div>
  );
};

export default MenuBar;
