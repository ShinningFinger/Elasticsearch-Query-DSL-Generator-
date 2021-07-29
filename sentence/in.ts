import { InCondition } from '../type/condition'
import { BoolQuery } from '../type/query'
import Base from './base'
import { Bool, Should } from './bool'

export default class In extends Base<InCondition, BoolQuery> {
  generate() {
    const { condition, key } = this
    const subconditions = condition.$in
    const should = new Should(subconditions.map((c) => ({ [key]: c })))
    return new Bool({ should }).generate()
  }
}
