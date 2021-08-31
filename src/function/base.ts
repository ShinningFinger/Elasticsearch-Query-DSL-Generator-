import { Filter } from '../sentence/bool'

export default class BaseFunction {
  protected filter: Filter

  weight: number

  constructor(weight = 1, filter = new Filter({})) {
    this.weight = weight
    this.filter = filter
  }

  setFilter(filter: Filter) {
    this.filter = filter
    return this
  }
}
