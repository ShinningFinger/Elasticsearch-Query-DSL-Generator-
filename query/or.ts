import * as _ from "lodash";
import { ArrayCondition } from "../type/condition";
import { BoolQuery } from "../type/query";
import Base from "./base";
import { Bool, Should } from "./bool";

export default class Or extends Base {
  condition: ArrayCondition;
  generate(): BoolQuery {
    const { condition } = this;
    return new Bool({
      should: new Should(
        _.fromPairs(condition.map((d) => Object.entries(d)[0]))
      ),
    }).generate();
  }
}
