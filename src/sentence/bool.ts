import { AndCondition, Condition, conditionParse, singleConditionParse } from '../type/condition'
import { BoolKind, BoolObject, BoolQuery, QuerySentence } from '../type/query'
import Base from './base'

abstract class BoolBase extends Base<AndCondition, BoolQuery> {
  abstract kind: BoolKind

  generate(): BoolQuery {
    const { condition, kind } = this
    return {
      [kind]:
        Object.entries(condition).length === 1
          ? singleConditionParse(condition)
          : Object.entries(condition).map(([key, value]) => singleConditionParse({ [key]: value })),
    }
  }
}

class Filter extends BoolBase {
  kind = BoolKind.FILTER
}

class Must extends BoolBase {
  kind = BoolKind.MUST
}

class MustNot extends BoolBase {
  kind = BoolKind.MUSTNOT
}

class Should extends Base<Condition[], BoolQuery> {
  generate() {
    const { condition } = this
    return {
      should: condition.map((queryObject) => conditionParse(queryObject)),
    }
  }
}

class Bool {
  should?: Should
  filter?: Filter
  must?: Must
  mustNot?: MustNot
  constructor(params: { should?: Should; filter?: Filter; must?: Must; mustNot?: MustNot }) {
    this.should = params.should
    this.filter = params.filter
    this.must = params.must
    this.mustNot = params.mustNot
  }
  generate(): BoolObject {
    const { should, filter, must, mustNot } = this
    const boolQuery: {
      should?: QuerySentence | QuerySentence[]
      filter?: QuerySentence | QuerySentence[]
      must?: QuerySentence | QuerySentence[]
      must_not?: QuerySentence | QuerySentence[]
    } = {}
    if (should) {
      boolQuery.should = should.generate().should
    }
    if (filter) {
      boolQuery.filter = filter.generate().filter
    }
    if (must) {
      boolQuery.must = must.generate().must
    }
    if (mustNot) {
      boolQuery.must_not = mustNot.generate().must_not
    }
    return { bool: boolQuery }
  }
}

export { Filter, Bool, Must, MustNot, Should }
