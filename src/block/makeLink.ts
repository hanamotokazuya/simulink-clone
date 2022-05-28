import { Outport, Inport, Link } from "./index";
import { Behavior } from "../behavior";

/**
 * ポート間のリンクを生成する．
 */
export const makeLink = (outport: Outport, inport: Inport) => {
  const svg = calcSvg(outport, inport);
  const link = new Link(svg, { fill: "", strokeWidth: 2, stroke: "black", selectable: false });
  const key = String(link.id);
  const from = { [String(outport.parent.id)]: outport.id };
  const to = { [String(inport.parent.id)]: inport.id };
  inport.links.push(link);
  outport.links.push(link);
  Behavior.addLink(key, from, to);
  return link;
};

const calcSvg = (outport: Outport, inport: Inport): string => {
  const startPointX = outport.left - outport.height;
  const startPointY = outport.top + outport.width / 2;
  const endPointX = inport.left;
  const endPointY = inport.top + inport.width / 2;
  const diffStartToEndX = endPointX - startPointX;
  const diffStartToEndY = endPointY - startPointY;
  const minDiffX = 60;
  const outportNodeBottom = outport.parent.top + outport.parent.height;
  const outportNodeTop = outport.parent.top;
  const inportNodeBottom = inport.parent.top + inport.parent.height;
  const inportNodeTop = inport.parent.top;
  let innerDiffY: number;
  if (outportNodeTop > inportNodeTop) {
    innerDiffY = outportNodeTop - inportNodeBottom;
  } else {
    innerDiffY = inportNodeTop - outportNodeBottom;
  }
  const maxBottom = Math.max(outportNodeBottom, inportNodeBottom);
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
      pointY2 = pointY1 + diffStartToEndY / 2;
      pointX3 = pointX2 + diffStartToEndX - minDiffX;
      pointY3 = pointY2;
      pointX4 = pointX3;
      pointY4 = pointY3 + diffStartToEndY / 2;
    }
  } else {
    pointX1 = startPointX + diffStartToEndX / 2;
    pointY1 = startPointY;
    pointX2 = pointX1;
    pointY2 = pointY1 + diffStartToEndY / 2;
    pointX3 = pointX2;
    pointY3 = pointY2;
    pointX4 = pointX3;
    pointY4 = pointY3 + diffStartToEndY / 2;
  }
  let svg = `M ${startPointX} ${startPointY}
              L ${pointX1} ${pointY1}
              L ${pointX2} ${pointY2}
              L ${pointX3} ${pointY3}
              L ${pointX4} ${pointY4}
              L ${endPointX} ${endPointY}`;

  console.log(svg);
  return svg;
};
