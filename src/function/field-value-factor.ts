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

  generate() {
    const { weight, field, factor, missing, modifier } = this
    return {
      field_value_factor: _.omitBy({ field, factor, missing, modifier }, _.isUndefined),
      weight,
    }
  }

  public setField(f: string) {
    this.field = f
    return this
  }

  public setModifier(m: Modifier) {
    this.modifier = m
    return this
  }

  public setFactor(f: number) {
    this.factor = f
    return this
  }

  public setMissing(m: number) {
    this.missing = m
    return this
  }
}
