import * as _ from 'lodash'
import BaseFunction from './base'

export type RandomFunction = {
  random_score: {
    seed?: string
    field?: string
  }
  weight: number
}

export default class Random extends BaseFunction {
  seed?: string

  field?: string

  public setSeed(s: string) {
    this.seed = s
    return this
  }

  public setField(f: string) {
    this.field = f
    return this
  }

  generate(): RandomFunction {
    return {
      random_score: _.omitBy({ seed: this.seed, field: this.field }, _.isEmpty),
      weight: this.weight,
    }
  }
}
