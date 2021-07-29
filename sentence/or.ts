import { ArrayCondition } from '../type/condition'
import { BoolQuery } from '../type/query'
import Base from './base'
import { Bool, Should } from './bool'

export default class Or extends Base<ArrayCondition, BoolQuery> {
  generate() {
    const { condition } = this
    return new Bool({
      should: new Should(condition),
    }).generate()
  }
}
