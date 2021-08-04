import { InCondition } from '../type/condition'
import { BoolObject } from '../type/query'
import Base from './base'
import { Bool, Should } from './bool'

export default class In extends Base<InCondition, BoolObject> {
  generate() {
    const [key, value] = Object.entries(this.condition)[0]
    const subconditions = value.$in
    const should = new Should(subconditions.map((c) => ({ [key]: c })))
    return new Bool({ should }).generate()
  }
}
