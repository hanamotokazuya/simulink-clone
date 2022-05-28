import { Block } from "./index";

export class PaletteNode extends Block {
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
