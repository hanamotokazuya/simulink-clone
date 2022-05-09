import _ from "lodash";

export abstract class ComponentBase {
  static components: ComponentBase[] = [];
  static endTime = 10;
  static samplingTime = 0.001;
  static time = _.range(0, this.endTime + 0.0001, this.samplingTime);
  static endPointComponents: ComponentBase[] = [];
  static results: (number | number[])[][] = [[]];
  id: number;
  name: string;
  x: number;
  y: number;
  inputLink: number[];
  outputLink: number[];
  inportNum: number;
  outportNum: number;
  property: { [key in string]: number };
  oldValue: number | number[];
  steps: number;
  constructor() {
    this.id = ComponentBase.components.length;
    this.name = "";
    this.x = 0;
    this.y = 0;
    this.inputLink = [];
    this.outputLink = [];
    this.inportNum = 1;
    this.outportNum = 1;
    this.property = {};
    this.oldValue = 0;
    this.steps = 0;
  }
  protected addComponent() {
    ComponentBase.components.push(this);
  }
  protected addEndpointComponent() {
    ComponentBase.endPointComponents.push(this);
  }
  protected removeEndpointComponent() {
    ComponentBase.endPointComponents.filter((component) => component !== this);
  }
  connect(component: ComponentBase) {
    this.inputLink.push(component.id);
  }
  disconnect(component: ComponentBase) {
    this.inputLink = this.inputLink.filter((v) => v !== component.id);
  }
  private static init() {
    this.time = _.range(0, this.endTime + 0.0001, this.samplingTime);
    this.components.map((component) => {
      component.init();
    });
    this.results = [[]];
  }
  private static out(steps: number) {
    return this.endPointComponents.map((component) => component.out(steps));
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
  x: number;
  y: number;
  property: { gain: number };
  constructor(x: number, y: number, gain: number) {
    super();
    this.x = x;
    this.y = y;
    this.name = "Gain";
    this.property = { gain };
    this.addComponent();
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
      const calc = ComponentBase.components[this.inputLink[0]].out(steps);
      if (!Array.isArray(calc)) {
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
  x: number;
  y: number;
  property: { constant: number };
  constructor(x: number, y: number, constant: number) {
    super();
    this.x = x;
    this.y = y;
    this.name = "Constant";
    this.property = { constant };
    this.inportNum = 0;
    this.addComponent();
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
  x: number;
  y: number;
  property: { initVal: number };
  constructor(x: number, y: number, initVal: number) {
    super();
    this.x = x;
    this.y = y;
    this.name = "Integrator";
    this.property = { initVal };
    this.inportNum = 1;
    this.oldValue = initVal;
    this.addComponent();
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
    const calc = ComponentBase.components[this.inputLink[0]].out(steps);
    if (!Array.isArray(calc) && !Array.isArray(this.oldValue)) {
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
  x: number;
  y: number;
  property: {};
  constructor(x: number, y: number) {
    super();
    this.x = x;
    this.y = y;
    this.name = "Scope" + String(this.id);
    this.property = {};
    this.inportNum = 1;
    this.addComponent();
    this.addEndpointComponent();
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
    this.oldValue = ComponentBase.components[this.inputLink[0]].out(steps);
    return this.oldValue;
  }
}

export const setComponent = (name: string, x: number, y: number) => {
  switch (name) {
    case "Gain":
      new Gain(x, y, 1);
      break;
    case "Constant":
      new Constant(x, y, 1);
      break;
    case "Integrator":
      new Integrator(x, y, 0);
      break;
    case "Scope":
      new Scope(x, y);
      break;
    default:
      return;
  }
};
