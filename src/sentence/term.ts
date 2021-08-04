import { TermCondition } from '../type/condition'
import { TermQuery } from '../type/query'
import Base, { QueryType } from './base'

export default class Term extends Base<TermCondition, TermQuery> {
  generate() {
    const { condition } = this
    const [key, value] = Object.entries(condition)[0]
    return {
      [QueryType.TERM]: {
        [key]: value,
      },
    }
  }
}
