import { Behavior } from "./behavior.class";

export class Scope extends Behavior {
  name: string;
  property: {};
  constructor(id: number) {
    super();
    this.id = id;
    this.name = "Scope" + String(this.id);
    this.property = {};
    this.inportNum = 1;
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
  toString() {
    return "Scope";
  }
}
