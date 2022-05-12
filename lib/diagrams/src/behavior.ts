import _ from "lodash";

export abstract class ComponentBase {
  static components: { [key in number]?: ComponentBase } = {};
  static endTime = 10;
  static samplingTime = 0.1;
  static time = _.range(0, this.endTime + 0.0001, this.samplingTime);
  static endPointComponents: { [key in number]?: ComponentBase } = {};
  static links: { [key in number]?: { from: number; to: number } } = {};
  static results: (number | number[] | undefined)[][] = [[]];
  id: number;
  name: string;
  inputLink: number[];
  outputLink: number[];
  inportNum: number;
  outportNum: number;
  property: { [key in string]: number };
  oldValue: number | number[];
  steps: number;
  constructor() {
    this.id = NaN;
    this.name = "";
    this.inputLink = [];
    this.outputLink = [];
    this.inportNum = 1;
    this.outportNum = 1;
    this.property = {};
    this.oldValue = 0;
    this.steps = 0;
  }
  protected addComponent(key: number) {
    ComponentBase.components[key] = this;
  }
  protected removeComponent(key: number) {
    delete ComponentBase.components[key];
  }
  protected addEndpointComponent(key: number) {
    ComponentBase.endPointComponents[key] = this;
  }
  protected removeEndpointComponent(key: number) {
    delete ComponentBase.endPointComponents[key];
  }
  static addLink(key: number, from: number, to: number) {
    this.links[key] = { from, to };
    this.components[to]?.inputLink.push(from);
  }
  static removeLink(key: number) {
    const from = this.links[key]?.from;
    const to = this.links[key]?.to;
    delete this.links[key];
    if (to !== undefined) {
      this.components[to]?.inputLink.filter((v) => v !== from);
    }
  }
  private static init() {
    this.time = _.range(0, this.endTime + 0.0001, this.samplingTime);
    Object.values(this.components).forEach((component) => component?.init());
    this.results = [[]];
  }
  private static out(steps: number) {
    return Object.values(this.endPointComponents).map((component) => component?.out(steps));
  }
  static run() {
    this.init();
    this.results = this.time.map((_, i) => this.out(i + 1));
  }
  abstract init(): void;
  abstract out(steps: number): number | number[];
}

export class Gain extends ComponentBase {
  name: string;
  property: { gain: number };
  constructor(id: number, gain: number) {
    super();
    this.id = id;
    this.name = "Gain";
    this.property = { gain };
    this.addComponent(id);
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
      const calc = ComponentBase.components[this.inputLink[0]]?.out(steps);
      if (calc && !Array.isArray(calc)) {
        this.oldValue = calc * this.property.gain;
        return this.oldValue;
      } else {
        throw new Error("Error!");
      }
    } else throw new Error("Error!");
  }
}

export class Constant extends ComponentBase {
  name: string;
  property: { constant: number };
  constructor(id: number, constant: number) {
    super();
    this.id = id;
    this.name = "Constant";
    this.property = { constant };
    this.inportNum = 0;
    this.addComponent(id);
    this.oldValue = this.property.constant;
  }
  init() {
    this.steps = 0;
    this.oldValue = this.property.constant;
  }
  out(steps: number) {
    this.steps++;
    return this.oldValue;
  }
}
export class Integrator extends ComponentBase {
  name: string;
  property: { initVal: number };
  constructor(id: number, initVal: number) {
    super();
    this.id = id;
    this.name = "Integrator";
    this.property = { initVal };
    this.inportNum = 1;
    this.oldValue = initVal;
    this.addComponent(id);
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
    const calc = ComponentBase.components[this.inputLink[0]]?.out(steps);
    if (calc && !Array.isArray(calc) && !Array.isArray(this.oldValue)) {
      // 要検討
      this.oldValue += calc * ComponentBase.samplingTime;
    } else {
      throw new Error("Error!");
    }
    return this.oldValue;
  }
}

export class Scope extends ComponentBase {
  name: string;
  property: {};
  constructor(id: number) {
    super();
    this.id = id;
    this.name = "Scope" + String(this.id);
    this.property = {};
    this.inportNum = 1;
    this.addComponent(id);
    this.addEndpointComponent(id);
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
    const calc = ComponentBase.components[this.inputLink[0]]?.out(steps);
    if (calc) {
      this.oldValue = calc;
    }
    return this.oldValue;
  }
}

export const setComponent = (id: number, name: string): ComponentBase => {
  console.log(`id: ${id}, name: ${name}`);
  switch (name) {
    case "Gain":
      return new Gain(id, 1);
    case "Constant":
      return new Constant(id, 1);
    case "Integrator":
      return new Integrator(id, 0);
    case "Scope":
      return new Scope(id);
    default:
      throw new Error("Error!");
  }
};
