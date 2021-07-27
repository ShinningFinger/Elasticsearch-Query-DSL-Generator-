import { conditionParse, Conditions } from "../type/condition";
import { BoolQuery, QuerySentence } from "../type/query";

enum BoolKind {
  FILTER = "filter",
  MUST = "must",
  SHOULD = "should",
  MUSTNOT = "must_not",
}

class BoolBase {
  queryObject: { [key: string]: Conditions };
  kind: BoolKind;
  constructor(queryObject: { [key: string]: Conditions }) {
    this.queryObject = queryObject;
  }
  generate() {
    const { queryObject, kind } = this;
    return {
      [kind]: Object.entries(queryObject).map(([key, condition]) => {
        return conditionParse(key, condition);
      }),
    };
  }
}

class Filter extends BoolBase {
  kind = BoolKind.FILTER;
}

class Must extends BoolBase {
  kind = BoolKind.MUST;
}

class Should extends BoolBase {
  kind = BoolKind.SHOULD;
}

class MustNot extends BoolBase {
  kind = BoolKind.MUSTNOT;
}

class Bool {
  should?: Should;
  filter?: Filter;
  must?: Must;
  mustNot?: MustNot;
  constructor(params: {
    should?: Should;
    filter?: Filter;
    must?: Must;
    mustNot?: MustNot;
  }) {
    this.should = params.should;
    this.filter = params.filter;
    this.must = params.must;
    this.mustNot = params.mustNot;
  }
  generate(): BoolQuery {
    const { should, filter, must, mustNot } = this;
    const boolQuery: {
      should?: QuerySentence[];
      filter?: QuerySentence[];
      must?: QuerySentence[];
      must_not?: QuerySentence[];
    } = {};
    if (should) {
      boolQuery.should = should.generate().should;
    }
    if (filter) {
      boolQuery.filter = filter.generate().filter;
    }
    if (must) {
      boolQuery.must = must.generate().must;
    }
    if (mustNot) {
      boolQuery.must_not = mustNot.generate().must_not;
    }
    return { bool: boolQuery };
  }
}

export { Filter, Bool, Must, MustNot, Should };
