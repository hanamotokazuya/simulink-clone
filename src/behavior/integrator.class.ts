import { Behavior } from "./behavior.class";

export class Integrator extends Behavior {
  name: string;
  property: { initVal: number };
  constructor(id: number, initVal: number) {
    super();
    this.id = id;
    this.name = "Integrator";
    this.property = { initVal };
    this.inportNum = 1;
    this.oldValue = initVal;
    this.addBehavior(String(id));
  }
  init() {
    this.steps = 0;
    this.oldValue = this.property.initVal;
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
    if (calc && !Array.isArray(calc) && !Array.isArray(this.oldValue)) {
      // 要検討
      this.oldValue += calc * Behavior.samplingTime;
    } else {
      throw new Error("Error!");
    }
    return this.oldValue;
  }
  toString() {
    return "Integrator";
  }
}
