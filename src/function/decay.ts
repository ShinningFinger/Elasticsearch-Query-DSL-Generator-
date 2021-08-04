import * as _ from 'lodash'
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
  }) {
    const { kind, key, offset, scale, origin, decay, weight } = params
    super(weight)
    this.kind = kind
    this.key = key
    this.offset = offset
    this.scale = scale
    this.origin = origin
    this.decay = decay
  }

  generate() {
    const { kind, key, offset, scale, decay, origin, weight } = this

    return _.omitBy(
      {
        filter: this.filter,
        [kind]: {
          [key]: _.omitBy(
            {
              offset,
              scale,
              decay,
              origin,
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