import { Node, Port } from "./index";

export class Inport extends Port {
  name: string;
  left: number;
  top: number;
  constructor(node: Node, id: number) {
    super(node, id);
    this.name = "inport";
    this.left = node.left;
    const portNum = node.inportNum;
    this.top = node.top + ((1 + this.id) * node.height) / (portNum + 1) - this.height / 2;
  }
}
