import { Condition } from '../type/condition'
import { QuerySentence } from '../type/query'

export enum QueryType {
  CONSTANTSCORE = 'constant_score',
  TERM = 'term',
  RANGE = 'range',
  EXISTENCE = 'exists',
  BOOL = 'bool',
  SHOULD = 'should',
}

export default abstract class Base<C extends Condition | Condition[], Q extends QuerySentence> {
  condition: C

  constructor(condition: C) {
    this.condition = condition
  }

  abstract generate(): Q
}
