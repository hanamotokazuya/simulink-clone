import { useState } from "react";
import { useStateContext } from "../context/StateContext";
import Component from "./Component";

const WorkSpace: React.FC = () => {
  const { state, action } = useStateContext();
  const handleClick = (posX: number, posY: number) => {
    action({ type: "SET_COMPONENT", posX, posY });
  };
  const [clientPos, setClientPos] = useState({ clientX: 0, clientY: 0 });

  return (
    <div className="fixed top-0 left-0 w-screen h-screen bg-gray-300 overflow-scroll">
      <div
        className="absolute w-[2000px] h-[2000px] bg-red-300 top-0 left-0"
        onClick={(e) => handleClick(e.clientX, e.clientY)}
        onMouseMove={(e) => setClientPos({ clientX: e.clientX, clientY: e.clientY })}
      >
        {state.selectComponent && (
          <div
            className="absolute px-4 py-2 bg-gray-500 -translate-x-1/2 -translate-y-1/2 opacity-50"
            style={{ top: `${clientPos.clientY}px`, left: `${clientPos.clientX}px` }}
          >
            {state.selectComponent}
          </div>
        )}
        {state.components.map((component, i) => (
          <Component key={i} component={component} />
        ))}
      </div>
    </div>
  );
};

export default WorkSpace;
