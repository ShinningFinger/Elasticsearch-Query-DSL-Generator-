import { Filter } from '../sentence/bool'
import { Condition } from '../type/condition'

export default class BaseFunction {
  filter: Filter

  weight: number

  constructor(weight = 1) {
    this.weight = weight
  }

  public setFilter(condition: Condition) {
    this.filter = new Filter(condition)
    return this
  }

  public setWeight(w: number) {
    this.weight = w
    return this
  }
}
