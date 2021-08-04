import { Condition } from '../type/condition'
import { QuerySentence } from '../type/query'

export default abstract class Base<C extends Condition | Condition[], Q extends QuerySentence> {
  condition: C

  constructor(condition: C) {
    this.condition = condition
  }

  abstract generate(): Q
}
