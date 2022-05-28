import { Behavior } from "./behavior.class";

/**
 * 積分のふるまいを司るクラス
 */
export class Integrator extends Behavior {
  name: string;
  property: { initVal: string };
  constructor(id: number, initVal: number) {
    super();
    this.id = id;
    this.name = "Integrator";
    this.property = { initVal: String(initVal) };
    this.inportNum = 1;
    this.oldValue = [initVal];
    this.addBehavior(String(id));
  }
  init() {
    this.steps = 0;
    this.oldValue = [Number(this.property.initVal)];
  }
  out(steps: number) {
    if (steps === this.steps) {
      return this.oldValue;
    }
    this.steps++;
    if (this.steps === 1) {
      return this.oldValue;
    }
    const calc = Behavior.behaviors[this.inputLink[0]]?.out(steps);
    if (typeof calc !== "undefined") {
      this.oldValue = calc.map((v, i) => this.oldValue[i] + v * Behavior.samplingTime);
    } else {
      throw new Error("Error!");
    }
    return this.oldValue;
  }
  check() {
    isNaN(Number(this.property.initVal)) && // initValは数値であるか
      Behavior.errorMessages.push(`${this.name}${this.id}のパラメータは不正な値です。`);
    !(Behavior.behaviors[this.inputLink[0]] instanceof Behavior) && // 入力ポートは接続されているか
      Behavior.errorMessages.push(`${this.name}${this.id}の入力ポートは接続されていません。`);
  }
  toString() {
    return "Integrator";
  }
}
