import { fabric } from "fabric";
import { Node, Link } from "./index";

export class Port extends fabric.Triangle {
  parent: Node;
  id: number;
  width: number;
  height: number;
  link: Link | undefined;
  constructor(block: Node, id: number) {
    super();
    this.parent = block;
    this.id = id;
    this.angle = 90;
    this.width = 15;
    this.height = 15;
    this.fill = "black";
    this.hasControls = false;
    this.lockMovementX = true;
    this.lockMovementY = true;
    this.objectCaching = false;
    this.selectable = false;
    this.link = undefined;
  }
}
