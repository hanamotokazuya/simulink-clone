import { Block, Inport, Outport, makeInport, makeOutport } from "./index";
import { Behavior, setBehavior } from "../behavior";
import { fabric } from "fabric";

export class Node extends Block {
  static diagram: fabric.Canvas | undefined = undefined;
  static nodes: { [key in number]: Node } = {};
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
  addBlock(key: number) {
    Node.nodes[key] = this;
  }
  out(): fabric.Object[] {
    return [this, ...this.inport, ...this.outport];
  }
  updateSurrroundingPos() {
    this.inport.forEach((inport, i) => {
      this.updatePortAndLinkPos(inport, i);
    });
    this.outport.forEach((outport, i) => {
      this.updatePortAndLinkPos(outport, i);
    });
  }
  private updatePortAndLinkPos(port: Inport | Outport, i: number) {
    const calcTop = (i: number, n: number) =>
      this.top + ((1 + i) * (this.height * this.scaleY)) / (n + 1) - port.height / 2;
    port.left =
      port.name === "inport" ? this.left : this.left + this.width * this.scaleX + port.height;
    port.top = port.name === "inport" ? calcTop(i, this.inportNum) : calcTop(i, this.outportNum);
    port.links.forEach((link) => {
      if (link && link.path && Array.isArray(link.path[0]) && Array.isArray(link.path[1])) {
        let sLeft: number, sTop: number, eLeft: number, eTop: number;
        if (port.name === "inport") {
          [sLeft, sTop] = link.path[0].slice(1);
          [eLeft, eTop] = [port.left, port.top + port.width / 2];
          link.path[1].splice(1, 2, eLeft, eTop);
        } else {
          [sLeft, sTop] = [port.left - port.height, port.top + port.width / 2];
          [eLeft, eTop] = link.path[1].slice(1);
          link.path[0].splice(1, 2, sLeft, sTop);
        }
        link.left = Math.min(sLeft, eLeft);
        link.top = Math.min(sTop, eTop);
        link.width = Math.abs(eLeft - sLeft);
        link.height = Math.abs(eTop - sTop);
        link.pathOffset = new fabric.Point(link.width / 2 + link.left, link.height / 2 + link.top);
        link.dirty = true;
        link.setCoords();
      }
    });
    port.setCoords();
  }
}
