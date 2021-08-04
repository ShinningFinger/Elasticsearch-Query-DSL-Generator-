import BaseFunction from './base'

export default class WeightFunction extends BaseFunction {
  generate() {
    const filter = this.filter ? this.filter.generate() : { filter: { match_all: {} } }
    return {
      filter,
      weight: this.weight,
    }
  }
}
