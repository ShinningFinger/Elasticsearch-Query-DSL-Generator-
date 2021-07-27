import * as _ from "lodash";
import { InCondition } from "../type/condition";
import { BoolQuery } from "../type/query";
import Base from "./base";
import { Bool, Should } from "./bool";

export default class In extends Base {
  condition: InCondition;
  generate(): BoolQuery {
    const { condition, key } = this;
    const subconditions = condition.$in;
    const should = new Should(
      _.fromPairs(subconditions.map((subcondition) => [key, subcondition]))
    );
    return new Bool({ should }).generate();
  }
}
