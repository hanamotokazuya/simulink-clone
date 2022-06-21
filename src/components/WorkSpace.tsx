import { useEffect } from "react";
import { initDiagram } from "..//diagram";
import DialogBox from "./DialogBox";
import { useAppDispatch } from "../redux/stores";

/**
 * パレットとダイアグラムを表示する
 */
const WorkSpace: React.FC = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    const [diagramObj, paletteObj] = initDiagram("diagram", "palette", dispatch);
  }, [dispatch]);
  return (
    <>
      <DialogBox />
      <div className="flex w-[1700px]">
        <canvas className="border-2 border-black" id="palette" />
        <canvas className="border-2 border-black" id="diagram" />
      </div>
    </>
  );
};
export default WorkSpace;
