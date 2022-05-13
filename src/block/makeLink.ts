import { Outport, Inport, Link } from "./index";
import { Behavior } from "../behavior";

/**
 * ポート間のリンクを生成する．
 */
export const makeLink = (outport: Outport, inport: Inport) => {
  const svg = `M ${outport.left - outport.height} ${outport.top + outport.width / 2} L ${
    inport.left
  } ${inport.top + inport.width / 2}`;
  const link = new Link(svg, { fill: "", stroke: "black", selectable: false });
  const key = String(link.id);
  const from = { [String(outport.parent.id)]: outport.id };
  const to = { [String(inport.parent.id)]: inport.id };
  Behavior.addLink(key, from, to);
  return link;
};
