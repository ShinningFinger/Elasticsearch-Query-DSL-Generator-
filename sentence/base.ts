import { Conditions } from '../type/condition'
import { QuerySentence } from '../type/query'

export enum QueryType {
  CONSTANTSCORE = 'constant_score',
  TERM = 'term',
  RANGE = 'range',
  EXISTENCE = 'exists',
  BOOL = 'bool',
  SHOULD = 'should',
}

export default abstract class Base<C extends Conditions, Q extends QuerySentence> {
  key?: string
  condition: C
  boost?: number

  constructor(params: { key?: string; condition: C; boost?: number }) {
    const { key, condition, boost } = params
    this.key = key
    this.condition = condition
    this.boost = boost
  }

  abstract generate(): Q
}
