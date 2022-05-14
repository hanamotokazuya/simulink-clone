import { Behavior } from "./behavior.class";

export class Gain extends Behavior {
  name: string;
  property: { gain: string };
  constructor(id: number, gain: number) {
    super();
    this.id = id;
    this.name = "Gain";
    this.property = { gain: String(gain) };
    this.addBehavior(String(id));
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
      this.oldValue = calc.map((v) => v * Number(this.property.gain));
      return this.oldValue;
    } else {
      throw new Error("Error!");
    }
  }
  check() {
    if (
      !isNaN(Number(this.property.gain)) && // gainは数値であるか
      Behavior.behaviors[this.inputLink[0]] instanceof Behavior // 入力ポートは接続されているか
    ) {
      return true;
    } else {
      return false;
    }
  }
  toString() {
    return String(this.property.gain);
  }
}
