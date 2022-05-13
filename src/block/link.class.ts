import { fabric } from "fabric";

export class Link extends fabric.Path {
  static idCount = 0;
  id: number;
  constructor(path?: string | fabric.Point[], options?: fabric.IPathOptions) {
    super(path, options);
    this.id = Link.idCount;
    Link.idCount++;
  }
}
