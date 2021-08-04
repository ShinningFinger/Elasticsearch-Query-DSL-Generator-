import { Filter } from '../sentence/bool'

export default class BaseFunction {
  protected filter?: Filter

  weight: number

  constructor(weight?: number) {
    this.weight = weight || 1
  }

  setFilter(filter: Filter) {
    this.filter = filter
    return this
  }
}
