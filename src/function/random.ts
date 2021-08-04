import * as _ from 'lodash'
import BaseFunction from './base'

export type RandomFunction = {
  random_score: {
    seed?: string
    field?: string
  }
  weight?: number
}

export default class Random extends BaseFunction {
  seed?: string

  field?: string

  constructor(params: { seed?: string; field?: string; weight?: number }) {
    const { seed, field, weight } = params
    super(weight)
    this.seed = seed
    this.field = field
  }

  generate(): RandomFunction {
    return {
      random_score: _.omitBy({ seed: this.seed, field: this.field }, _.isEmpty),
      weight: this.weight,
    }
  }
}
