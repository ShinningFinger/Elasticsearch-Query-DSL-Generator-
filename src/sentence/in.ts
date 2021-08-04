/* eslint-disable import/no-cycle */
import { InCondition } from '../type/condition'
import { BoolQuery } from '../type/query'
import Base from './base'
import { Bool, Should } from './bool'

export default class In extends Base<InCondition, BoolQuery> {
  generate() {
    const [key, value] = Object.entries(this.condition)[0]
    const subconditions = value.$in
    const should = new Should(subconditions.map((c) => ({ [key]: c })))
    return new Bool({ should }).generate()
  }
}
