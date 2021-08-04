import { NotCondition } from '../type/condition'
import { BoolObject } from '../type/query'
import Base from './base'
import { Bool, MustNot } from './bool'

export default class Not extends Base<NotCondition, BoolObject> {
  generate() {
    const { condition } = this
    return new Bool({
      mustNot: new MustNot(condition.$not),
    }).generate()
  }
}
