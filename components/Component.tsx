import { ComponentBase } from "../lib/component";
import _ from "lodash";
import React, { useState } from "react";

type Props = {
  component: ComponentBase;
};
const Component: React.FC<Props> = ({ component }) => {
  const [inport, setInport] = useState(String(component.inputLink));
  const [properties, setProperties] = useState(Object.keys(component.property));
  const [values, setValues] = useState(Object.values(component.property).map(String));
  const [isOpenMenu, setIsOpenMenu] = useState(false);

  const handleOpenMenu = () => {
    setInport(String(component.inputLink));
    setProperties(Object.keys(component.property));
    setValues(Object.values(component.property).map(String));
    setIsOpenMenu(true);
  };
  const handleSetValues = (i: number, e: React.ChangeEvent<HTMLInputElement>) => {
    let newValues = _.clone(values);
    newValues[i] = e.target.value;
    setValues(newValues);
  };
  const handleEnter = () => {
    if (inport) {
      component.inputLink = inport.split(",").map(Number).slice(0, component.inportNum);
    } else {
      component.inputLink = [];
    }
    for (let i = 0; i < properties.length; i++) {
      if (properties[i] in component.property) {
        component.property[properties[i]] = Number(values[i]);
      }
    }
    setIsOpenMenu(false);
  };
  return (
    <div
      className="absolute -translate-x-1/2 -translate-y-1/2"
      style={{ top: `${component.y}px`, left: `${component.x}px` }}
    >
      <div className={`px-2 py-2 bg-gray-500 flex justify-between gap-2`} onClick={handleOpenMenu}>
        <div className="flex flex-col">
          {_.range(component.inportNum).map((i) => (
            <div key={i}>{component.inputLink[i]}</div>
          ))}
        </div>
        <div>{component.name}</div>
        <div>{component.id}</div>
      </div>
      <div className={`${isOpenMenu ? "" : "hidden"} flex flex-col bg-white border`}>
        <div className="flex">
          <div className="w-1/4">接続元</div>
          <input
            type="text"
            value={`${inport}`}
            className="w-3/4 border"
            onChange={(e) => setInport(e.target.value)}
          />
        </div>
        {_.range(properties.length).map((i) => (
          <div key={i} className="flex">
            <div className="w-1/4">{properties[i]}</div>
            <input
              className="w-3/4"
              value={`${values[i]}`}
              onChange={(e) => handleSetValues(i, e)}
            />
          </div>
        ))}
        <button onClick={handleEnter}>OK</button>
      </div>
    </div>
  );
};

export default Component;
