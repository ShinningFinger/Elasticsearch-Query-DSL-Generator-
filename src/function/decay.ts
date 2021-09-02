import * as _ from 'lodash'
import { Filter } from '../sentence/bool'
import BaseFunction from './base'

export enum DecayKind {
  GAUSS = 'gauss',
  EXPONENT = 'exponent',
  LINEAR = 'linear',
}

export default class DecayFunction extends BaseFunction {
  kind: DecayKind

  key: string

  offset: string | number

  scale: string | number

  origin: unknown

  decay?: number

  constructor(params: {
    kind: DecayKind
    key: string
    offset: string | number
    scale: string | number
    origin: unknown
    decay?: number
    weight?: number
    filter?: Filter
  }) {
    const { kind, key, offset, scale, origin, decay, weight, filter } = params
    super(weight, filter)
    this.kind = kind
    this.key = key
    this.offset = offset
    this.scale = scale
    this.origin = origin
    this.decay = decay
  }

  generate() {
    const { kind, key, offset, scale, decay, origin, weight, filter } = this
    return _.omitBy(
      {
        filter: filter?.generate().filter,
        [kind]: {
          [key]: _.omitBy(
            {
              origin,
              offset,
              scale,
              decay,
            },
            _.isUndefined,
          ),
        },
        weight,
      },
      _.isUndefined,
    )
  }
}
