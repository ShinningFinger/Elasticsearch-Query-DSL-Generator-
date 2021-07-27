import { ConstantScoreCondition } from "../type/condition";
import { ConstantScoreQuery } from "../type/query";
import Base, { QueryType } from "./base";
import { Filter } from "./bool";

export default class ConstantScore extends Base {
  condition: ConstantScoreCondition;

  generate(): ConstantScoreQuery {
    const { key, condition, boost } = this;
    const filter = new Filter({ [key]: condition }).generate().filter;
    return {
      [QueryType.CONSTANTSCORE]: {
        filter,
        boost,
      },
    };
  }
}
