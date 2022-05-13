import { Behavior } from "./behavior.class";

export class Gain extends Behavior {
  name: string;
  property: { gain: number };
  constructor(id: number, gain: number) {
    super();
    this.id = id;
    this.name = "Gain";
    this.property = { gain };
    this.addBehavior(String(id));
  }
  init() {
    this.steps = 0;
    this.oldValue = 0;
  }
  out(steps: number) {
    if (steps === this.steps) {
      return this.oldValue;
    }
    if (this.inputLink.length === 1) {
      this.steps++;
      const calc = Behavior.behaviors[this.inputLink[0]]?.out(steps);
      if (calc && !Array.isArray(calc)) {
        this.oldValue = calc * this.property.gain;
        return this.oldValue;
      } else {
        throw new Error("Error!");
      }
    } else throw new Error("Error!");
  }
  toString() {
    return String(this.property.gain);
  }
}
