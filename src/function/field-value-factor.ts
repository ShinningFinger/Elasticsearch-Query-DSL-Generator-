import * as _ from 'lodash'
import BaseFunction from './base'

// none, log, log1p, log2p, ln, ln1p, ln2p, square, sqrt, or reciprocal
export enum Modifier {
  SQRT = 'sqrt',
  NONE = 'none',
  LOG = 'log',
  LOG1P = 'log1p',
  LOG2P = 'log2p',
  LN = 'ln',
  LN1P = 'ln1p',
  LN2P = 'ln2p',
  SQUARE = 'square',
  RECIPROCAL = 'reciprocal',
}

export default class FieldValueFactorFunction extends BaseFunction {
  field: string

  modifier: Modifier

  factor: number

  missing?: number

  constructor(params: {
    field: string
    factor: number
    modifier: Modifier
    missing?: number
    weight?: number
  }) {
    const { weight, field, factor, missing, modifier } = params
    super({ weight })
    this.field = field
    this.factor = factor
    this.missing = missing
    this.modifier = modifier
  }

  generate() {
    const { weight, field, factor, missing, modifier } = this
    return {
      field_value_factor: _.omitBy({ field, factor, missing, modifier }, _.isUndefined),
      weight,
    }
  }
}
