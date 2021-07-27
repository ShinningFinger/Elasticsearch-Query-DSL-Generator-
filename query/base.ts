import { Conditions } from "../type/condition";

export enum QueryType {
  CONSTANTSCORE = "constant_score",
  TERM = "term",
  RANGE = "range",
  EXISTENCE = "exists",
  BOOL = "bool",
  SHOULD = "should",
}

export default abstract class Base {
  key: string;
  condition: Conditions;
  boost?: number;

  constructor(key: string, condition: Conditions, boost?: number) {
    this.key = key;
    this.condition = condition;
    this.boost = boost;
  }

  abstract generate(): {
    [key in QueryType]?: unknown;
  };
}
