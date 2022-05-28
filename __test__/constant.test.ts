import { Constant, Behavior } from "../src/behavior";

describe("Constant behavior test", () => {
  let constant: Constant;
  beforeEach(() => {
    Behavior.behaviors = {};
    Behavior.endPointBehaviors = {};
    Behavior.links = {};
    constant = new Constant(0, 1) as Constant;
    Behavior.errorMessages = [];
  });
  // Property Test -------------------------------------------------------------
  describe("Property test", () => {
    it("id should be same as set id", () => {
      constant = new Constant(0, 1) as Constant;
      expect(constant.id).toBe(0);
      constant = new Constant(1000, 1) as Constant;
      expect(constant.id).toBe(1000);
      constant = new Constant(-1000, 1) as Constant;
      expect(constant.id).toBe(-1000);
    });
    it("name should be 'Constant'", () => {
      expect(constant.name).toBe("Constant");
    });
    it("Should has no inport", () => {
      expect(constant.inportNum).toBe(0);
    });
    it("Should has only 1 outport", () => {
      expect(constant.outportNum).toBe(1);
    });
    it("initial value  of constant should be 1", () => {
      expect(constant.property.constant).toBe("1");
    });
    it("When a instance is generated, the instance added Behavior lists", () => {
      expect(Behavior.behaviors[String(constant.id)] === constant).toBe(true);
    });
    it("initial old value should be 1", () => {
      expect(constant.oldValue[0]).toBe(1);
    });
  });

  // check Test ----------------------------------------------------------------
  describe("check() test", () => {
    it("If the constant value is not numerical value, check() should return false", () => {
      constant.property.constant = "NaN";
      constant.check();
      expect(Behavior.errorMessages.length).toBe(1);
    });
  });

  // init Test -----------------------------------------------------------------
  describe("init() test", () => {
    it("steps should be 0 and old value should be property.constant", () => {
      expect(constant.steps).toBe(0);
      expect(constant.oldValue[0]).toBe(1);
      constant.out(1);
      expect(constant.steps).toBe(1);
      expect(constant.oldValue[0]).toBe(1);
      constant.init();
      expect(constant.steps).toBe(0);
      expect(constant.oldValue[0]).toBe(1);
      constant.property.constant = "1000";
      constant.init();
      expect(constant.oldValue[0]).toBe(1000);
    });
  });

  // out Test ------------------------------------------------------------------
  describe("out() test", () => {
    it("The step state after output should be incremented", () => {
      constant.out(1);
      expect(constant.steps).toBe(1);
    });
    it("The step state after 10 times output should be 10", () => {
      Array(10)
        .fill(null)
        .forEach((_, i) => constant.out(i + 1));
      expect(constant.steps).toBe(10);
    });
    it("The step state should not change if the same steps are entered", () => {
      constant.out(1);
      expect(constant.steps).toBe(1);
      constant.out(1);
      expect(constant.steps).toBe(1);
    });
  });

  // toString Test -------------------------------------------------------------
  describe("toString() test", () => {
    it("toString() should output constant value", () => {
      expect(constant.toString()).toBe("1");
      constant.property.constant = "1000";
      expect(constant.toString()).toBe("1000");
    });
  });
});
