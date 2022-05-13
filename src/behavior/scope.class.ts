import { Behavior } from "./behavior.class";

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
    this.oldValue = 0;
  }
  out(steps: number) {
    if (steps === this.steps) {
      return this.oldValue;
    }
    this.steps++;
    const calc = Behavior.behaviors[this.inputLink[0]]?.out(steps);
    if (calc) {
      this.oldValue = calc;
    }
    return this.oldValue;
  }
  check() {
    if (
      Behavior.behaviors[this.inputLink[0]] instanceof Behavior // 入力ポートは接続されているか
    ) {
      return true;
    } else {
      return false;
    }
  }
  toString() {
    return "Scope";
  }
}
