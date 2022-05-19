import { useEffect } from "react";
import { initDiagram } from "..//diagram";
import { useStateContext } from "../context/StateContext";
import DialogBox from "./DialogBox";
const WorkSpace: React.FC = () => {
  const { action } = useStateContext();
  useEffect(() => {
    const [diagramObj, paletteObj] = initDiagram("diagram", "palette", action);
    action({ type: "INIT", diagram: diagramObj, palette: paletteObj });
  }, [action]);
  return (
    <>
      <DialogBox />
      <div className="flex">
        <canvas className="border-2 border-black" id="palette" />
        <canvas className="border-2 border-black" id="diagram" />
      </div>
    </>
  );
};
export default WorkSpace;
