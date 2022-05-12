import { fabric } from "fabric";
import { ComponentBase, setComponent } from "./behavior";

export class BlockBase extends fabric.Group {
  width: number;
  height: number;
  scaleX: number;
  scaleY: number;
  constructor(name: string, options?: fabric.IGroupOptions, isAlreadyGrouped?: boolean) {
    const width = 100;
    const height = 55;
    super(
      [
        new fabric.Rect({
          width,
          height,
          fill: "#eee",
          stroke: "black",
        }),
        new fabric.Text(name, {
          width,
          height,
          textAlign: "center",
          fontSize: 16,
        }),
      ],
      options,
      isAlreadyGrouped
    );
    this.width = width;
    this.height = height;
    this.scaleX = 1;
    this.scaleY = 1;
  }
}
export class PaletteBlock extends BlockBase {
  name: string;
  left: number;
  top: number;
  constructor(name: string, left: number, top: number, options?: fabric.IGroupOptions) {
    super(name, options);
    this.name = name;
    this.left = left;
    this.top = top;
    this.hasControls = false;
    this.lockMovementX = true;
    this.lockMovementY = true;
    this.lockRotation = true;
  }
}
export class Block extends BlockBase {
  static idCount: number = 0;
  id: number;
  name: string;
  left: number;
  top: number;
  behavior: ComponentBase;
  inport: Inport;
  outport: Outport;
  constructor(name: string, left: number, top: number, options?: fabric.IGroupOptions) {
    super(name, options);
    this.id = Block.idCount;
    Block.idCount++;
    this.name = name;
    this.left = left;
    this.top = top;
    this.behavior = setComponent(this.id, name);
    this.inport = new Inport(this, 0);
    this.outport = new Outport(this, 0);
  }
  calcInportPos() {
    let inportLeft = this.left;
    let inportTop = this.top + (this.height * this.scaleY) / 2 - this.inport.height / 2;
    return [inportLeft, inportTop];
  }
  calcOutportPos() {
    let outportLeft = this.left + this.width * this.scaleX + this.outport.height;
    let outportTop = this.top + (this.height * this.scaleY) / 2 - this.outport.height / 2;
    return [outportLeft, outportTop];
  }
  out(): fabric.Object[] {
    return [this, this.inport, this.outport];
  }
}

export class Port extends fabric.Triangle {
  parentId: number;
  id: number;
  width: number;
  height: number;
  link: Link | undefined;
  constructor(block: Block, id: number) {
    super();
    this.parentId = block.id;
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

export class Inport extends Port {
  name: string;
  left: number;
  top: number;
  constructor(block: Block, id: number) {
    super(block, id);
    this.name = "inport";
    this.left = block.left;
    this.top = block.top + block.height / 2 - this.height / 2;
  }
}
export class Outport extends Port {
  name: string;
  left: number;
  top: number;
  constructor(block: Block, id: number) {
    super(block, id);
    this.name = "outport";
    this.left = block.left + block.width + this.height;
    this.top = block.top + block.height / 2 - this.height / 2;
  }
}

export class Link extends fabric.Path {
  static idCount = 0;
  id: number;
  constructor(path?: string | fabric.Point[], options?: fabric.IPathOptions) {
    super(path, options);
    this.id = Link.idCount;
    Link.idCount++;
  }
}
