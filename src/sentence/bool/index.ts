/* eslint-disable import/no-cycle */
import { BoolQuery, QuerySentence } from '../../type/query'
import Filter from './filter'
import Must from './must'
import MustNot from './must-not'
import Should from './should'

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

  generate(): BoolQuery {
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

export { Bool, Should, Filter, MustNot, Must }
