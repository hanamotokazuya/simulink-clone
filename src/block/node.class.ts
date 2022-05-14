import { Block, Inport, Outport, makeInport, makeOutport } from "./index";
import { Behavior, setBehavior } from "../behavior";

export class Node extends Block {
  static diagram: fabric.Canvas | undefined = undefined;
  static nodes: { [key in number]?: Node } = {};
  static idCount: number = 0;
  id: number;
  name: string;
  left: number;
  top: number;
  behavior: Behavior;
  inportNum: number;
  outportNum: number;
  inport: Inport[];
  outport: Outport[];
  constructor(name: string, left: number, top: number, options?: fabric.IGroupOptions) {
    super(name, options);
    this.id = Node.idCount;
    Node.idCount++;
    this.name = name;
    this.left = left;
    this.top = top;
    this.behavior = setBehavior(this.id, name);
    this.inportNum = this.behavior.inportNum;
    this.outportNum = this.behavior.outportNum;
    this.inport = makeInport(this);
    this.outport = makeOutport(this);
    this.groupedObj[1].text = this.behavior.toString();
    this.addBlock(this.id);
  }
  calcSurrroundingPos() {
    this.inport.forEach((inport, i) => {
      inport.left = this.left;
      inport.top =
        this.top +
        ((1 + i) * (this.height * this.scaleY)) / (this.inportNum + 1) -
        inport.height / 2;
      if (inport.link && inport.link.path && Array.isArray(inport.link.path[1])) {
        inport.link.dirty = true;
        inport.link.path[1][1] = inport.left;
        inport.link.path[1][2] = inport.top + inport.width / 2;
        inport.link.setCoords();
      }
      inport.setCoords();
    });
    this.outport.forEach((outport, i) => {
      outport.left = this.left + this.width * this.scaleX + outport.height;
      outport.top =
        this.top +
        ((1 + i) * (this.height * this.scaleY)) / (this.outportNum + 1) -
        outport.height / 2;
      if (outport.link && outport.link.path && Array.isArray(outport.link.path[0])) {
        outport.link.dirty = true;
        outport.link.path[0][1] = outport.left - outport.height;
        outport.link.path[0][2] = outport.top + outport.width / 2;
        outport.link.setCoords();
      }
      outport.setCoords();
    });
  }
  out(): fabric.Object[] {
    return [this, ...this.inport, ...this.outport];
  }
  addBlock(key: number) {
    Node.nodes[key] = this;
  }
  static removeBlock(key: number) {
    delete Node.nodes[key];
  }
  static setText(key: number) {
    const node = Node.nodes[key];
    if (node) {
      node.dirty = true;
      node.groupedObj[1].text = node.behavior.toString();
    }
  }
  static init(diagram: fabric.Canvas) {
    this.diagram = diagram;
  }
}
