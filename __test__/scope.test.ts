import { Scope, Behavior, Constant } from "../src/behavior";

describe("Gain behavior test", () => {
  let scope: Scope;
  beforeEach(() => {
    Behavior.behaviors = {};
    Behavior.endPointBehaviors = {};
    Behavior.links = {};
    scope = new Scope(0);
    Behavior.errorMessages = [];
  });
  // Property Test -------------------------------------------------------------
  describe("Property test", () => {
    it("id should be same as set id", () => {
      scope = new Scope(0);
      expect(scope.id).toBe(0);
      scope = new Scope(1000);
      expect(scope.id).toBe(1000);
      scope = new Scope(-1000);
      expect(scope.id).toBe(-1000);
    });
    it("name should be 'Scope'", () => {
      expect(scope.name).toBe("Scope");
    });
    it("Should has only 1 inport", () => {
      expect(scope.inportNum).toBe(1);
    });
    it("Should has no outport", () => {
      expect(scope.outportNum).toBe(0);
    });
    it("Scope has no property", () => {
      expect(Object.keys(scope.property).length).toBe(0);
    });
    it("When a instance is generated, the instance added Behavior lists", () => {
      expect(Behavior.behaviors[String(scope.id)] === scope).toBe(true);
    });
    it("initial old value should be 0", () => {
      expect(scope.oldValue[0]).toBe(0);
    });
  });

  // check Test ----------------------------------------------------------------
  describe("check() test", () => {
    it("If the inport is no connected, check() should return false", () => {
      scope.check();
      expect(Behavior.errorMessages.length).toBe(1);
      const constant = new Constant(1, 1);
      const from = { [String(constant.id)]: 0 };
      const to = { [String(scope.id)]: 0 };
      Behavior.addLink("0", from, to);
      Behavior.init();
      scope.check();
      expect(Behavior.errorMessages.length).toBe(0);
    });
  });

  // init Test -----------------------------------------------------------------
  describe("init() test", () => {
    beforeEach(() => {
      const constant = new Constant(1, 1);
      const from = { [String(constant.id)]: 0 };
      const to = { [String(scope.id)]: 0 };
      Behavior.addLink("0", from, to);
    });
    it("steps should be 0 and old value should be 0", () => {
      expect(scope.steps).toBe(0);
      expect(scope.oldValue[0]).toBe(0);
      scope.out(1);
      expect(scope.steps).toBe(1);
      expect(scope.oldValue[0]).toBe(1);
      scope.init();
      expect(scope.steps).toBe(0);
      expect(scope.oldValue[0]).toBe(0);
    });
  });

  // out Test ------------------------------------------------------------------
  describe("out() test", () => {
    let constant: Constant;
    beforeEach(() => {
      constant = new Constant(1, 1);
      const from = { [String(constant.id)]: 0 };
      const to = { [String(scope.id)]: 0 };
      Behavior.addLink("0", from, to);
    });
    it("The step state after output should be incremented", () => {
      scope.out(1);
      expect(scope.steps).toBe(1);
    });
    it("The step state after 10 times output should be 10", () => {
      Array(10)
        .fill(null)
        .forEach((_, i) => scope.out(i + 1));
      expect(scope.steps).toBe(10);
    });
    it("The step state should not change if the same steps are entered", () => {
      scope.out(1);
      expect(scope.steps).toBe(1);
      scope.out(1);
      expect(scope.steps).toBe(1);
    });
  });

  // toString Test -------------------------------------------------------------
  describe("toString() test", () => {
    it("toString() should output 'Scope'", () => {
      expect(scope.toString()).toBe("Scope");
    });
  });
});
