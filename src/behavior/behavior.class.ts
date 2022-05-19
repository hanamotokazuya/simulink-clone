import _ from "lodash";
import { Links, PortOfBlock } from "../types/behavior";
import { Node } from "../block";

export abstract class Behavior {
  static behaviors: { [key in string]: Behavior } = {};
  static endTime = 10;
  static samplingTime = 0.1;
  static time = _.range(0, this.endTime + 0.0001, this.samplingTime).map(
    (v) => Math.round(v * 10 ** 5) / 10 ** 5
  );
  static endPointBehaviors: { [key in string]: Behavior } = {};
  static links: Links = {};
  static results: { [key in string]: number[][] } = {};
  id: number;
  name: string;
  inputLink: string[];
  outputLink: string[];
  inportNum: number;
  outportNum: number;
  property: { [key in string]: string };
  oldValue: number[];
  steps: number;
  constructor() {
    this.id = NaN;
    this.name = "";
    this.inputLink = [];
    this.outputLink = [];
    this.inportNum = 1;
    this.outportNum = 1;
    this.property = {};
    this.oldValue = [0];
    this.steps = 0;
  }
  static removeNode(node: Node) {
    this.removeBehavior(String(node.behavior.id));
    this.removeEndpointBehavior(String(node.behavior.id));
    const inports = node.inport;
    const outports = node.outport;
    inports.forEach((inport) => {
      inport.link && this.removeLink(inport.link.id);
    });
    outports.forEach((outport) => {
      outport.link && this.removeLink(outport.link.id);
    });
  }
  protected addBehavior(key: string) {
    Behavior.behaviors[key] = this;
  }
  protected addEndpointBehavior(key: string) {
    Behavior.endPointBehaviors[key] = this;
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
  protected static removeBehavior(key: string) {
    delete this.behaviors[key];
  }
  protected static removeEndpointBehavior(key: string) {
    delete this.endPointBehaviors[key];
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
  static init() {
    this.time = _.range(0, this.endTime + 0.0001, this.samplingTime).map(
      (v) => Math.round(v * 10 ** 5) / 10 ** 5
    );
    Object.values(this.behaviors).forEach((behavior) => behavior.init());
    // this.results = [[]];
    this.results = {};
  }
  static check() {
    return !Object.values(this.behaviors)
      .map((behavior) => behavior?.check())
      .includes(false);
  }
  private static out(steps: number): number[][] {
    return Object.values(this.endPointBehaviors).map((behavior) => behavior.out(steps));
  }
  static run() {
    const keys = Object.keys(this.endPointBehaviors); // 要検討 順序が保証されない可能性がある
    const results = this.time.map((_, i) => this.out(i + 1));
    keys.forEach((key, i) => {
      this.results[key] = results.map((result) => result[i]);
    });
    console.log(this.behaviors);
  }
  abstract init(): void;
  abstract check(): boolean;
  abstract out(steps: number): number[];
  abstract toString(): string;
}
