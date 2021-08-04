import * as _ from 'lodash'
import BaseFunction from './base'

export default class FieldValueFactorFunction extends BaseFunction {
  field: string

  modifier: string

  factor: number

  missing?: number

  constructor(params: {
    field: string
    factor: number
    modifier: string
    missing?: number
    weight?: number
  }) {
    const { weight, field, factor, missing, modifier } = params
    super(weight)
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
