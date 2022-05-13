import { Node, Inport, Outport } from "./index";
import _ from "lodash";

export const makeInport = (node: Node): Inport[] => {
  if (node.inportNum > 0) {
    return _.range(0, node.inportNum).map((i) => new Inport(node, i));
  }
  return [];
};
export const makeOutport = (node: Node): Outport[] => {
  if (node.outportNum > 0) {
    return _.range(0, node.outportNum).map((i) => new Outport(node, i));
  }
  return [];
};
