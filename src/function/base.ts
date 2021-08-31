import { Filter } from '../sentence/bool'

export default class BaseFunction {
  protected filter: Filter

  weight: number

  constructor(weight?: number, filter?: Filter) {
    this.weight = weight || 1
    this.filter = filter || new Filter({})
  }

  setFilter(filter: Filter) {
    this.filter = filter
    return this
  }
}
