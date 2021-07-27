import { TermCondition } from "../type/condition";
import { TermQuery } from "../type/query";
import Base, { QueryType } from "./base";

export default class Term extends Base {
  condition: TermCondition;
  generate(): TermQuery {
    const { key, condition } = this;
    return {
      [QueryType.TERM]: {
        [key]: condition,
      },
    };
  }
}
