import { Filter } from '../sentence/bool'
import { Condition } from '../type/condition'

export default class BaseFunction {
  filter: Filter

  weight: number

  constructor(params: { weight?: number; filter?: Condition }) {
    const { weight = 1, filter } = params
    this.weight = weight
    if (filter) {
      this.filter = new Filter(filter)
    }
  }

  setFilter(condition: Condition) {
    this.filter = new Filter(condition)
    return this
  }
}
