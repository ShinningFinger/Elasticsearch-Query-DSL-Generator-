import { TermCondition } from '../type/condition'
import { TermQuery } from '../type/query'
import Base from './base'

export default class Term extends Base<TermCondition, TermQuery> {
  generate(): TermQuery {
    const { condition } = this
    const [key, value] = Object.entries(condition)[0]
    return {
      term: {
        [key]: value,
      },
    }
  }
}
