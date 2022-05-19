import { fabric } from "fabric";
import { Behavior, Scope } from "../behavior";
import { Node, Inport, Outport, PaletteNode, makeLink } from "../block";
import { Action } from "../types/context";

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
export const initDiagram = (
  diagramId: string,
  paletteId: string,
  action: React.Dispatch<Action>
) => {
  const shadow = new fabric.Shadow({ color: "blue", blur: 15 });

  // ***************************************************************************
  // Palette -------------------------------------------------------------------
  // ***************************************************************************
  const palette = new fabric.Canvas(paletteId, { width: 200, height: 700 });
  let selectedPaletteElement: fabric.Object | undefined = undefined;
  const paletteElementName = ["Constant", "Gain", "Integrator", "Scope", "Arithmetic"];
  // Create Palette elements
  const elements = paletteElementName.map((name, i) => {
    let posX = 50;
    let posY = 20 + i * 70;
    return new PaletteNode(name, posX, posY);
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
  const diagram = new fabric.Canvas(diagramId, { width: 1500, height: 700 });
  // Block群とdiagramを紐づけるための初期化処理
  Node.init(diagram);
  let activeObj: fabric.Object | null = null;
  // diagram behavior ----------------------------------------------------------

  // MOUSE:DOWN
  diagram.on("mouse:down", (e) => {
    // ノードが選択されている状態でCtrl+clickされたとき，
    // 当該ノードとノードに紐づくポートとリンクを削除する．
    if (e.e.ctrlKey) {
      if (activeObj instanceof Node) {
        const inports = activeObj.inport;
        const outports = activeObj.outport;
        inports.forEach((inport) => {
          inport.link && diagram.remove(inport.link);
          diagram.remove(inport);
        });
        outports.forEach((outport) => {
          outport.link && diagram.remove(outport.link);
          diagram.remove(outport);
        });
        diagram.remove(activeObj);
        Behavior.removeNode(activeObj);
        activeObj = null;
        return;
      }
      // ポートが選択されている状態でCtrl+clickされたとき，
      // 当該ポートに紐づくリンクを削除する．
      if (activeObj instanceof Inport || activeObj instanceof Outport) {
        if (activeObj.link) {
          diagram.remove(activeObj.link);
          Behavior.removeLink(activeObj.link.id);
          activeObj = null;
          return;
        }
      }
    }
    // パレットの要素が選択されているとき，
    // 押下した場所に選択されている要素に該当するブロックを生成する．
    // 処理完了後，パレットの選択を解除する．
    console.log(e.target);
    if (selectedPaletteElement) {
      if (e.pointer && selectedPaletteElement.name) {
        const node = new Node(selectedPaletteElement.name, e.pointer.x, e.pointer.y);
        diagram.add(...node.out());
        selectedPaletteElement.set({ shadow: undefined });
        palette.renderAll();
        selectedPaletteElement = undefined;
        return;
      }
    }

    // オブジェクトが選択されていない場合にオブジェクトが押下されたとき，
    // 当該オブジェクトを記憶する処理
    if (!activeObj) {
      if (e.target) {
        activeObj = e.target;
      }
      // オブジェクトが選択されている場合の処理
    } else {
      // 押下されたオブジェクトがインポートかつ記憶したオブジェクトがアウトポートであるとき，
      // 両者間にてリンクを生成する．
      // 処理完了後，オブジェクトの選択を解除する．
      if (e.target instanceof Inport) {
        if (activeObj instanceof Outport) {
          const link = makeLink(activeObj, e.target);
          diagram.add(link);
          link.sendToBack();
          activeObj = null;
          // 押下されたオブジェクトと記憶したオブジェクトが両方ともインポートであるとき，
          // 記憶したポートを押下されたポートに更新する．
        } else {
          activeObj = e.target;
        }
        // 押下されたオブジェクトがアウトポートかつ記憶したオブジェクトがインポートであるとき，
        // 両者間にてリンクを生成する．
        // 処理完了後，オブジェクトの選択を解除する．
      } else if (e.target instanceof Outport) {
        if (activeObj instanceof Inport) {
          const link = makeLink(e.target, activeObj);
          diagram.add(link);
          link.sendToBack();
          activeObj = null;
          // 押下されたオブジェクトと記憶したオブジェクトが両方ともアウトポートであるとき，
          // 記憶したポートを押下されたポートに更新する．
        } else {
          activeObj = e.target;
        }
        // そのほかの条件下では，選択オブジェクトを更新する．
      } else {
        if (e.target !== undefined) {
          activeObj = e.target;
        }
      }
    }
  });

  // OBJECT:SCALING
  diagram.on("object:scaling", (e) => {
    // ブロックとポート・リンクの位置を連動させる処理
    if (e.target instanceof Node) e.target.updateSurrroundingPos();
  });

  // OBJECT:MOVING
  diagram.on("object:moving", (e) => {
    // ブロックとポート・リンクの位置を連動させる処理
    if (e.target instanceof Node) e.target.updateSurrroundingPos();
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

  // MOUSE:DOUBLECLICK
  diagram.on("mouse:dblclick", (e) => {
    console.log("DBLCLICK");
    if (e.target instanceof Node) {
      action({ type: "OPEN_DIALOG", behavior: e.target.behavior });
      if (e.target.behavior instanceof Scope) {
        action({ type: "OPEN_SCOPE", scope: e.target.behavior });
      }
    }
  });

  // MOUSE:WHEEL
  diagram.on("mouse:wheel", (e) => {
    e.e.preventDefault();
    const ctrlFlag = e.e.ctrlKey;
    if (ctrlFlag && e.pointer) {
      const mouseX = e.pointer.x;
      const mouseY = e.pointer.y;
      const deltaY = e.e.deltaY;
      let zoom = diagram.getZoom();
      diagram.zoomToPoint(new fabric.Point(mouseX, mouseY), zoom + deltaY / 2400);
    }
  });

  return [diagram, palette];
};
