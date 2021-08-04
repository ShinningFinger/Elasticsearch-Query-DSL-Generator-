/* eslint-disable import/no-cycle */
import { NotCondition } from '../type/condition'
import { BoolQuery } from '../type/query'
import Base from './base'
import { Bool, MustNot } from './bool'

export default class Not extends Base<NotCondition, BoolQuery> {
  generate() {
    const { condition } = this
    return new Bool({
      mustNot: new MustNot(condition.$not),
    }).generate()
  }
}
