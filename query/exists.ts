import { ExistanceCondition } from "../type/condition";
import { ExistenceQuery } from "../type/query";
import Base, { QueryType } from "./base";

export default class Exists extends Base {
  condition: ExistanceCondition;
  generate(): ExistenceQuery {
    const { condition } = this;
    return {
      [QueryType.EXISTENCE]: {
        field: condition.$exists,
      },
    };
  }
}
