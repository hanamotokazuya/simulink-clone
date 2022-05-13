import _ from "lodash";
import { Links, PortOfBlock } from "../types/behavior";

export abstract class Behavior {
  static behaviors: { [key in string]?: Behavior } = {};
  static endTime = 10;
  static samplingTime = 0.1;
  static time = _.range(0, this.endTime + 0.0001, this.samplingTime);
  static endPointBehaviors: { [key in string]?: Behavior } = {};
  static links: Links = {};
  static results: (number | number[] | undefined)[][] = [[]];
  id: number;
  name: string;
  inputLink: string[];
  outputLink: string[];
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
  protected addBehavior(key: string) {
    Behavior.behaviors[key] = this;
  }
  protected removeBehavior(key: string) {
    delete Behavior.behaviors[key];
  }
  protected addEndpointBehavior(key: string) {
    Behavior.endPointBehaviors[key] = this;
  }
  protected removeEndpointBehavior(key: string) {
    delete Behavior.endPointBehaviors[key];
  }
  static addLink(key: string, from: PortOfBlock, to: PortOfBlock) {
    this.links[key] = { from, to };
    const [toBlockId, toPortId] = Object.entries(to)[0];
    const fromBlockId = Object.keys(from)[0];
    const behavior = this.behaviors[toBlockId];
    if (behavior) {
      behavior.inputLink[toPortId] = fromBlockId;
    }
  }
  static removeLink(key: number) {
    const to = this.links[key]?.to;
    delete this.links[key];
    if (to !== undefined) {
      const [blockId, toPortId] = Object.entries(to)[0];
      const behavior = this.behaviors[blockId];
      if (behavior) {
        behavior.inputLink[toPortId] = "";
      }
    }
  }
  private static init() {
    this.time = _.range(0, this.endTime + 0.0001, this.samplingTime);
    Object.values(this.behaviors).forEach((behavior) => behavior?.init());
    this.results = [[]];
  }
  private static out(steps: number) {
    return Object.values(this.endPointBehaviors).map((behavior) => behavior?.out(steps));
  }
  static run() {
    this.init();
    this.results = this.time.map((_, i) => this.out(i + 1));
    console.log(this.behaviors);
  }
  abstract init(): void;
  abstract check(): boolean;
  abstract out(steps: number): number | number[];
  abstract toString(): string;
  abstract toString(): string;
}
