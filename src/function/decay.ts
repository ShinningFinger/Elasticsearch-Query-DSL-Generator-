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

  public setKind(k: DecayKind) {
    this.kind = k
    return this
  }

  public setKey(k: string) {
    this.key = k
    return this
  }

  public setOffset(o: string | number) {
    this.offset = o
    return this
  }

  public setScale(s: string | number) {
    this.scale = s
    return this
  }

  public setOrigin(o: unknown) {
    this.origin = o
    return this
  }

  public setDecay(d: number) {
    this.decay = d
    return this
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
