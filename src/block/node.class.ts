import { Block, Inport, Outport, makeInport, makeOutport, Link } from "./index";
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
      // if (link && link.path && Array.isArray(link.path[0]) && Array.isArray(link.path[1])) {
      //   let sLeft: number, sTop: number, eLeft: number, eTop: number;
      //   if (port.name === "inport") {
      //     [sLeft, sTop] = link.path[0].slice(1);
      //     [eLeft, eTop] = [port.left, port.top + port.width / 2];
      //     link.path[1].splice(1, 2, eLeft, eTop);
      //   } else {
      //     [sLeft, sTop] = [port.left - port.height, port.top + port.width / 2];
      //     [eLeft, eTop] = link.path[1].slice(1);
      //     link.path[0].splice(1, 2, sLeft, sTop);
      //   }
      //   link.left = Math.min(sLeft, eLeft);
      //   link.top = Math.min(sTop, eTop);
      //   link.width = Math.abs(eLeft - sLeft);
      //   link.height = Math.abs(eTop - sTop);
      //   link.pathOffset = new fabric.Point(link.width / 2 + link.left, link.height / 2 + link.top);
      //   link.dirty = true;
      //   link.setCoords();
      // }
      updateLinkPath(link);
    });
    port.setCoords();
  }
}

const updateLinkPath = (link: Link): void => {
  const linkInfo = Behavior.links[link.id];
  if (
    linkInfo &&
    link.path &&
    Array.isArray(link.path[0]) &&
    Array.isArray(link.path[1]) &&
    Array.isArray(link.path[2]) &&
    Array.isArray(link.path[3]) &&
    Array.isArray(link.path[4]) &&
    Array.isArray(link.path[5])
  ) {
    const [[fromNodeId, outportId]] = Object.entries(linkInfo.from);
    const [[toNodeId, inportId]] = Object.entries(linkInfo.to);
    const outport = Node.nodes[Number(fromNodeId)].outport[outportId];
    const inport = Node.nodes[Number(toNodeId)].inport[inportId];
    const startPointX = outport.left - outport.height;
    const startPointY = outport.top + outport.width / 2;
    const endPointX = inport.left;
    const endPointY = inport.top + inport.width / 2;
    const diffStartToEndX = endPointX - startPointX;
    const diffStartToEndY = endPointY - startPointY;
    const minDiffX = 60;
    const outportNodeBottom = outport.parent.top + outport.parent.height * outport.parent.scaleY;
    const outportNodeTop = outport.parent.top;
    const inportNodeBottom = inport.parent.top + inport.parent.height * inport.parent.scaleY;
    const inportNodeTop = inport.parent.top;
    let halfwayPointY: number;
    let innerDiffY: number;
    if (outportNodeTop > inportNodeTop) {
      innerDiffY = outportNodeTop - inportNodeBottom;
      halfwayPointY = inportNodeBottom + innerDiffY / 2;
    } else {
      innerDiffY = inportNodeTop - outportNodeBottom;
      halfwayPointY = outportNodeBottom + innerDiffY / 2;
    }
    let maxBottom = Math.max(outportNodeBottom, inportNodeBottom);
    let pointX1: number;
    let pointY1: number;
    let pointX2: number;
    let pointY2: number;
    let pointX3: number;
    let pointY3: number;
    let pointX4: number;
    let pointY4: number;
    if (diffStartToEndX < minDiffX) {
      if (innerDiffY < 0) {
        pointX1 = startPointX + minDiffX / 2;
        pointY1 = startPointY;
        pointX2 = pointX1;
        pointY2 = maxBottom + 30;
        pointX3 = pointX2 + diffStartToEndX - minDiffX;
        pointY3 = pointY2;
        pointX4 = pointX3;
        pointY4 = endPointY;
      } else {
        pointX1 = startPointX + minDiffX / 2;
        pointY1 = startPointY;
        pointX2 = pointX1;
        pointY2 = halfwayPointY;
        pointX3 = pointX2 + diffStartToEndX - minDiffX;
        pointY3 = pointY2;
        pointX4 = pointX3;
        pointY4 = endPointY;
      }
    } else {
      pointX1 = startPointX + diffStartToEndX / 2;
      pointY1 = startPointY;
      pointX2 = pointX1;
      pointY2 = pointY1 + diffStartToEndY / 2;
      pointX3 = pointX2;
      pointY3 = pointY2;
      pointX4 = pointX3;
      pointY4 = endPointY;
    }
    link.path[0].splice(1, 2, startPointX, startPointY);
    link.path[1].splice(1, 2, pointX1, pointY1);
    link.path[2].splice(1, 2, pointX2, pointY2);
    link.path[3].splice(1, 2, pointX3, pointY3);
    link.path[4].splice(1, 2, pointX4, pointY4);
    link.path[5].splice(1, 2, endPointX, endPointY);
    link.left = Math.min(startPointX, endPointX, pointX1, pointX2, pointX3, pointX4);
    link.top = Math.min(startPointY, endPointY, pointY1, pointY2, pointY3, pointY4);
    const maxRight = Math.max(startPointX, endPointX, pointX1, pointX2, pointX3, pointX4);
    maxBottom = Math.max(startPointY, endPointY, pointY1, pointY2, pointY3, pointY4);
    link.width = Math.abs(maxRight - link.left);
    link.height = Math.abs(maxBottom - link.top);
    link.pathOffset = new fabric.Point(link.width / 2 + link.left, link.height / 2 + link.top);
    link.dirty = true;
    link.setCoords();
  } else {
    return;
  }
};
