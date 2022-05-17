import { useEffect } from "react";
import { initDiagram } from "..//diagram";
import { useStateContext } from "../context/StateContext";
import DialogBox from "./DialogBox";
const WorkSpace: React.FC = () => {
  const { action } = useStateContext();
  useEffect(() => {
    const [diagram, palette] = initDiagram("diagram", "palette", action);
    action({ type: "INIT", diagram, palette });
  }, [action]);
  return (
    <>
      <DialogBox />
      <div className="flex">
        <canvas className="border-2 border-black" id="diagram" />
        <canvas className="border-2 border-black" id="palette" />
      </div>
    </>
  );
};
export default WorkSpace;
