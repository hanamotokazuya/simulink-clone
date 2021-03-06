import { Behavior } from "./behavior.class";

/**
 * 描画のふるまいを司るクラス
 */
export class Scope extends Behavior {
  name: string;
  property: {};
  constructor(id: number) {
    super();
    this.id = id;
    this.name = "Scope";
    this.property = {};
    this.inportNum = 1;
    this.outportNum = 0;
    this.addBehavior(String(id));
    this.addEndpointBehavior(String(id));
  }
  init() {
    this.steps = 0;
    this.oldValue = [0];
  }
  out(steps: number) {
    if (steps === this.steps) {
      return this.oldValue;
    }
    this.steps++;
    const calc = Behavior.behaviors[this.inputLink[0]]?.out(steps);
    if (typeof calc !== "undefined") {
      this.oldValue = calc;
    }
    return this.oldValue;
  }
  check() {
    !(Behavior.behaviors[this.inputLink[0]] instanceof Behavior) && // 入力ポートは接続されているか
      Behavior.errorMessages.push(`${this.name}${this.id}の入力ポートは接続されていません。`);
  }
  toString() {
    return "Scope";
  }
}
