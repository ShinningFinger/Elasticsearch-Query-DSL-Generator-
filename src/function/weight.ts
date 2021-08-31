import BaseFunction from './base'

export default class WeightFunction extends BaseFunction {
  generate() {
    const { filter } = this.filter.generate()
    return {
      filter,
      weight: this.weight,
    }
  }
}
