import { Node, Port } from "./index";

export class Outport extends Port {
  name: string;
  left: number;
  top: number;
  constructor(node: Node, id: number) {
    super(node, id);
    this.name = "outport";
    const portNum = node.outportNum;
    this.left = node.left + node.width + this.height;
    this.top = node.top + ((1 + this.id) * node.height) / (portNum + 1) - this.height / 2;
  }
}
