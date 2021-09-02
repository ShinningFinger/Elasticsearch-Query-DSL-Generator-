import { Filter } from '../sentence/bool'

export default class BaseFunction {
  protected filter: Filter

  weight: number

  constructor(weight = 1, filter?: Filter) {
    this.weight = weight
    if (filter) {
      this.filter = filter
    }
  }

  setFilter(filter: Filter) {
    this.filter = filter
    return this
  }
}
