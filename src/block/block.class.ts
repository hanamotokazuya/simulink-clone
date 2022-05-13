import { fabric } from "fabric";

export class Block extends fabric.Group {
  width: number;
  height: number;
  scaleX: number;
  scaleY: number;
  groupedObj: [fabric.Rect, fabric.Text];
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
    this.groupedObj = this._objects as [fabric.Rect, fabric.Text];
  }
}
