import { fabric } from "fabric";
import { ComponentBase } from "./behavior";
import { Block, Inport, Outport, Link, PaletteBlock } from "./block";

// canvas上のrotate制御を無効にし，rotatePointをhiddenにする処理
const controls = fabric.Object.prototype.controls;
const rotateControls = controls.mtr;
rotateControls.visible = false;

/**
 * diagramとpaletteの初期化を行う．
 * @param diagramId diagram用canvasのid
 * @param paletteId palette用canvasのid
 * @returns [diagram, palette]
 */
export const initDiagram = (diagramId: string, paletteId: string) => {
  const shadow = new fabric.Shadow({ color: "blue", blur: 15 });

  // ***************************************************************************
  // Palette -------------------------------------------------------------------
  // ***************************************************************************
  const palette = new fabric.Canvas(paletteId, { width: 200, height: 500 });
  let selectedPaletteElement: fabric.Object | undefined = undefined;
  const paletteElementName = ["Constant", "Gain", "Integrator", "Scope"];
  // Create Palette elements
  const elements = paletteElementName.map((name, i) => {
    let posX = 50;
    let posY = 20 + i * 70;
    return new PaletteBlock(name, posX, posY);
  });
  palette.add(...elements);

  // Palette behavior ----------------------------------------------------------

  // MOUSE:DOWN
  palette.on("mouse:down", (e) => {
    // パレット内の要素を押下したとき，当該要素を記憶する処理
    // 記憶された要素はパレット上で青く光る
    if (e.target) {
      if (selectedPaletteElement) {
        selectedPaletteElement.set({ shadow: undefined });
      }
      selectedPaletteElement = e.target;
      selectedPaletteElement.set({ shadow });
    }
  });

  // ***************************************************************************
  // Diagram -------------------------------------------------------------------
  // ***************************************************************************
  const diagram = new fabric.Canvas(diagramId, { width: 500, height: 500 });
  let activePort: Inport | Outport | undefined = undefined;
  // Palette behavior ----------------------------------------------------------

  // MOUSE:DOWN
  diagram.on("mouse:down", (e) => {
    // パレットの要素が選択されているとき，
    // 押下した場所に選択されている要素に該当するブロックを生成する．
    // 処理完了後，パレットの選択を解除する．
    if (selectedPaletteElement) {
      if (e.pointer && selectedPaletteElement.name) {
        const block = new Block(selectedPaletteElement.name, e.pointer.x, e.pointer.y);
        diagram.add(...block.out());
        selectedPaletteElement.set({ shadow: undefined });
        palette.renderAll();
        selectedPaletteElement = undefined;
        return;
      }
    }

    // ポートが選択されていない場合にポートが押下されたとき，
    // 当該ポートを記憶する処理
    if (!activePort) {
      if (e.target instanceof Inport || e.target instanceof Outport) {
        activePort = e.target;
      }
      // ポートが選択されている場合の処理
    } else {
      // 押下されたポートがインポートかつ記憶したポートがアウトポートであるとき，
      // 両者間にてリンクを生成する．
      // 処理完了後，ポートの選択を解除する．
      if (e.target instanceof Inport) {
        if (activePort instanceof Outport) {
          const link = makeLink(activePort, e.target);
          diagram.add(link);
          e.target.link = activePort.link = link;
          activePort = undefined;
          // 押下されたポートと記憶したポートが両方ともインポートであるとき，
          // 記憶したポートを押下されたポートに更新する．
        } else {
          activePort = e.target;
        }
        // 押下されたポートがアウトポートかつ記憶したポートがインポートであるとき，
        // 両者間にてリンクを生成する．
        // 処理完了後，ポートの選択を解除する．
      } else if (e.target instanceof Outport) {
        if (activePort instanceof Inport) {
          const link = makeLink(e.target, activePort);
          diagram.add(link);
          e.target.link = activePort.link = link;
          activePort = undefined;
          // 押下されたポートと記憶したポートが両方ともアウトポートであるとき，
          // 記憶したポートを押下されたポートに更新する．
        } else {
          activePort = e.target;
        }
        // ポートが押下されなかった場合，ポートの選択を解除する．
      } else {
        activePort = undefined;
      }
    }
  });

  // OBJECT:SCALING
  diagram.on("object:scaling", (e) => {
    // ブロックとポートの位置を連動させる処理
    if (e.target instanceof Block) {
      [e.target.inport.left, e.target.inport.top] = e.target.calcInportPos();
      [e.target.outport.left, e.target.outport.top] = e.target.calcOutportPos();
      e.target.inport.setCoords();
      e.target.outport.setCoords();
    }
  });

  // OBJECT:MOVING
  diagram.on("object:moving", (e) => {
    // ブロックとポートの位置を連動させる処理
    if (e.target instanceof Block) {
      [e.target.inport.left, e.target.inport.top] = e.target.calcInportPos();
      [e.target.outport.left, e.target.outport.top] = e.target.calcOutportPos();
      // ポートとリンクの位置を連動させる処理
      if (
        e.target.outport.link &&
        e.target.outport.link.path &&
        Array.isArray(e.target.outport.link.path[0])
      ) {
        e.target.outport.link.dirty = true;
        e.target.outport.link.path[0][1] = e.target.outport.left - e.target.outport.height;
        e.target.outport.link.path[0][2] = e.target.outport.top + e.target.outport.width / 2;
      }
      if (
        e.target.inport.link &&
        e.target.inport.link.path &&
        Array.isArray(e.target.inport.link.path[1])
      ) {
        e.target.inport.link.dirty = true;
        e.target.inport.link.path[1][1] = e.target.inport.left;
        e.target.inport.link.path[1][2] = e.target.inport.top + e.target.inport.width / 2;
      }
      e.target.inport.setCoords();
      e.target.outport.setCoords();
    }
  });

  // MOUSE:OVER
  diagram.on("mouse:over", (e) => {
    // マウスが当たったポートを青く光らせる処理
    if (e.target instanceof Inport || e.target instanceof Outport) {
      e.target && e.target.set({ shadow });
      diagram.renderAll();
    }
  });

  // MOUSE:OUT
  diagram.on("mouse:out", (e) => {
    // マウスから離れたポートの光を消す処理
    if (e.target instanceof Inport || e.target instanceof Outport) {
      e.target && e.target.set({ shadow: undefined });
      diagram.renderAll();
    }
  });

  return [diagram, palette];
};

/**
 * ポート間のリンクを生成する．
 */
const makeLink = (from: Outport, to: Inport) => {
  const svg = `M ${from.left - from.height} ${from.top + from.width / 2} L ${to.left} ${
    to.top + to.width / 2
  }`;
  const link = new Link(svg, { fill: "", stroke: "black", selectable: false });
  ComponentBase.addLink(link.id, from.parentId, to.parentId);
  return link;
};
