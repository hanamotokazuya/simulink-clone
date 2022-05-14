import { Behavior } from "./behavior.class";

const operator = ["+", "-", "*", "/"] as const;
type Operator = typeof operator[number];
const isOperator = (name: string): name is Operator => {
  return operator.some((value) => value === name);
};
export class Arithmetic extends Behavior {
  name: string;
  property: { operator: Operator };
  constructor(id: number) {
    super();
    this.id = id;
    this.name = "Sum";
    this.inportNum = 2;
    this.property = { operator: "+" };
    this.addBehavior(String(id));
  }
  init() {
    this.steps = 0;
    this.oldValue = [0];
  }
  out(steps: number) {
    if (steps === this.steps) {
      return this.oldValue;
    }
    this.steps++;
    const calc1 = Behavior.behaviors[this.inputLink[0]]?.out(steps);
    const calc2 = Behavior.behaviors[this.inputLink[1]]?.out(steps);
    if (typeof calc1 !== "undefined" && typeof calc2 !== "undefined") {
      switch (this.property.operator) {
        case "+":
          this.oldValue = calc1.map((v, i) => v + calc2[i]);
          return this.oldValue;
        case "-":
          this.oldValue = calc1.map((v, i) => v - calc2[i]);
          return this.oldValue;
        case "*":
          this.oldValue = calc1.map((v, i) => v * calc2[i]);
          return this.oldValue;
        case "/":
          // TODO 零割の例外処理を追加すること
          this.oldValue = calc1.map((v, i) => v / calc2[i]);
          return this.oldValue;
        default:
          throw new Error("Error!");
      }
    } else {
      throw new Error("Error!");
    }
  }
  check() {
    if (
      Behavior.behaviors[this.inputLink[0]] instanceof Behavior && // 入力ポート1は接続されているか
      Behavior.behaviors[this.inputLink[1]] instanceof Behavior && // 入力ポート2は接続されているか
      isOperator(this.property.operator) // 正しい演算子が指定されているか
    ) {
      return true;
    } else {
      return false;
    }
  }
  toString() {
    return String(this.property.operator);
  }
}
