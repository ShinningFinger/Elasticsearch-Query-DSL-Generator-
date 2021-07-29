import { TermCondition } from '../type/condition'
import { TermQuery } from '../type/query'
import Base, { QueryType } from './base'

export default class Term extends Base<TermCondition, TermQuery> {
  generate() {
    const { key, condition, boost } = this
    let body: TermCondition = condition
    if (boost) {
      body = { value: condition, boost }
    }
    return {
      [QueryType.TERM]: {
        [key]: body,
      },
    }
  }
}
