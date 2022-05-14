import { Gain, Behavior, Constant } from "../src/behavior";

describe("Gain behavior test", () => {
  let gain: Gain;
  beforeEach(() => {
    Behavior.behaviors = {};
    Behavior.endPointBehaviors = {};
    Behavior.links = {};
    gain = new Gain(0, 1);
  });
  // Property Test -------------------------------------------------------------
  describe("Property test", () => {
    it("id should be same as set id", () => {
      gain = new Gain(0, 1);
      expect(gain.id).toBe(0);
      gain = new Gain(1000, 1);
      expect(gain.id).toBe(1000);
      gain = new Gain(-1000, 1);
      expect(gain.id).toBe(-1000);
    });
    it("name should be 'Gain'", () => {
      expect(gain.name).toBe("Gain");
    });
    it("Should has only 1 inport", () => {
      expect(gain.inportNum).toBe(1);
    });
    it("Should has only 1 outport", () => {
      expect(gain.outportNum).toBe(1);
    });
    it("initial value  of gain should be 1", () => {
      expect(gain.property.gain).toBe("1");
    });
    it("When a instance is generated, the instance added Behavior lists", () => {
      expect(Behavior.behaviors[String(gain.id)] === gain).toBe(true);
    });
    it("initial old value should be 0", () => {
      expect(gain.oldValue[0]).toBe(0);
    });
  });

  // check Test ----------------------------------------------------------------
  describe("check() test", () => {
    it("If the constant value is not numerical value, check() should return false", () => {
      const constant = new Constant(1, 1);
      const from = { [String(constant.id)]: 0 };
      const to = { [String(gain.id)]: 0 };
      Behavior.addLink("0", from, to);
      gain.property.gain = "NaN";
      expect(gain.check()).toBe(false);
    });
    it("If the inport is no connected, check() should return false", () => {
      expect(gain.check()).toBe(false);
      const constant = new Constant(1, 1);
      const from = { [String(constant.id)]: 0 };
      const to = { [String(gain.id)]: 0 };
      Behavior.addLink("0", from, to);
      expect(gain.check()).toBe(true);
    });
  });

  // init Test -----------------------------------------------------------------
  describe("init() test", () => {
    beforeEach(() => {
      const constant = new Constant(1, 1);
      const from = { [String(constant.id)]: 0 };
      const to = { [String(gain.id)]: 0 };
      Behavior.addLink("0", from, to);
    });
    it("steps should be 0 and old value should be 0", () => {
      expect(gain.steps).toBe(0);
      expect(gain.oldValue[0]).toBe(0);
      gain.out(1);
      expect(gain.steps).toBe(1);
      expect(gain.oldValue[0]).toBe(1);
      gain.init();
      expect(gain.steps).toBe(0);
      expect(gain.oldValue[0]).toBe(0);
    });
  });

  // out Test ------------------------------------------------------------------
  describe("out() test", () => {
    let constant: Constant;
    beforeEach(() => {
      constant = new Constant(1, 1);
      const from = { [String(constant.id)]: 0 };
      const to = { [String(gain.id)]: 0 };
      Behavior.addLink("0", from, to);
    });
    it("The step state after output should be incremented", () => {
      gain.out(1);
      expect(gain.steps).toBe(1);
    });
    it("The step state after 10 times output should be 10", () => {
      Array(10)
        .fill(null)
        .forEach((_, i) => gain.out(i + 1));
      expect(gain.steps).toBe(10);
    });
    it("The step state should not change if the same steps are entered", () => {
      gain.out(1);
      expect(gain.steps).toBe(1);
      gain.out(1);
      expect(gain.steps).toBe(1);
    });
    it("10 * 5 = 50", () => {
      constant.property.constant = "10";
      constant.init();
      gain.property.gain = "5";
      gain.init();
      gain.out(1);
      expect(gain.out(1)[0]).toBe(50);
    });
    it("1 * 0 = 0", () => {
      gain.property.gain = "0";
      gain.init();
      gain.out(1);
      expect(gain.out(1)[0]).toBe(0);
    });
    it("1 * (-1) = -1", () => {
      gain.property.gain = "-1";
      gain.init();
      gain.out(1);
      expect(gain.out(1)[0]).toBe(-1);
    });
  });

  // toString Test -------------------------------------------------------------
  describe("toString() test", () => {
    it("toString() should output gain value", () => {
      expect(gain.toString()).toBe("1");
      gain.property.gain = "1000";
      expect(gain.toString()).toBe("1000");
    });
  });
});
