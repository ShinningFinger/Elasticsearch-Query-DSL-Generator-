import { OrCondition } from '../type/condition'
import { BoolObject } from '../type/query'
import Base from './base'
import { Bool, Should } from './bool'

export default class Or extends Base<OrCondition, BoolObject> {
  generate() {
    const { condition } = this
    return new Bool({
      should: new Should(condition.$or),
    }).generate()
  }
}
