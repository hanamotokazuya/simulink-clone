import { useEffect } from "react";
import { initDiagram } from "../lib/diagrams";
const WorkSpace: React.FC = () => {
  useEffect(() => {
    initDiagram("diagram", "palette");
  }, []);
  return (
    <div className="translate-y-10 flex">
      <canvas className="border-2 border-black" id="diagram" />
      <canvas className="border-2 border-black" id="palette" />
    </div>
  );
};
export default WorkSpace;
