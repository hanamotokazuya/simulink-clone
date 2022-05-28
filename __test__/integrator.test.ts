import { Integrator, Behavior, Constant, Scope } from "../src/behavior";
import { PortOfBlock } from "../src/types/behavior";

describe("Integrator behavior test", () => {
  let integrator: Integrator;
  beforeEach(() => {
    Behavior.behaviors = {};
    Behavior.endPointBehaviors = {};
    Behavior.links = {};
    integrator = new Integrator(0, 0);
    Behavior.errorMessages = [];
  });
  // Property Test -------------------------------------------------------------
  describe("Property test", () => {
    it("id should be same as set id", () => {
      integrator = new Integrator(0, 0);
      expect(integrator.id).toBe(0);
      integrator = new Integrator(1000, 0);
      expect(integrator.id).toBe(1000);
      integrator = new Integrator(-1000, 0);
      expect(integrator.id).toBe(-1000);
    });
    it("name should be 'Integrator'", () => {
      expect(integrator.name).toBe("Integrator");
    });
    it("Should has only 1 inport", () => {
      expect(integrator.inportNum).toBe(1);
    });
    it("Should has only 1 outport", () => {
      expect(integrator.outportNum).toBe(1);
    });
    it("initial value  of initVal should be 0", () => {
      expect(integrator.property.initVal).toBe("0");
    });
    it("When a instance is generated, the instance added Behavior lists", () => {
      expect(Behavior.behaviors[String(integrator.id)] === integrator).toBe(true);
    });
    it("initial old value should be 0", () => {
      expect(integrator.oldValue[0]).toBe(0);
    });
  });

  // check Test ----------------------------------------------------------------
  describe("check() test", () => {
    it("If the constant value is not numerical value, check() should return false", () => {
      const constant = new Constant(1, 1);
      const from = { [String(constant.id)]: 0 };
      const to = { [String(integrator.id)]: 0 };
      Behavior.addLink("0", from, to);
      integrator.property.initVal = "NaN";
      integrator.check();
      expect(Behavior.errorMessages.length).toBe(1);
    });
    it("If the inport is no connected, check() should return false", () => {
      integrator.check();
      expect(Behavior.errorMessages.length).toBe(1);
      const constant = new Constant(1, 1);
      const from = { [String(constant.id)]: 0 };
      const to = { [String(integrator.id)]: 0 };
      Behavior.addLink("0", from, to);
      Behavior.init();
      integrator.check();
      expect(Behavior.errorMessages.length).toBe(0);
    });
  });

  // init Test -----------------------------------------------------------------
  describe("init() test", () => {
    beforeEach(() => {
      const constant = new Constant(1, 1);
      const from = { [String(constant.id)]: 0 };
      const to = { [String(integrator.id)]: 0 };
      Behavior.addLink("0", from, to);
    });
    it("steps should be 0 and old value should be 0", () => {
      expect(integrator.steps).toBe(0);
      expect(integrator.oldValue[0]).toBe(0);
      integrator.out(1);
      expect(integrator.steps).toBe(1);
      expect(integrator.oldValue[0]).toBe(0);
      integrator.out(2);
      expect(integrator.steps).toBe(2);
      expect(integrator.oldValue[0]).toBe(0.1);
      integrator.init();
      expect(integrator.steps).toBe(0);
      expect(integrator.oldValue[0]).toBe(0);
    });
  });

  // out Test ------------------------------------------------------------------
  describe("out() test", () => {
    let constant: Constant;
    let from: PortOfBlock;
    let to: PortOfBlock;
    beforeEach(() => {
      constant = new Constant(1, 1);
      let from = { [String(constant.id)]: 0 };
      let to = { [String(integrator.id)]: 0 };
      Behavior.addLink("0", from, to);
    });
    it("The step state after output should be incremented", () => {
      integrator.out(1);
      expect(integrator.steps).toBe(1);
    });
    it("The step state after 10 times output should be 10", () => {
      Array(10)
        .fill(null)
        .forEach((_, i) => integrator.out(i + 1));
      expect(integrator.steps).toBe(10);
    });
    it("The step state should not change if the same steps are entered", () => {
      integrator.out(1);
      expect(integrator.steps).toBe(1);
      integrator.out(1);
      expect(integrator.steps).toBe(1);
    });
    it("When endTime=10, samplingTime=0.1 and input=1, result should be 10", () => {
      const scope = new Scope(2);
      from = { [String(integrator.id)]: 0 };
      to = { [String(scope.id)]: 0 };
      Behavior.addLink("1", from, to);
      Behavior.run();
      let result;
      result = Math.round(scope.oldValue[0] * 10 ** 10) / 10 ** 10;
      expect(result).toBe(10);
    });
    it("When endTime=10, samplingTime=0.1 and input=1, double integrated result should be 50", () => {
      const integrator2 = new Integrator(2, 0);
      from = { [String(integrator.id)]: 0 };
      to = { [String(integrator2.id)]: 0 };
      Behavior.addLink("1", from, to);
      const scope = new Scope(3);
      from = { [String(integrator2.id)]: 0 };
      to = { [String(scope.id)]: 0 };
      Behavior.addLink("2", from, to);
      Behavior.run();
      let result;
      result = Math.round(scope.oldValue[0] * 10 ** 10) / 10 ** 10;
      expect(result).toBe(49.5);
    });
  });

  // toString Test -------------------------------------------------------------
  describe("toString() test", () => {
    it("toString() should output 'Integrator'", () => {
      expect(integrator.toString()).toBe("Integrator");
    });
  });
});
